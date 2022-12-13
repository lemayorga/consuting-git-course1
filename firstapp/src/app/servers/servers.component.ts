import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-servers',
 // selector: '[app-servers]', // selector  forma #2
 // selector: '.app-servers', // selector  forma #3
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
   allowNewSerer = false;
   serverCreated: boolean = false;9
   serverCreatonStatus = "No serer was created";
   serverName: string = "";
   servers = ['servidor 1', 'servidor 2'];

   constructor(){ 
    setTimeout(() => {
      this.allowNewSerer = true;
    }, 2000);
   }

   ngOnInit() {
     
   }

   onCreateServer(){
    this.serverCreatonStatus = 'Server was created! Name is ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
   }

   onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
   }
}
