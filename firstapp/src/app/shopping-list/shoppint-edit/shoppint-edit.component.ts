import { outputAst } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shoppint-edit',
  templateUrl: './shoppint-edit.component.html',
  styleUrls: ['./shoppint-edit.component.css']
})
export class ShoppintEditComponent implements OnInit ,  OnDestroy{
   @ViewChild('f') slForm: NgForm;
   subscription:  Subscription;
   editMode = false;
   editItemIndex: number;
   editItem: Ingredient;

 constructor(private slService: ShoppingListService){}

 ngOnInit() {
  this.subscription =  this.slService.startEditing
  .subscribe((index: number) =>{
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem =  this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
  });
 }

 ngOnDestroy(){
   this.subscription.unsubscribe();
 }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    }else{

      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset()
  }

  
 onClear(){
  this.slForm.reset();
  this.editMode = false;
 }

 onDelete(){
  this.slService.deleteIngredient(this.editItemIndex);
  this.onClear();
 }
}
