import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { SocketService } from 'src/app/services/socket.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { GetAllNotifications, GetUser, ChangeNotification, SendMessage, SetChatUsername, JoinChat, ChangeNotificationRedis, DeleteNotification, UpdateUser, FindFriends, FindMutualFriends, FindDisliked, FindLiked, UserListRequested, LogOut, AddSharedRide } from 'src/app/store/actions/actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { MyNotification } from 'src/app/models/notification';
import { MyMessage } from 'src/app/models/message';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  @Input()
  usernameformatch: string;

  @Input()
  nameupdate: string;
  @Input()
  surnameupdate: string;
  @Input()
  passwordupdate: string;
  @Input()
  emailupdate: string;



  @Input()
  user: User;
  users$: Observable<User[]>;
  chatUsername: string;

  notifications$: Observable<MyNotification[]>;
  not: MyNotification[];

  constructor(
    private store$: Store<State>,
    private socket: SocketService
  ) { 
    this.users$ = this.store$.select(state => state.user);
    this.notifications$ = this.store$.select(state => state.notifiations);
  }

  ngOnInit() {
    this.users$.subscribe(users => {
      if(users !== null && users !== undefined && users.length > 0) {
        users.forEach(user => {
          this.user = user;
        });
      }
    });

  }
  deleteNot(n:MyNotification) {
    console.log('deleteNot()'); 
    this.store$.dispatch(new DeleteNotification(n));
  }
  getNot(username){
    console.log('gotNot()', username);
    this.store$.dispatch(new GetAllNotifications(username));
    this.notifications$.subscribe((allNot) => {
      console.table(allNot);
      this.not = allNot;
    });
  }
  seen(n: MyNotification) {
    // console.log('seen',n.seen);
    // n.seen = true;
    console.log('seen()',{n})
    this.store$.dispatch(new ChangeNotification(n,true,undefined));
  }
  approve(n: MyNotification, approve: boolean) {
    if(approve) {
      const newN = new MyNotification(n.senderUsername,n.reciverUsername,n.stopName,n.date,true,true);
      const oldD = new MyNotification(n.senderUsername,n.reciverUsername,n.stopName,n.date,false,false);
      this.store$.dispatch(new ChangeNotificationRedis(oldD,newN));
    } else {
      const newN = new MyNotification(n.senderUsername,n.reciverUsername,n.stopName,n.date,false,true);
      const oldD = new MyNotification(n.senderUsername,n.reciverUsername,n.stopName,n.date,false,false);
      this.store$.dispatch(new ChangeNotificationRedis(oldD,newN));
    }
    
    n.approve = approve;
    let niz:User[]=[];
    let osoba1=new User(n.reciverUsername,'','','','','',0,0);
    let osoba2=new User(n.senderUsername,'','','','','',0,0);
    niz.push(osoba1);
    niz.push(osoba2);
    this.store$.dispatch(new AddSharedRide(niz));
    this.store$.dispatch(new ChangeNotification(n));
  }

  usersReview(){
    this.store$.dispatch(new UserListRequested(this.user));
  }
  likedUsers(){
    this.store$.dispatch(new FindLiked(this.user));
  }
  dislikedUsers(){
    this.store$.dispatch(new FindDisliked(this.user));
  }
  mutualFriends(){
    let niz:User[]=[];
    niz.push(this.user);
    niz.push(new User(this.usernameformatch,'','','','','',0));
    this.store$.dispatch(new FindMutualFriends(niz));
  }
  findFriends(){
    this.store$.dispatch(new FindFriends(this.user));
  }
  updateOne(){

    this.user.name=this.nameupdate;
    this.user.surname=this.surnameupdate;
    this.store$.dispatch(new UpdateUser(this.user));
  }
  updateTwo(){
    this.user.email=this.emailupdate;
    this.user.password=this.passwordupdate;
    this.store$.dispatch(new UpdateUser(this.user));
  }
  logOut(){
    this.store$.dispatch(new LogOut());
  }
  viewCarpoolRides(){
    console.log("U VIEW CARPOOL RIDES SAM");
  }

}
