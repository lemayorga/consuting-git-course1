import { outputAst } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shoppint-edit',
  templateUrl: './shoppint-edit.component.html',
  styleUrls: ['./shoppint-edit.component.css']
})
export class ShoppintEditComponent {
 
 @ViewChild('nameInput') nameInputRef : ElementRef;
 @ViewChild('amountInput') amountInputRef : ElementRef;

 constructor(private slService: ShoppingListService){}
  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

  this.slService.addIngredient(newIngredient);
  }
}
