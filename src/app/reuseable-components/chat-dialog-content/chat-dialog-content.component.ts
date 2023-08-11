import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminInformation } from '../adminImformation';
import { SignalrService } from 'src/app/services/signalr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-dialog-content',
  templateUrl: './chat-dialog-content.component.html',
  styleUrls: ['./chat-dialog-content.component.css']
})
export class ChatDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  adminDetails! : any;

  messages: { userName: string, message: string }[] = [];
  message: string = "";
  username: string = "";
  chatter: any = null;

  constructor(
    public dialogRef: MatDialogRef<ChatDialogContentComponent>, 
    private http: HttpClient, 
    public signalrService : SignalrService) {}

  ngOnInit() {
    this.signalrService.startConnection();
    this.adminDetails = AdminInformation();
    this.username = this.adminDetails.adminUsername;

    this.signalrService.hubConnection.on("ReceiveMessage", (userName, message) => {
      this.messages.push({ userName, message });
      if (this.chatter == null) {
        this.chatter = userName;
      }
    });
  }

  onSendMessage() {
    if (!this.username || !this.message || this.message.trim() == "") return;
    // this.signalrService.hubConnection.invoke("SendMessage", this.username, this.message, this.role);
    // this.message = "";
    this.signalrService.hubConnection.invoke("SendMessage", this.username, this.message);
    this.message = "";
  }

}
