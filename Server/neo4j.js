const uri="bolt://localhost:11007"
const user="neo4j";
const password="ridealong";
const neo4j = require('neo4j-driver').v1;
// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
// const session = driver.session();

class Neo4j{
    constructor(){
        this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        this.session = this.driver.session();
    };
    signUp(req, res) {
        let key = req.body.username;
        let name = req.body.name;
        let surname = req.body.surname;
        let password = req.body.password;
        let email = req.body.email;
        let stars = req.body.stars;
        let color=req.body.color
        console.log("TU SAM");
        let pom='MERGE (u:User { username: "'+key +'",name:"'+name+'",surname:"'+surname+'",password:"'+password+'",email:"'+email+'",stars:'+stars+',color:"'+color+'"})';
        console.log(pom);
        const promise=this.session.run('MERGE (u:User { username: "'+key +'",name:"'+name+'",surname:"'+surname+'",password:"'+password+'",email:"'+email+'",stars:'+stars+',color:"'+color+'"})')
        promise.then(() => {
    
      })};

    saveMyQuickRides(req,res){
        let info=req.body;
        let originlat=info.originlat;
        let originlng=info.originlng;
        let destinationlat=info.destinationlat;
        let destinationlng=info.destinationlng;
        let distancefromcenter=info.distancefromcenter;
        let username=info.username;
        let color=info.color;
        let addquery='CREATE (quickride:QuickRide {originlat:'+originlat+',originlng:'+originlng+',destinationlat:'+destinationlat+',destinationlng:'+destinationlng+',distancefromcenter:'+distancefromcenter+',username:"'+username+'",color:"'+color+'"})';
        const resultPromise = this.session.run(addquery);
        resultPromise.then(() => {
            let getquickridesquery2='MATCH (createdride:QuickRide {username:"'+username+'"}),(quickrides:QuickRide) WHERE quickrides.username<>"'+username+'" AND abs('+distancefromcenter+'-quickrides.distancefromcenter)<1 CREATE (createdride)-[rel:CLOSE_TO]->(quickrides)';
            const resultPromisetwo=this.session.run(getquickridesquery2);
            resultPromisetwo.then(() => {
                let getquickridesquery3='MATCH (createdride:QuickRide {username:"'+username+'"}),(quickrides:QuickRide) WHERE quickrides.username<>"'+username+'" AND abs('+distancefromcenter+'-quickrides.distancefromcenter)<1 CREATE (quickrides)-[rel:CLOSE_TO]->(createdride)';
                const resultpromisethree=this.session.run(getquickridesquery3);
                resultpromisethree.then(()=>{
                    let getquickridesquery4='MATCH (quickrides:QuickRide)-[:CLOSE_TO*]->(createdride:QuickRide{username:"'+username+'"}) RETURN quickrides LIMIT 5';
                    const resultpromisefour=this.session.run(getquickridesquery4);
                    resultpromisefour.then(result=>{
                        let quickrideslist=[];
                        result.records.forEach(function (record) {
                        quickrideslist.push(record.get(0).properties);
                        });  
                        let getquickridesquery5='MATCH(createdride:QuickRide{username:"'+username+'"}) return createdride';
                        const resultpromisefive=this.session.run(getquickridesquery5);
                        resultpromisefive.then(result=>{
                            this.session.close();
                            result.records.forEach(function (record) {
                                quickrideslist.push(record.get(0).properties);
                                });
                            res.status(200).send(JSON.stringify(quickrideslist));
                            this.driver.close();
                        })      
                })
            })  
        })
      });
    }
    updateAndSave(username,redisclient,res){
        let getquickridesquery='MATCH (quickrides:QuickRide)-[:CLOSE_TO*]->(createdride:QuickRide{username:"'+username+'"}) RETURN quickrides LIMIT 5';
        const resultPromise=this.session.run(getquickridesquery);
        let quickrideslist=[];
        resultPromise.then(result => {
            result.records.forEach(function (record) {
                quickrideslist.push(record.get(0).properties);
              });
              let getquickridesquery2='MATCH(createdride:QuickRide{username:"'+username+'"}) return createdride';
              const resultPromiseTwo=this.session.run(getquickridesquery2);
              resultPromiseTwo.then((result)=>{
                    this.session.close();
                    result.records.forEach(function (record) {
                    quickrideslist.push(record.get(0).properties);
                    });
                    let key="quickride-cash"+username;
                    let stringifiedlist=JSON.stringify(quickrideslist);
                    redisclient.HMSET(key, [
                      'username',key,
                      'quickridelist',stringifiedlist,
                      ], (err, reply) => {
                      if(err) {
                          const errorObj = {'error': 'ERROR HMSET'}
                          console.log("ERROR HMSET");
                          res.status(422).send(errorObj); 
                      } 
                      else {
                          console.log("USPEH!");
                        redisclient.expire(key,30,(err,obj)=>{});        
                      }
                      });   
                      console.log(quickrideslist);
                    res.status(200).send(JSON.stringify(quickrideslist));
                    this.driver.close();
              })
          });
    }
    deleteQuickRide(username,redisclient,res){
     
       let getquickridesquery='MATCH (quickrides:QuickRide)-[:CLOSE_TO*]->(createdride:QuickRide{username:"'+username+'"}) RETURN quickrides LIMIT 5';
        const resultPromise=this.session.run(getquickridesquery);
        let quickrideslist=[];
        resultPromise.then(result => {
            result.records.forEach(function (record) {
                quickrideslist.push(record.get(0).properties);
              });
            let key="quickride-cash"+username;
            let stringifiedlist=JSON.stringify(quickrideslist);
            redisclient.DEL(key);
                console.log(quickrideslist.filter(x=>x.username!==username));
                res.status(200).send(JSON.stringify(quickrideslist.filter(x=>x.username!==username)));
                let deletequickridequery='MATCH (quickride:QuickRide {username:"'+username+'"}) DETACH DELETE quickride';
                const resultpromisedelete=this.session.run(deletequickridequery);
                resultpromisedelete.then(()=>
                    {
                        this.session.close();
                        console.log("U delete quickride sam");
                        this.driver.close();
                    }
                    )
          });
    }
    addFriend(username1,username2,res){
        console.log("TU SAM");
        let addfriendquery='MATCH (user1:User {username:"'+username1+'"}),(user2:User{username:"'+username2+'"}) MERGE (user1)-[rel:FRIENDS_WITH]->(user2)';
        console.log(addfriendquery);
        const resultPromise=this.session.run(addfriendquery);
        resultPromise.then(result => {
                 this.session.close();
             //    res.status(200).send(JSON.stringify(result));
                 this.driver.close();
          });
    }
    addSharedRideC(username1,username2,res){
        let sharedrideq='MATCH (user1:User {username:"'+username1+'"}),(user2:User{username:"'+username2+'"}) MERGE (user1)-[rel:SHARED_RIDE_WITH]->(user2)';
        console.log(sharedrideq);
        const resultPromise=this.session.run(sharedrideq);
        resultPromise.then(result => {
                 this.session.close();
                 res.status(200).send(JSON.stringify(result));
                 this.driver.close();
          });
    }
    addPositiveReview(username1,username2,res){
        let addpositivereviewquery='MATCH (user1:User {username:"'+username1+'"}),(user2:User{username:"'+username2+'"}) MERGE (user1)-[rel:POSITIVE_REVIEW]->(user2)';
        console.log(addpositivereviewquery);
        const resultPromise=this.session.run(addpositivereviewquery);
        resultPromise.then(result => {
                 let updatequery='MATCH (user2:User{username:"'+username2+'"}) SET user2.stars = user2.stars+1 RETURN user2';
                 const resultPromisetwo=this.session.run(updatequery);
                 resultPromisetwo.then(()=>{
                     console.log("IZVRSIO SE UPDATE");
                     this.session.close();
                     res.status(200).send(JSON.stringify(result));
                     this.driver.close();
                 })
          });
    }
    addNegativeReview(username1,username2,res){
        let addnegativereviewquery='MATCH (user1:User {username:"'+username1+'"}),(user2:User{username:"'+username2+'"}) MERGE (user1)-[rel:NEGATIVE_REVIEW]->(user2)';
        console.log(addnegativereviewquery);
        const resultPromise=this.session.run(addnegativereviewquery);
        resultPromise.then(result => {
            let updatequery='MATCH (user2:User{username:"'+username2+'"}) SET user2.stars = user2.stars-1 RETURN user2';
            console.log(updatequery)
            const resultPromisetwo=this.session.run(updatequery);
            resultPromisetwo.then(()=>{
                console.log("IZVRSIO SE UPDATE");
                this.session.close();
                res.status(200).send(JSON.stringify(result));
                this.driver.close();
            })
          });
    }
    getUsersToReview(username,res)
    {
        let getusers='MATCH (user1:User{username:"'+username+'"})-[:SHARED_RIDE_WITH]-> (user2:User) RETURN user2 LIMIT 10';
        console.log(getusers);
        const resultPromise=this.session.run(getusers);
        resultPromise.then(result => {
                
                this.session.close();
                let userlist=[];
                result.records.forEach(function (record) {
                userlist.push(record.get(0).properties);
                });  
                console.log(userlist);
                 res.status(200).send(JSON.stringify(userlist));
                 this.driver.close();
          });
    }
    getPositiveReviews(username,res){
        let getuserspositive='MATCH (user1:User{username:"'+username+'"})-[:POSITIVE_REVIEW]-> (user2:User) RETURN user2 LIMIT 10';
        console.log(getuserspositive);
        const resultPromise=this.session.run(getuserspositive);
        resultPromise.then(result => {
                
                this.session.close();
                let userlist=[];
                result.records.forEach(function (record) {
                userlist.push(record.get(0).properties);
                });  
                 res.status(200).send(JSON.stringify(userlist));
                 this.driver.close();
          });
    }
    getNegativeReviews(username,res){
        let getusersnegative='MATCH (user1:User{username:"'+username+'"})-[:NEGATIVE_REVIEW]-> (user2:User) RETURN user2 LIMIT 10';
        console.log("Get negative reviews");
        const resultPromise=this.session.run(getusersnegative);
        resultPromise.then(result => {
                
                this.session.close();
                let userlist=[];
                result.records.forEach(function (record) {
                userlist.push(record.get(0).properties);
                });  
                 res.status(200).send(JSON.stringify(userlist));
                 this.driver.close();
          });
    }
    getMutualFriends(username1,username2,res){
        let getmutualfriends='MATCH (user1:User{username:"'+username1+'"})-[:FRIENDS_WITH]-> (mutual) <-[:FRIENDS_WITH]-(friend) WHERE friend.username="'+username2+'" RETURN mutual LIMIT 10';
        console.log(getmutualfriends);
        const resultPromise=this.session.run(getmutualfriends);
        resultPromise.then(result => {
                
                this.session.close();
                let userlist=[];
                result.records.forEach(function (record) {
                userlist.push(record.get(0).properties);
                });  
                 res.status(200).send(JSON.stringify(userlist));
                 this.driver.close();
          });
    }
    getFriends(username,res){
        let getusersnegative='MATCH (user1:User{username:"'+username+'"})-[:FRIENDS_WITH]-> (user2:User) RETURN user2 LIMIT 10';
        console.log("Get friends reviews");
        const resultPromise=this.session.run(getusersnegative);
        resultPromise.then(result => {
                
                this.session.close();
                let userlist=[];
                result.records.forEach(function (record) {
                userlist.push(record.get(0).properties);
                });  
                console.log(userlist);
                 res.status(200).send(JSON.stringify(userlist));
                 this.driver.close();
          });
    }
    updateUser(user,res){
        console.log("UPDATE USER")
        console.log(user);
        let updateuser='MATCH (user:User{username:"'+user.username+'"}) SET user.name="'+user.name+'",user.surname="'+user.surname+'",user.email="'+user.email+'",user.password="'+user.password+'" RETURN user';
        console.log(updateuser);
        const resultPromise=this.session.run(updateuser);
        resultPromise.then(result => {         
                this.session.close();
                let user=result.records[0].get(0).properties;
                console.log(user);
                 res.status(200).send(JSON.stringify(user));
                 this.driver.close();
          });

    }
    addUserTest(user) {
        let key = user.username;
        let name = user.name;
        let surname = user.surname;
        let password = user.password;
        let email = user.email;
        let stars = user.stars;
       
        const promise=this.session.run( 'MERGE (u:User { username: "'+key +'",name:"'+name+'",surname:"'+surname+'",password:"'+password+'",email:"'+email+'",stars:'+stars+'})')
        promise.then(result => {
            console.log("TU SAM");
      })};



      
    addCarpoolRide(req, res){
        //data
        let data=req.body.data;
        let year=data.year;
        let month=data.month;
        let day=data.day;
       //time
        let time=req.body.time;
        let hour=time.hour;
        let minut=time.minute;
  
        let origin=req.body.origin;
        let seats=req.body.seats;
        let destination=req.body.destination;
        let stops=req.body.stops;
        stops=[origin,...stops];
        let username=req.body.user;
        console.log(username);
        //za foreach
        let i=0;
        let prethodna;
        let id=0;
           const promiseData=this.session.run('MERGE (d: Data{ year:'+year+', month:'+month+', day:'+day+'})');
           promiseData.then(result =>{
       const promise=this.session.run(
       'MERGE (r: Ride { Year:'+year+', Month:'+month+', Day:'+day+', Hour:'+hour+', Minut:'+minut+', Origin:"'+origin+'", Seats:'+seats+'})',);
        const promisee=this.session.run( 'MATCH (r: Ride { Year:'+year+', Month:'+month+', Day:'+day+', Hour:'+hour+', Minut:'+minut+', Origin:"'+origin+'", Seats:'+seats+'}) RETURN id(r)',)
        promisee.then(result => {
          result.records.forEach(function (record) {
             id=record.get(0).low;
            });
            const firstpromise=this.session.run(
              'MATCH (u:User),(r: Ride { Year:'+year+', Month:'+month+', Day:'+day+', Hour:'+hour+', Minut:'+minut+', Origin:"'+origin+'", Seats:'+seats+'}) WHERE u.username = "'+username+'"MERGE (u)-[s:RIDES]->(r) ', 
      
              )
             firstpromise.then(result=>{
              if(stops.length!=0){
                stops.forEach(element => {
                 const promise2=this.session.run(
                  'MERGE (s:Stop { stop: "'+element +'"})'
                 )
                 promise2.then(result=>{
                   const promiseUserRel=this.session.run('MATCH (u:User),(s:Stop) WHERE u.username = "'+username+'" AND s.stop ="'+element+'"  MERGE (s)-[r:RIDES]->(u) ');
                   promiseUserRel.then(result=>{
                   const promiseData2=this.session.run('MATCH (d: Data{ year:'+year+', month:'+month+', day:'+day+'}),(s:Stop{stop:"'+element+ '" }) MERGE (s)-[poteg:DATA]->(d)');
                  promiseData2.then(result=>{
                   if(i==0){
                    const promise3=this.session.run( 
                   
                     'MATCH (r:Ride),(s:Stop) WHERE r.Origin = "'+origin+'" AND s.stop ="'+element+ '" MERGE (r)-[ss:STOPS]->(s)', )
                      promise3.then(result=>{
                    
                  })
                    }
                   
                   else{
                     const promise4=this.session.run( 
                      
                      'MATCH (s1:Stop),(s2:Stop) WHERE s1.stop= "'+prethodna+'" AND s2.stop ="'+element+ '"MERGE (s1)-[ss:STOPS]->(s2)', )
                      promise4.then(result=>{
                      })
                    }
  
                   i=i+1;
                   prethodna=element;
                   console.log(prethodna);
                 })
                })
              })

                });
                const promise5=this.session.run(
                  'MERGE (s:Stop { stop: "'+destination +'"})'
          
                )
                promise5.then(result=>{
  
                  const promiseUserRel2=this.session.run('MATCH (u:User),(s:Stop) WHERE u.username = "'+username+'" AND s.stop ="'+destination+'"  MERGE (s)-[r:RIDES]->(u) ');
                  promiseUserRel2.then(result=>{
                  const promiseData3=this.session.run('MATCH (d: Data{ year:'+year+', month:'+month+', day:'+day+'}),(s:Stop{stop:"'+destination+ '" }) MERGE (s)-[poteg:DATA]->(d)');
                  promiseData3.then(result=>{
                  const promise6=this.session.run( 
                    
                  'MATCH (s1:Stop),(s2:Stop) WHERE s1.stop= "'+prethodna+'" AND s2.stop ="'+destination+ '"MERGE (s1)-[ss:STOPS]->(s2)', )
                  this.session.close();
                  this.u=username;
                })
              })
            })      
                }
                else{
                  const promise7=this.session.run(
                    'MERGE (s:Stop { stop: "'+destination +'"})'
                  )
                  promise7.then(result=>{
                    const promiseUserRel3=this.session.run('MATCH (u:User),(s:Stop) WHERE u.username = "'+username+'" AND s.stop ="'+destination+'"  MERGE (s)-[r:RIDES]->(u) ');
                    promiseUserRel3.then(result=>{
                const  promiseData4=this.session.run('MATCH (d: Data{ year:'+year+', month:'+month+', day:'+day+'}),(s:Stop{stop:"'+destination+ '" }) MERGE (s)-[poteg:DATA]->(u)');
                   promiseData4.then(result=>{
                    const promisefinal=this.session.run(
                      'MATCH (r:Ride),(s:Stop) WHERE r.Origin = "'+origin+'" AND s.stop ="'+destination+ '"MERGE (r)-[ss:STOPS]->(s)', ) 
                      this.session.close();
                    })
                  })
                })
                } 
             });
        });
      })
      }

