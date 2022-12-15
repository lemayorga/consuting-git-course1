import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstapp';
  loadedFeacture: string = 'recipe';

  onNavigate(feacture:string){
    this.loadedFeacture = feacture;
  }
}
