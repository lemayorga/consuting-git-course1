
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

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

  @ViewChild('serverContentInput') serverContentInput: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameImput: HTMLInputElement) {

    console.log(this.serverContentInput);
   this.serverCreated.emit({ 
    serverName: nameImput.value, 
    // serverContent: this.newServerContent
    serverContent: this.serverContentInput.nativeElement.value  
  });
  }

  onAddBlueprint(nameImput: HTMLInputElement) {
    this.bluePrintCreated.emit({ 
      serverName:  nameImput.value, 
      // serverContent: this.newServerContent 
      serverContent: this.serverContentInput.nativeElement.value  
    });
  }
}
