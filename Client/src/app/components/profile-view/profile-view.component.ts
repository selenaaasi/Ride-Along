import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { SocketService } from 'src/app/services/socket.service';
import { SendMessage } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user$: Observable<User[]>;
  user: User;
  name: string;

  juseri: any[];

  constructor(
    private store$: Store<State>,
    private socket: SocketService
  ) {
    this.user$ = this.store$.select(state => state.user);
    this.juseri = [{name: 'Ruki', surname: 'Rule'}, {name: 'Ruki1', surname: 'Rule1'}, {name: 'Ruki1', surname: 'Rule1'}];
  }

  ngOnInit() {
    this.user$.subscribe((users) => {
      if (users !== undefined) {
        users.forEach((user) => {
          this.user = user;
          this.name = this.user.name.toUpperCase();
        });
      }
    });
  }
  
  

}
