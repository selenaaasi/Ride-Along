import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { async } from 'q';
import { Store } from '@ngrx/store';
import { State } from '../store/store';
import { LogInSuccess } from '../store/actions/actions';
import { QuickRide } from '../models/quickride';
import { Ride } from '../models/ride';
import { CarpoolRide } from '../models/carpoolRide';
import { MyNotification } from '../models/notification';

const redisURL = "http://localhost:3004/redis";

@Injectable({
  providedIn: 'root'
})


export class RedisService {

  constructor(
    private store$: Store<State>
  ) { }

  deleteNotification = async (notification: MyNotification) => {
    console.log('deleteNotification()');
    
    const strObj = JSON.stringify(notification);
    console.log({strObj});
    const rawResponse = await fetch(redisURL + '/delete/notification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
  }
  addRide = async (ride: CarpoolRide) => {
    console.log("addRide()");

    const strObj = JSON.stringify(ride);
    const rawResponse = await fetch(redisURL + '/add-carpool-ride', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
  }
  getAllCarpoolRides = async (username: string) => {
    console.log('getAllCarpoolRides()');
    try {
      const strObj = JSON.stringify({username});
      const res = await fetch(redisURL + '/get-all-carpool-rides', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: strObj
      });
      const rides = await res.json();
      console.log("getAllCarpoolRides()");
      // console.table(rides);

      return JSON.parse(rides);
    } catch (error) {
      return [];
    }
  }

  getRedisUsers = async () => {
    try {
      const res = await fetch(redisURL + "/users");
      const users = await res.json();
      console.log("getRedisUsers()");
      console.log([{users}]);

      return users;
    } catch (error) {

    }
  }

  postRedisUser = async (user: User) => {
    console.log("postRedisUser()");
    // console.log({user});
    try {
      this.getRedisUsers() // Ova logika da se prebaci na server zbog brzine
      .then(users => {
        const key = user.username;

        if (!(users as any[]).includes(key)) {
          console.log("Validan user");
          this.addUser(user);
        } else {
          console.log("Nevlidan user");
        }
      });
    } catch {}
  }

  logInUser = async (user: User) => {
    console.log("logInUser()");

    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(redisURL + '/user/login', {
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
      return new User("422",'error', 'Log in unsuccessful','','','', 422);

    } else {
      console.log("Log in success");
      // console.log({content});

      // this.store$.dispatch(new LogInSuccess(content, true));
      return content;
    }

    // return content;
  }
  addUser = async (user: User) => {
    console.log("addUser()");

    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(redisURL + '/user/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });

    const content = await rawResponse.json();
    console.log(`Response status: ${rawResponse.status}`);
    if (rawResponse.status === 422) {
      console.log(content.error);
      // return new User('', '', '', '', '', '', -1);
      this.store$.dispatch(new LogInSuccess(new User("422",'error', 'Sign in unsuccessful','','','', 422), false));

    }
    console.log({content});
    // return content;
    this.store$.dispatch(new LogInSuccess(content, true));

  }
  getAllRides=async (user:User)=>{
    console.log("getAllRides()");
    (console.log(user));
    const strObj = JSON.stringify(user);
    const rawResponse = await fetch(redisURL + '/rides/myrides', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:strObj
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

}
