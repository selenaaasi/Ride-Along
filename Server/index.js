const Redis = require("./redis");
const Neo4J = require("./neo4j");

//express
const express = require('express');
const bodyParser = require('body-parser');

Redis.connect();
// Neo4J.addSharedRideC('ruus_23','sin_simke13',1);
// Neo4J.addSharedRideC('ruus_23','selenaasi',1);
// Neo4J.addSharedRideC('sin_simke13','ruus_23',1);
// Neo4J.addSharedRideC('selenaasi','sin_simke13',1);

// Neo4J.addPositiveReview('selenaasi','sin_simke13',1);Neo4J.addPositiveReview('sinsimke13','selenaasi',1);
// Neo4J.addPositiveReview('ruus_23','selenaasi',1);
// Neo4J.addNegativeReview('ruus_23','sin_simke13',1);
// Neo4J.addPositiveReview('sinsimke13','ruus_23',1);
Neo4J.addFriend('sin_simke13','selenaasi',1);
Neo4J.addFriend('sin_simke13','ruus_13',1);
Neo4J.addFriend('selenaasi','ruus_13',1);
Neo4J.addFriend('ruus_13','sin_simke13',1);
// Set Port
const port = 3004;
// const port = 4200;

// Init app
const app = express();

// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
  // res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// novo
const push_notification = 'push-notification';
const pop_notification = `pop_notification`;
const all_notifications = `all-notifications`; 
const notifications_user = 'notifications-user-';
const change_notification = 'change-notification';
const set_username = 'set_username';

app.post('/redis/delete/notification', (req, res, next) => {
  console.log("/redis/delete/notification");
  // Redis.addRide(req.body); notifications_user+username
  const sUser = req.body.senderUsername;
  const strObj = JSON.stringify(req.body);
  console.log({strObj});
  Redis.redisClient.SREM(notifications_user+sUser,strObj, (err,obj) => {
    if(obj === 0) {
      console.log('Takava notifikacija ne postoji', sUser);
    } else {
      console.log('Notifikacija uspesno obrisana!', sUser);
    }
  }); 
  const rUSer = req.body.reciverUsername;
  Redis.redisClient.SREM(notifications_user+rUSer,strObj, (err,obj) => {
    if(obj === 0) {
      console.log('Takava notifikacija ne postoji', rUSer);
    } else {
      console.log('Notifikacija uspesno obrisana!', rUSer);
    }
  });
});

//novo
//ADD ride
app.post('/redis/add-carpool-ride', (req, res, next) => {
  console.log("/redis/add-carpool-ride");
  Redis.addRide(req.body);
});
//GET all rides
app.post('/redis/get-all-carpool-rides' , (req, res, next) => {
  console.log('/redis/get-all-carpool-rides');
  console.log(req.body.username);
  Redis.getAllRides(req.body.username, res);
});

app.get('/redis/users', function(req, res, next){
  console.log('/redis/users');

  Redis.getAllUsers(res);
});

//Log In :D
app.post('/redis/user/login', function(req, res, next){
  console.log('/redis/user/login');

  Redis.logIn(req, res);
});

app.post('/redis/user/login', function(req, res, next){
  console.log('/redis/user/login');

  Redis.logIn(req, res);
});
//saving a quickride
app.post('/neo4j/rides/savequickride', function(req, res, next){
  console.log("SAVE MY QUICKRIDE");
  Neo4J.saveMyQuickRides(req,res);
});
//refresh
app.post('/neo4j/rides/refreshquickrides', function(req, res, next){
  Redis.returnCachedRides(req.body.username,Neo4J,res);  
});
//delete a quickride
app.post('/neo4j/rides/deletequickride', function(req, res, next){
  Redis.deleteQuickRide(req.body.username,Neo4J,res);  
});
//get friends list
app.post('/neo4j/rides/getfriendslist', function(req, res, next){
  Neo4J.getFriends(req.body.username,res);
});
//add negative feedback
app.post('/neo4j/rides/addnegativefeedback', function(req, res, next){
  Neo4J.addNegativeReview(req.body[0].username,req.body[1].username,res);
});
//add positive feedback
app.post('/neo4j/rides/addpositivefeedback', function(req, res, next){
  Neo4J.addPositiveReview(req.body[0].username,req.body[1].username,res);  
});
//add shared ride connection
app.post('/neo4j/rides/addsharedrideconnection', function(req, res, next){
  console.log("U Add shared ride sam");
  console.log(req.body);
  Neo4J.addSharedRideC(req.body[1].username,req.body[0].username,res);
});
//add friend
app.post('/neo4j/rides/addfriend', function(req, res, next){
  Neo4J.addFriend(req.body[0].username,req.body[1].username,res);
});
//request userlist for review
app.post('/neo4j/rides/requestuserlist', function(req, res, next){
    Neo4J.getUsersToReview(req.body.username,res);
});
//request userlist positive feedback
app.post('/neo4j/rides/requestuserlistpositivefeedback', function(req, res, next){
    Neo4J.getPositiveReviews(req.body.username,res);
});
//request userlist negative feedback
app.post('/neo4j/rides/requestuserlistnegativefeedback', function(req, res, next){
    Neo4J.getNegativeReviews(req.body.username,res);
})
//request mutual friends
app.post('/neo4j/rides/requestmutual', function(req, res, next){
  console.log("U request mutual");
  Neo4J.getMutualFriends(req.body[0].username,req.body[1].username,res);
});
//update user request
app.post('/neo4j/rides/updateuser', function(req, res, next){
   Neo4J.updateUser(req.body,res);
});

//Sign Up :D 
app.post('/redis/user/add', function(req, res, next){
  console.log("/redis/user/add");

  Redis.signUp(req, res);
  Neo4J.signUp(req,res);
});

app.post('/neo4j/rides/addRide',function(req, res, next){
  console.log("/neo4j/rides/addRide");
  console.log(req.body);
  Neo4J.addCarpoolRide(req, res);
  Redis.addRide(req.body);
})

app.post('/neo4j/rides/findrides',function(req, res, next){
  console.log("/neo4j/rides/findrides");
  Neo4J.findRides2(req, res);
})
app.post('/redis/rides/myrides',function(req, res, next){
  console.log('/redis/rides/myrides');
  console.log(req.body);
  Redis.getAllRides(req.body.username,res);

}
)

app.listen(port, function(){
  console.log('Server started on port '+port);
});