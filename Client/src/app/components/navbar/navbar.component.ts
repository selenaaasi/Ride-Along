import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { SocketService } from 'src/app/services/socket.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { GetAllNotifications, GetUser } from 'src/app/store/actions/actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { MyNotification } from 'src/app/models/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  users$: Observable<User[]>;
  user: User;

  constructor(
    private store$: Store<State>,
    private socket: SocketService
  ) { 
    this.users$ = this.store$.select(state => state.user);
  }

  ngOnInit() {
    this.users$.subscribe(users => {
      if(users !== null && users !== undefined && users.length > 0) {
        users.forEach(user => {
          this.user = user;
        });
      }
    });
    if(this.user !== null && this.user !== undefined && this.user.username !== '') {
      this.store$.dispatch(new GetAllNotifications(this.user.username));
    }
  }

}
