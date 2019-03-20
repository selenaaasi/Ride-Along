import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { USERLIST_REQUESTED, UserListRequested, FriendAdded, UserLiked, UserDisliked } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  userlist$:Observable<User[]>;
  user$: Observable<User[]>;
  user: User;
  constructor(private store$:Store<State>) { 
    this.user$ = this.store$.select(state => state.user);
  }

  ngOnInit() {
    this.userlist$=this.store$.select(state=>state.userlist);
    this.user$.subscribe((users) => {
      if (users !== undefined) {
        users.forEach((user) => {
          this.user = user;
        });
      }
  
    });
  }
  test(){
    console.log("U TESTU SAM");
    this.store$.dispatch(new UserListRequested(new User('13','','','','','',1)));
  }
  addFriend(usertoadd)
  {
    console.log("U ADD FRIEND SAM");
    console.log(this.user);
    let niz:User[]=[];
    niz.push(this.user);
    niz.push(new User(usertoadd.username,usertoadd.surename,usertoadd.name,usertoadd.password,usertoadd.email,usertoadd.color,usertoadd.stars));
    this.store$.dispatch(new FriendAdded(niz));
    console.log(niz);

  }
  userLiked(usertolike)
  {
    console.log("U USER LIKED");
    let niz:User[]=[];
    niz.push(this.user);
    niz.push(new User(usertolike.username,usertolike.surename,usertolike.name,usertolike.password,usertolike.email,usertolike.color,usertolike.stars));
    this.store$.dispatch(new UserLiked(niz));
  }
  userDisliked(usertodislike)
  {
    let niz:User[]=[];
    niz.push(this.user);
    niz.push(new User(usertodislike.username,usertodislike.surename,usertodislike.name,usertodislike.password,usertodislike.email,usertodislike.color,usertodislike.stars));
    this.store$.dispatch(new UserDisliked(niz));
  }

}
