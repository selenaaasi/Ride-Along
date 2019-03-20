import { Injectable } from '@angular/core';


import * as socketIo from 'socket.io-client';
import { MyMessage } from '../models/message';
import { Observable } from 'rxjs';
import { AnyFn } from '@ngrx/store/src/selector';
import { MyNotification } from '../models/notification';

const nodeURL = 'http://localhost:3005';

const push_notification = 'push-notification';
const pop_notification = `pop_notification`;
const all_notifications = `all-notifications`; 
const change_notification = 'change-notification';
const set_username = 'set_username';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(

  ) { 
    this.initSocket();
  }

  initSocket() {
    // console.log('InitSocket()');
    this.socket = socketIo(nodeURL);
    console.log(`Client connected on: ${nodeURL}, for socket`);
  }
  public sendUsername(username: string) {
    console.log('sendUsername');
    this.socket.emit(set_username, username);
  }
  public changeNotification(notification: MyNotification, newNotification: MyNotification) {
    console.log('changeNotification()');
    this.socket.emit(change_notification,[notification, newNotification]);
  }

  public getAllNotificationsEmit(username) {
    console.log('getAllNotifications()');
    this.socket.emit(all_notifications,username);
  }
  public getAllNotificationsOn() {
    return new Observable<MyNotification[]>(observer => {
      this.socket.on(all_notifications, (allNot) => {
        console.table(allNot);

        return observer.next(allNot);
      });
    });
  }
  public pushNotification(notification: MyNotification) {
    console.log('pushNotification()');

    this.socket.emit(push_notification, notification);
  }
  public popNotification() {
    return new Observable<MyNotification>( observer => {
      this.socket.on(pop_notification, (notif) => {
        console.log({notif});
        return observer.next(notif);
      });
    });
  }
  public createChat(usernam: string) {
    console.log('createChat(): ');        
    // console.log('createChat(): ', {usernam});    
    this.socket.emit('create-chat', usernam);
  }
  public joinChat(chatusername: string, myUsername: string) {
    console.log('joinChat()');
    // console.log('joinCHat(): ', {chatusername});
    // this.socket.emit('join-chat',{chatUsername: chatusername, username: myUsername}); //promena
    this.socket.emit('join-chat',new MyMessage(chatusername,myUsername,''));
  }
  public sendMessage(chatUsername:string, username: string, message: string) {
    console.log('sendMessage()');
    // this.createChat('ruki');
    // this.joinChat('ruki',username);
    if(message === '') {
      // this.socket.emit('chat', new MyMessage('',chatUsername, message));
      this.socket.emit('chat', new MyMessage(chatUsername,username, message));
    } else {
      // this.socket.emit('chat', new MyMessage('',chatUsername, `${username}: ${message}`));
      this.socket.emit('chat', new MyMessage(chatUsername,username, `${username}: ${message}`));
      
    }
  }
  public reciveAllMessages() {
    console.log('reciveAllMessages()');
    // const chatUSername = 'chat'+username;
    // const chatUSername = 'chat';

    // console.log({chatUSername});
    return new Observable<any[]>(observer => {
      this.socket.on('chat', (messageArray: any[]) => {
        // console.log('Recive message:', {messageArray});
        return observer.next(messageArray); 
      });
    });
  }
}
