import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppintEditComponent } from "./shoppint-edit/shoppint-edit.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppintEditComponent,
    ],
    imports:[
        FormsModule,
        RouterModule.forChild([
            {path:'' , component: ShoppingListComponent}
        ]),
        SharedModule,
    ],
    providers: [
        LoggingService
       ],
})
export class ShoppingListModule {}