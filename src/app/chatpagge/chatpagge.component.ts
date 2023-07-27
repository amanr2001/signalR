import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chatpagge',
  templateUrl: './chatpagge.component.html',
  styleUrls: ['./chatpagge.component.css']
})
export class ChatpaggeComponent {
  userarr: any;
  private hubConnection!: signalR.HubConnection;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe(p => {
      console.log(p['userid']);
      this.http.get('https://localhost:7122/WeatherForecast/users/' + p['userid']).subscribe(x => {
        console.log(x);
      this.userid=p['userid']
        this.userarr = x
        
        this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:7122/chatsocket?userId=' + p['userid'])
          .build();

        this.hubConnection.start()
          .then(() => {
            console.log('SignalR connection started.');


          })
          .catch(err => console.error('Error starting SignalR connection:', err));
        this.hubConnection.on('messagereceived', (mess: any) => {
          console.log(mess);
        })
      })

    })
  }

  mainid!: number;
  userid!:number;
  userchat(userid: number) {
    console.log(userid);
    this.mainid = userid
    let d = {user1:this.userid,user2:userid}
        this.http.post('https://localhost:7122/WeatherForecast/getconvo',d).subscribe(p=>{
          console.log(p);
          
        })

  }

  send(mess: any) {
    console.log(mess);
    console.log(this.mainid);

    this.hubConnection.invoke('sendmess', mess, this.mainid).then(() => {
      // console.log(mess);

      this.route.params.subscribe(p => {

        let userd = { user1: p['userid'], user2: this.mainid,content:mess }
        this.http.post<any>('https://localhost:7122/WeatherForecast/createconvo', userd).subscribe(p => {
          console.log(p['convid']);

        })
      })

    })
  }
}
