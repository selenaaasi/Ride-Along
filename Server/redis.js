const redis = require('redis');
const carpool_ride = 'carpool-ride-';
const notifications_user = 'notifications-user-';
const quickridecashstring='quickride-cash';
class MyRedis{
    constructor(){
        this.redisClient=redis.createClient();
        this.userAtributes = ['name','surname','password','email','stars'];

    };
    connect(){
        this.redisClient.on('connect', function(){
            console.log('Connected to Redis...');
          });
    }
    // novo ~~~
    pushNotification(notification) {
      console.log('pushNotification(): '+ notifications_user + notification.reciverUsername);
      const strNot = JSON.stringify(notification);
      console.log(strNot);
      this.redisClient.SADD(notifications_user + notification.reciverUsername, strNot, (err,obj) => {
        if(obj === 0) {
          console.log('notifikacija nije dodata, verovatno postoji vec takava');
        } else {
          console.log('Push notification -> success');
        }
      } );
    }
    addRide(ride) {
      //ride.user
      const strRide = JSON.stringify(ride);
     
      this.redisClient.SADD(carpool_ride + ride.user,strRide, (err, obj) => {
        if(obj === 1) {
          console.log('saveRide -> SUCCSESSFUL');
          return true;
        } else {
          console.log('saveRide -> UNSUCCSESSFUL ');
          return false;
        }
      })
    }
    getAllRides(username,res) {
      console.log('getAllRides()')
      this.redisClient.SMEMBERS(carpool_ride + username, (err, obj) => {
        console.log(carpool_ride + username)
        if(!obj) {
          console.log("THERE ARE NO RIDES");
        } else {
          // res.status(200).send(obj);
          console.log(obj);
          res.status(200).send(obj);
        }
      })
    }
    // novo ~~~
    subscribe(req,res) {
      const channel = req.body.channel;
      this.redisClient.SUBSCRIBE(channel, (err, obj) => {
        console.log("SUBSCRIBE")
        // console.log({obj})
        let bool = obj ===channel;
        if(bool) {
          res.status(200).send(JSON.stringify({bool}))
        } else {
          res.status(422).send(JSON.stringify({bool}))
        }
      })
    }

    getAllUsers(res) {
        this.redisClient.SMEMBERS("users", (err, obj) => {
            if(!obj){
              console.log("ERROR");
            }
            else {
              // console.log({obj});
              res.status(200).send(obj);
            }
          })
    }
    signUp(req, res) {
        let key = req.body.username;
        let name = req.body.name;
        let surname = req.body.surname;
        let password = req.body.password;
        let email = req.body.email;
        let stars = req.body.stars;
        let color = req.body.color;
        let numRides = 0;
        console.log({color})
        this.redisClient.SADD("users",key, (err, obj) => {
            // console.log({obj});
            //Dodao je username u kolekciju users
            if(obj === 1) {
            //Dodavanje usera u Redis
            console.log({color})

            this.redisClient.hmset(key, [
            'username',key,
            'name', name,
            'surname', surname,
            'password', password,
            'email', email,
            'stars', stars,
            'color',color,
            'numRides', numRides
            ], (err, reply) => {
            if(err) {
                // console.log(err);
                const errorObj = {'error': 'ERROR HMSET'}
                console.log("ERROR HMSET");
                res.status(422).send(errorObj);

            } else {
                // console.log(reply);
                // Neo4J.executequery(res);
                res.send(req.body);
            }

            });
            //SADD je vratio 0 sto znaci da je username vec postoji
            } else {
            const errorObj = {'error': 'Username alrady exists'}
            console.log(422);
            // console.log({errorObj});
            //422 - Unprocessable Entity
            res.status(422).send(errorObj);
            }
        });

    }
    logIn(req, res) {
        this.redisClient.HGETALL(req.body.username, (err, obj) => {
            if(err){
              console.log("ERROR");
              // console.log(obj);
            }
            else {
              if( obj === null) {
                console.log("User dose not exist!");
                const errorObj = {'error': 'User dose not exist!'};
                res.status(422).send(errorObj);

              } else {
                // console.log({obj});
                const password = req.body.password;

                if(obj.password === password ){
                  res.status(200).send(obj);
                } else {
                  const errorObj = {'error': 'Wrong password'}
                  res.status(422).send(errorObj);
                }
              }
            }
          })
    }
    returnCachedRides(username,neo4j,res){
      console.log("U find cashed rides sam!");
      let ceostring=quickridecashstring+username;
      let that=this;
      this.redisClient.HGETALL(ceostring,(err,obj)=>{
        if(obj===null)
          {
            //object not found in cache,get it from neo4j and update cache
            neo4j.updateAndSave(username,that.redisClient,res);
          }
          else
          {
            //object found in cache,send it back to user
            let quickridelist=JSON.parse(obj.quickridelist);
            console.log(quickridelist);
            res.status(200).send(quickridelist);
          }
        }
      )
       
    }
    deleteQuickRide(username,neo4j,res){
      neo4j.deleteQuickRide(username,this.redisClient,res);
    }
}
var myredis = new MyRedis();
module.exports = myredis;