      findRides2(req, res){
        console.log("ovo je findRides!")
      let origin=req.body.origin;
      let year=req.body.data.year;
      let month=req.body.data.month;
      let day=req.body.data.day;
      let destination=req.body.destination;
      let that=this;
      console.log(destination);
      console.log(origin);
      let nizNodova=[];
      let users=[];
      let validNodes=[];
      let uniqueUsers=[];
      let uniqueValidNodes=[];
       const promise=this.session.run(
       ' Match path=(stb:Stop)-[:STOPS*]->(ste:Stop) Where stb.stop="'+origin+'" and ste.stop="'+destination+'" With filter(x in nodes(path) where x:Stop ) as stops Return extract(stop in stops|stop.stop) '

        );
        promise.then(result => {
          result.records.forEach(function (record) {
            //console.log({record});
            let nodovi=record.get(0); //svaki niz
           nizNodova.push(nodovi);
           console.log("Nodovi");
           console.log(nizNodova);
         nodovi.forEach(node=>{
          const promiseDatum=that.session.run('MATCH (s:Stop)-[r:DATA]-(d:Data{day:'+day+',month:'+month+',year:'+year+'}),(s:Stop)-[rides:RIDES]-(u) WHERE s.stop="'+node+'" RETURN s.stop,u.username');
          promiseDatum.then(rez=>{ 
            rez.records.forEach(function (record) {

             users.push(record.get(1));
             validNodes.push(record.get(0));
            })
            console.log("validni cvorovi")
            console.log(validNodes);
             users.forEach(user=>{
               if(!uniqueUsers.includes(user))
               uniqueUsers.push(user); 
             })
             validNodes.forEach(vn=>{
              if(!uniqueValidNodes.includes(vn))
              uniqueValidNodes.push(vn); 
            })

            if(!uniqueValidNodes.includes(node)){
              var index = nizNodova.indexOf(nodovi);
              if (index > -1) {
              nizNodova.splice(index, 1);
             }
            }

           console.log("NODEES");
            console.log(uniqueValidNodes)
            // console.log(nizNodova);
            // res.status(200).send(JSON.stringify(stvarnoPoslednji));


          })
         })
        }) 
      // console.log(nizNodova);
      })
      const promise2=new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 5000);
      }).then(function(result) {
      console.log("finalno@@");
      //console.log(nizNodova);
       let rezultat=[];
       rezultat.push(nizNodova);
       rezultat.push(uniqueUsers);
       console.log(rezultat);
      res.status(200).send(JSON.stringify(rezultat));
      })
      }
      getMyRides(req, res){
        console.log("ovo je user!")
        console.log(req.body)
        let username=req.body.username;
         const promise=this.session.run(
          'MATCH (u:User)-[r:RIDES]-(m) WHERE u.username="'+username+'" RETURN m; ' 
         );
         let list=[];
          promise.then(result => {
           this.session.close();
           console.log({result});
           result.records.forEach(function (record) {
             console.log({record});
               list.push(record.get(0).properties);
             }); 
             res.status(200).send(JSON.stringify(list));
     
           this.driver.close();
         });
      }


}
var myneo4j=new Neo4j();
module.exports=myneo4j;