import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { SocketService } from 'src/app/services/socket.service';
import { SendMessage, PushNotification, JoinChat } from 'src/app/store/actions/actions';
import { MyMessage } from 'src/app/models/message';
import { MyNotification } from 'src/app/models/notification';
import { CarpoolRide } from 'src/app/models/carpoolRide';

@Component({
  selector: 'app-quick-ride-chat',
  templateUrl: './quick-ride-chat.component.html',
  styleUrls: ['./quick-ride-chat.component.css']
})
export class QuickRideChatComponent implements OnInit {

  username: string;
  @Input()
  message: string;
  @Input() 
  chatusername_iz_emita;
  
  chatUserInput: string;

  chatusername:string;


  bigMessage: string;

  messagess$: Observable<MyMessage[]>;

  user$:Observable<User[]>;
  user:User;

  chats$: Observable<MyMessage[]>;

  intervalID;
  constructor(
    private stor$: Store<State>,
    private socket: SocketService
  ) {
    this.user$ = this.stor$.select(state => state.user);
    this.messagess$ = this.stor$.select(state => state.messages);
    this.chats$ = this.stor$.select(state => state.chats);
    this.user = null;
    this.chatusername = null;
   }

  ngOnInit() {
    if(this.user === null) {
      this.user$.subscribe(users => {
        if(users === undefined) {
          return;
        }
        users.forEach(user => this.user = user);
      });
      if(this.user !== null && this.user !== undefined && this.user.stars < 400 && 
        ( this.user.username !== '' && this.user.username !== undefined && this.user.username !== null)) {
          this.socket.createChat(this.user.username);
          this.stor$.dispatch(new SendMessage(this.user.username,this.user.username,''));
      }
    }
    this.messagess$.subscribe(messages => {
      // console.log({messages});
      if(messages === undefined || messages[0] === undefined) {
        return;
      }
      // this.chatusername_iz_emita = messages[0].chatUser;
      // console.log('POSTAVLJANJE CHAT UESRNAME IZ EMITA', this.chatusername_iz_emita);

      // MOZDA OVO
      // if(this.chatusername_iz_emita !== undefined && this.chatusername_iz_emita !== null && this.chatusername_iz_emita !== ''){
      //   if(this.chatusername_iz_emita !== messages[0].chatUser){
      //     console.log('Ne prikaziuje je! NgOnInit()');
      //     return;
      //   }
      // }
      if(this.chatusername_iz_emita !== messages[0].chatUser)
        return;
        
      this.bigMessage = '\n';
      messages.forEach(message => {
        this.bigMessage += message.message + '\n';
      });
    }); 
  }
  enterChatRoom(chat: MyMessage) {
    this.chatusername_iz_emita = chat.chatUser;
    // console.log(`enterChatRoom(): ${this.chatusername_iz_emita}`);
    this.stor$.dispatch(new SendMessage(chat.chatUser,chat.username,''));
    this.reciveMessages();
  }
  pushNotification(notification: MyNotification) {
    // console.log('pushNotifiaction()');
    if(notification !== null && notification !== undefined) {
      this.stor$.dispatch(new PushNotification(notification));
    }
    this.socket.popNotification();
  }
  sendMessage2() {
    // console.log(`sendMessage2() to : ${this.user.username}`);
    if(this.chatusername_iz_emita === undefined && this.user !== null) {
      // salje samom sebi poruku u svoj room
      this.chatusername_iz_emita = this.user.username; // promena
      this.stor$.dispatch(new SendMessage(this.user.username,this.user.username, this.message));
    } else {
      // salje u neciji chat room
      // console.log(`sendMessage2() to : ${this.chatusername_iz_emita}`);
      this.stor$.dispatch(new SendMessage(this.chatusername_iz_emita,this.user.username, this.message));
    }
    this.reciveMessages();
    this.message = '';
  }
  startChat() {
    // console.log('startChat()');
    // if( this.chatUserInput !== undefined && this.chatUserInput !== '') {
    //   // mogla bi provera da li user postoji
    //   this.stor$.dispatch(new JoinChat(this.chatUserInput,this.user.username));
    //   this.stor$.dispatch(new SendMessage(this.chatUserInput,this.user.username,''));
    //   this.chatusername_iz_emita = this.chatUserInput;
    // }
      
    if( this.chatusername_iz_emita !== undefined && this.chatusername_iz_emita !== '') {
      // mogla bi provera da li user postoji
      this.stor$.dispatch(new JoinChat(this.chatusername_iz_emita,this.user.username));
      this.stor$.dispatch(new SendMessage(this.chatusername_iz_emita,this.user.username,''));
    }
    
  }
  
  reciveMessages() {
    this.messagess$.subscribe(messages => {
      // console.log({messages});
      if(messages === undefined) {
        return;
      }
      if(this.chatusername_iz_emita !== messages[0].chatUser){
        console.log('Ne prikaziuje je!');
        return;
      }
      this.bigMessage = '\n';
      messages.forEach(message => {
        let strMessage = message.message;
        this.bigMessage += strMessage + '\n';
      });
    });
  }
}
