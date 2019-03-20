import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { RedisService } from 'src/app/services/redis.service';

const  redisURL = "http://localhost:3004/redis";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  @Input()
  user: User;
  @Input()
  username: string;
  @Input()
  passwd2: string;

  constructor(
    private redisService: RedisService
  ) { }

  ngOnInit() {
    this.user = new User('', '', '', '', '', '', -1);
  }



  addUser = async() =>  {
    console.log("addUser()");
    const strObj = JSON.stringify(this.user);
    const rawResponse = await fetch(redisURL + '/user/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: strObj
    });
    console.log(this.user);
    const content = await rawResponse.json();
  } 

  signUp() {
    console.log(`signUp()`);
    if (this.user !== null || this.user !== undefined) {
      this.user.username = this.username;
      this.user.color=this.getRandomColor();
      this.user.password = this.passwd2 === this.user.password ? this.user.password : '';
      if (this.user.password !== '') {
        console.log("Validno slanje");
        // this.redisService.postRedisUser(this.user);
        this.redisService.addUser(this.user);

      } else {
        console.log("Passwords do not match!");
      }
    }

  }
  getRandomColor(){
    return (Math.random() * 0xFFFFFF << 0).toString(16);
  }

}
