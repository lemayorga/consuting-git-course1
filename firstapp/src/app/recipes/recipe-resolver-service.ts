import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage-service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService: DataStorageService,
                private recipService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipService.getRecipes();
        if(recipes.length == 0){
            return this.dataStorageService.fetchRecipes()
        }else{
            return recipes;
        }
    }
}