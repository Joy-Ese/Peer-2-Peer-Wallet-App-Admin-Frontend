import { Injectable } from '@angular/core';
import * as signalR  from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  baseUrl : string = "http://localhost:7236";

  public hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/notification`).withAutomaticReconnect().build();
      
      this.hubConnection.start()
      .then(() => {
        console.log("Connection Established");
        return resolve(true);
      })
      .catch((err: any) => {
        console.log("Error Occured" + err);
        reject(err);
      });

    });
  }

  public stopChatConnection() {
    this.hubConnection.stop().catch(err => console.log(err));
  }


  onUpdateAdmin(callback: () => void) {
    this.hubConnection.on("UpdateAdmin", callback);
    }


  onReceiveMessage(callback: (userName:string) => void) {
    this.hubConnection.on("ReceiveMessage", callback);
    }


  // onUpdateChatCount(callback: () => void) {
  //   this.hubConnection.on("UpdateChatCount", callback);
  //   }



}
