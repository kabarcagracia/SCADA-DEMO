import { Injectable, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable() 
export class WebsocketService { 


    constructor(private socket: Socket) {}

    sendMessage(msg: string) {
      this.socket.emit('message', msg);
    }
    getMessage(topic: string) {
      return this.socket.fromEvent(topic).pipe(map((data: any) => data));
    }
}
