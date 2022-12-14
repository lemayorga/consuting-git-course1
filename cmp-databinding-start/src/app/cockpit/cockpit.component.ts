
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string}>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{ serverName: string, serverContent: string}>();
 // newServerName = '';
  newServerContent = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameImput: HTMLInputElement) {
   this.serverCreated.emit({ serverName: nameImput.value, serverContent: this.newServerContent });
  }

  onAddBlueprint(nameImput: HTMLInputElement) {
    this.bluePrintCreated.emit({ serverName:  nameImput.value, serverContent: this.newServerContent });
  }
}
