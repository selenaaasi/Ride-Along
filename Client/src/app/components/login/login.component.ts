import { Component, OnInit, Input } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { LogIn, SendUSernameForSocketID } from 'src/app/store/actions/actions';
import { Ride } from 'src/app/models/ride';
import { CarpoolRide } from 'src/app/models/carpoolRide';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  username: string;
  @Input()
  password: string;

  users$:Observable<User[]>;
  
  constructor(
    private redis: RedisService,
    private store$:Store<State>
  ) { }

  ngOnInit() {
  }

  login() {
    // NE KORISTIIIIS
    
    // console.log('login()');

    // this.store$.dispatch(new LogIn(new User(this.username,'','',this.password,'','',-1)));
    // console.log('dispatch()');
    // this.store$.dispatch(new SendUSernameForSocketID(this.username));
    // this.redis.getAllCarpoolRides(this.username).then((rides) => {
    //   console.log(rides);
    // });

    
    // this.username = '';
    // this.password = '';
  
  }

}
