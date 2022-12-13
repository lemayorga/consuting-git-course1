import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simplye a test', 'https://static.onecms.io/wp-content/uploads/sites/43/2022/02/16/21014-Good-old-Fashioned-Pancakes-mfs_001.jpg')
 
  ];

  constructor(){ }

  ngOnInit(): void {
    
  }
}
