import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"; 
import { LogLevel } from '@microsoft/signalr';
import { ChartModel } from '../_Models/ChartModel';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withAutomaticReconnect([0,10000,20000,30000])
                              .withUrl('http://localhost:5001/location')
                              // .withUrl('http://10.4.5.17:2020/location')
                              .build();
      this.hubConnection
        .start()
        .then(() => {console.log('Connection started');
                     return true})
        .catch(err => {console.log('Error while starting connection: ' + err);
                      return false})
    }

}
