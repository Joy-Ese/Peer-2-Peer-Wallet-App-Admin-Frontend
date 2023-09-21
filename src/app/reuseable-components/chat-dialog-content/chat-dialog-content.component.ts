import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminInformation } from '../adminImformation';
import { SignalrService } from 'src/app/services/signalr.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  userNAME!: any;
  chats! : any[];

  constructor(
    public dialogRef: MatDialogRef<ChatDialogContentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<ChatDialogContentComponent>,
    private http: HttpClient, 
    public signalrService : SignalrService) {
      this.userNAME = data;
    }

  ngOnInit() {
    this.signalrService.startConnection();
    this.adminDetails = AdminInformation();
    this.username = this.adminDetails.adminUsername;
    this.getAdminUserChat();
    this.readChat(this.username);

    this.signalrService.onReceiveMessage((name) => {
      if (name == this.userNAME) {
        this.getAdminUserChat();
      }
    });


    this.signalrService.hubConnection.on("ReceiveMessage", (userName, message) => {
      this.messages.push({ userName, message });
      this.getAdminUserChat();
    });
  }

  readChat(adminName: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userOrAdmin", "Admin");

    this.http.put(`${this.baseUrl}/api/Chat/ReadChat?${params}`, {username: adminName}, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSendMessage() {
    if (!this.username || !this.message || this.message.trim() == "") return;
    this.signalrService.hubConnection.invoke("SendMessage", this.username, this.message);
    this.message = "";
    this.getAdminUserChat();
  }

  postSendMsg(msgData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("chattingWIth", this.userNAME);

    this.http.post(`${this.baseUrl}/api/Chat/AdminChat?${params}`, msgData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.getAdminUserChat();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAdminUserChat() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("user", this.userNAME);

    this.http.get<any>(`${this.baseUrl}/api/Chat/GetChatsAdmin?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.chats = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}
