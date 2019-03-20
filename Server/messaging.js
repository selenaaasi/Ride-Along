var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const Redis = require("./redis");


const PORT = 3005;

class UserSocket {
    constructor(username, id) {
        this.username = username;
        this.id = id;
    }
}

class MyMessage {
    constructor( chatUser, username, message) {
       this.chatUser = chatUser;
       this.username = username;
       this.message = message;
    }
}

const push_notification = 'push-notification';
const pop_notification = `pop_notification`;
const all_notifications = `all-notifications`; 
const notifications_user = 'notifications-user-';
const change_notification = 'change-notification';
const set_username = 'set_username';



let allUsernameSocketID = [];


io.on('connection', (socket) => {
    console.log('Socket conntecvtion:  ', socket.id);
    //tako nesto
    allUsernameSocketID.push(new UserSocket('', socket.id));

    socket.on(set_username, (username) => {
        console.log(set_username);
        uparivanjeUsernameAndSocketID(username, socket);
        console.log({allUsernameSocketID});
    })

    socket.on(change_notification, (odlNewArry) => {
        console.log(`${change_notification}: `, {odlNewArry});
        const oldNot = odlNewArry[0];
        const newNot = odlNewArry[1];
        const strOldNot = JSON.stringify(odlNewArry[0]);
        const strNewNot = JSON.stringify(odlNewArry[1]);
        const username = oldNot.reciverUsername;
        const sender = newNot.senderUsername;

        // pocetak 
        console.log('SET: '+ notifications_user+username);
        console.log(strOldNot);
        console.log(strNewNot);
        Redis.redisClient.SREM(notifications_user+username, strOldNot, (err,obj) => {
            if (obj === 0) {
                console.log("TAKVA NOTIFIKACIJA NE POSTOJI kod useera: ", username);
            } else { 
                Redis.redisClient.SADD(notifications_user+username, strNewNot, (err, obj) => {
                    if(obj === 0) {
                        console.log('NOVA NOTIFIKACIJA NIJE DODATA');
                    } else {
                        console.log('NOTIFIKACIJA JE UPDATOVANA RECEIVERU');
                        console.log({strNewNot});
                    }
                })
            }
        });

        Redis.redisClient.SREM(notifications_user+sender, strOldNot, (err,obj) => {
            if (obj === 0) {
                console.log("TAKVA NOTIFIKACIJA NE POSTOJI kod useera: ", sender);
            } else { 
                Redis.redisClient.SADD(notifications_user+sender, strNewNot, (err, obj) => {
                    if(obj === 0) {
                        console.log('NOVA NOTIFIKACIJA NIJE DODATA');
                    } else {
                        console.log('NOTIFIKACIJA JE UPDATOVANA SENDERU');
                        console.log({strNewNot});
                    }
                })
            }
        });
        //kraj


    })
    socket.on(all_notifications, (username) => {
        console.log(all_notifications+ ' : '+notifications_user+username);

        Redis.redisClient.SMEMBERS(notifications_user+username, (err,allNotifications) => {
            // console.table(allNotifications);  
            allNotObj = allNotifications.map(n => JSON.parse(n));   
            console.log({allNotObj});
            io.to(socket.id).emit(all_notifications,allNotObj);            
        });

    })
    socket.on(push_notification, (notification) =>  {
        console.log(push_notification);
        // Redis.pushNotification(notification);
        const strNot = JSON.stringify(notification);
        console.log(strNot);

        Redis.redisClient.SADD(notifications_user + notification.reciverUsername, strNot, (err,obj) => {
            if(obj === 0) {
                console.log('notifikacija nije dodata, verovatno postoji vec takava', notification.reciverUsername);
            } else {
                console.log('Push notification -> success', notification.reciverUsername);
            }
        });
        Redis.redisClient.SADD(notifications_user + notification.senderUsername, strNot, (err,obj) => {
            if(obj === 0) {
                console.log('notifikacija nije dodata, verovatno postoji vec takava',notification.senderUsername );
            } else {
                console.log('Push notification -> success', notification.senderUsername);
            }
        });

        const userSocket = allUsernameSocketID.find((us,i) => us.username === notification.reciverUsername);
        
        console.log({userSocket});

        if(userSocket !== undefined)
            io.to(userSocket.id).emit(pop_notification,notification);
    })
    //pravi se chat room :D 
    socket.on('create-chat', (username) => {
        console.log('create-chat');
        console.log('Chat room: ', username);
        // console.log('Recived username: ', username);
        //pravi se objekat koji ce da se stavi u allUsernameSocketID 
        // allUsernameSocketID - presstavlja listu id soketa uparenim sa username-om ko je ulogovan na tom klijentu
        const userSocket = new UserSocket(username, socket.id);
        
        //uparivanje socket.id i username u nizu allUsernameSocketID
        let updated = false;
        if(allUsernameSocketID.length > 0) {
            // console.log("All IDS pre map\n",allUsernameSocketID);
            
            allUsernameSocketID = allUsernameSocketID.map((ele) => {
                if(ele.id === socket.id) {
                    // console.log('Update username');
                    ele.username = username;
                    updated = true;
                }

                if(ele.username === username && ele.id !== socket.id && !updated){
                    // console.log('Update socket.id');                    
                    ele.id = socket.id;
                    updated = true;
                }
                return ele;
            });
        }
        if(!updated){
            if(allUsernameSocketID.filter((ele) => ele.username === userSocket.username && ele.id === userSocket.id).length < 1){
                allUsernameSocketID.push(userSocket);
            }
        }
        //kraj uparivanja socket.id i username u nizu allUsernameSocketID

        // dodavanje chat room-a u set, set key = chat-users-username 
        // (username je vlasnik chat-a - odnosno onaj koji je naparavio voznju a uz to i chat)
        Redis.redisClient.SADD('chat-users-'+username,username, (err,obj) => {
            if(obj === 1) {
                // console.log("CREATED CHAT: ", 'chat-users-'+username,username);
            } else {
                // console.log("USER JE VEC U CHAT-u");
            } 
        })

        // console.log('Konacni allUsernameSocketID',{allUsernameSocketID});
        //dodaj u redis
    });
    // pridruzivanje chat room-u
    socket.on('join-chat', (joinObj) => {
        console.log('join-chat');
        // console.log('Recived username: ', joinObj);
        const username = joinObj.username;
        const chatUsername = joinObj.chatUser;

        // isto kao i gore, azururanje ili dodavanje UserSocket objekta u allUsernameSocketID array
        const userSocket = new UserSocket(username, socket.id);
        
        let updated = false;
        allUsernameSocketID = allUsernameSocketID.map((ele) => {
            if(ele.id === socket.id) {
                ele.username = username;
                updated = true;
            }
            if(ele.username === username && ele.id !== socket.id && !updated){
                ele.id = socket.id;
                updated = true;
            }
            return ele;
        });
        if(!updated){
            // console.log({allUsernameSocketID});
            if(allUsernameSocketID.filter((ele) => ele.username === userSocket.username && ele.id === userSocket.id).length < 1){
                allUsernameSocketID.push(userSocket);
            }
        }
        //kraj dodavanja ili azuriranja

        // key chat room-a odnosno ime seta koji sadzi sve usere
        const chatUserID = 'chat-users-'+chatUsername;

        // dodavanje usera u chat room
        Redis.redisClient.SADD(chatUserID,username, (err,obj) => {
            if(obj === 1) {
                // console.log("User added to chat-room:    ", );
            } else {
                // console.log("User is already in chat-room   : ", 'chat-users-'+chatUsername);
            } 
        })
        
        // console.log("All users and IDS: \n",{allUsernameSocketID});
    });

    // neko je poslao poruku(message) koja se ovde obradjuje 
    socket.on('chat', (message) => {
        console.log('chat - Recived message: ', message);

        // (chat-messages-username) je lancana lista koja predstavlja sve poruke chat room-a (chat-users-username)
        // npr. 'chat-messages-nekiKulUserName' -> sadrzi poruke chat room-a 'chat-users-nekiKulUserName' -> sadzri username-ove koji su u chat room-u
        if(message.message !== undefined && message.message !== null && message.message !== ''){
            Redis.redisClient.LPUSH('chat-messages-'+message.chatUser,message.message, (err,obj) => {
                if(err) {
                    // console.log("EROOR LPUSH", {message});
                } else {
                    console.log("LPUSH MESSAGE: ", message.message); 
                }
            });
        }

        Redis.redisClient.SMEMBERS('chat-users-'+message.chatUser, (err, users) => {
            if(!users){
              console.log("ERROR SMEMBERS('chat-users-'+message.username");
            }
            else {
              // console.log({obj});
                let IDsForEmit = [];
                // console.log('USERS IN CHAT: ', {users});
                // console.log('ALL IDS:', {allUsernameSocketID});

                // pronalazenje socketID-a za svakog usera u chat room-u
                console.log({users});
                users.forEach(user => {
                    allUsernameSocketID.map(userSocket => {
                        if(userSocket.username === user){
                            console.log('Sending to:', user);   
                            IDsForEmit.push(userSocket.id);
                        }
                    })
                });
                // console.log('IDS FOR EMIT: ', {IDsForEmit});

                //slanje poruke koja je stigla u chat room svima iz chat room-a preko id soketa
                IDsForEmit.forEach(id => {
                    //povuci sve messages 
                    Redis.redisClient.LRANGE('chat-messages-'+message.chatUser,0,-1, (err,rMessages) => {
                        if(err) {
                            console.log('LERAGNE ERROR', rMessages);    
                        } else {
                            // console.log('message.USERNAME:', message.chatUser);
                            // console.log("ForSendin")
                            const chatUsername = message.chatUser;
                            const username = message.username;
                            allMyMessages = rMessages.map(m => new MyMessage(chatUsername,username,m));
                            // console.log("ZA SLANJE: ");
                            // console.log({allMyMessages});
                            io.to(id).emit(`chat`,allMyMessages);
                        }
                    })
                })
            }
          })
    })
    
})

function uparivanjeUsernameAndSocketID(username, socket) {
            //uparivanje socket.id i username u nizu allUsernameSocketID
            let updated = false;
            if(allUsernameSocketID.length > 0) {
                // console.log("All IDS pre map\n",allUsernameSocketID);
                
                allUsernameSocketID = allUsernameSocketID.map((ele) => {
                    if(ele.id === socket.id) {
                        // console.log('Update username');
                        ele.username = username;
                        updated = true;
                    }
    
                    if(ele.username === username && ele.id !== socket.id && !updated){
                        // console.log('Update socket.id');                    
                        ele.id = socket.id;
                        updated = true;
                    }
                    return ele;
                });
            }
            if(!updated){
                if(allUsernameSocketID.filter((ele) => ele.username === userSocket.username && ele.id === userSocket.id).length < 1){
                    allUsernameSocketID.push(userSocket);
                }
            }
            //kraj uparivanja socket.id i username u nizu allUsernameSocketID
}



http.listen(PORT, function () {
    console.log(`'listening on PORT: ${PORT} ...'`);
  });
