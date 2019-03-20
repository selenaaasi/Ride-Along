import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { async } from 'q';
import { Store } from '@ngrx/store';
import { State } from '../store/store';
import { LogInSuccess } from '../store/actions/actions';
import { QuickRide } from '../models/quickride';
import { Search } from '../models/search';
import { CarpoolRide } from '../models/carpoolRide';

const neo4jURL = "http://localhost:3004/neo4j";

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  
  constructor() { }


  saveMyQuickride = async (quickride: QuickRide) => {
    const strObj = JSON.stringify(quickride);
    const rawResponse = await fetch(neo4jURL + '/rides/savequickride', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Save ride unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  refreshMap = async (user: User) => {
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/refreshquickrides', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  deleteQuickRide= async (user: User) => {
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/deletequickride', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Delete unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }


  requestUserList = async (user: User) => {
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/requestuserlist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  findFriends=async (user:User)=>{
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/getfriendslist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  findLiked=async (user:User)=>{
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/requestuserlistpositivefeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }

  }
  findDisliked=async (user:User)=>{
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/requestuserlistnegativefeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  addFriend=async (users:User[])=>{
    const strObj = JSON.stringify(users);
    const rawResponse = await fetch(neo4jURL + '/rides/addfriend', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  userLiked=async (users:User[])=>{
    const strObj = JSON.stringify(users);
    const rawResponse = await fetch(neo4jURL + '/rides/addpositivefeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  userDisiked=async (users:User[])=>{
    const strObj = JSON.stringify(users);
    const rawResponse = await fetch(neo4jURL + '/rides/addnegativefeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  findMutual=async (users:User[])=>{
    const strObj = JSON.stringify(users);
    const rawResponse = await fetch(neo4jURL + '/rides/requestmutual', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  addSharedRide=async (users:User[])=>{
    const strObj = JSON.stringify(users);
    const rawResponse = await fetch(neo4jURL + '/rides/addsharedrideconnection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  updateUser=async (user:User)=>{
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/updateuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Refresh unsuccessful");
      console.log(content.error);
      return content;
    } else {
      console.log({content});
      return content;
    }
  }
  findRides=async (search:Search)=>{
    console.log("logInUser()");

    const strObj = JSON.stringify(search);
    const rawResponse = await fetch(neo4jURL + '/rides/findrides', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });

    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Log in unsuccessful");
      console.log(content.error);

    } else {
      console.log("MyRidesSuccess");
      console.log({content});
      return content;
    }
  }
  getMyRides=async (user:User)=>{
    console.log("logInUser()");

    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(neo4jURL + '/rides/myrides', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });

    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Log in unsuccessful");
      console.log(content.error);
      
      // this.store$.dispatch(new LogInSuccess(new User("422",'error', 'Log in unsuccessful','','','', 422), false));
     // return new User("422",'error', 'Log in unsuccessful','','','', 422);

    } else {
      console.log("MyRidesSuccess");
      console.log({content});
      return content;
    }
  }
  addRide = async (carpoolRide: CarpoolRide) => {
    console.log("addRide() u neo4j.service");

    const strObj = JSON.stringify(carpoolRide);
    console.log(strObj);
    const rawResponse = await fetch(neo4jURL + '/rides/addRide', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });

    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status > 400) {
      console.log("Add ride successfull");
      console.log(content.error);
    } else {
      console.log("Log in success");
      console.log({content});
      return content;
    }
  }




}
