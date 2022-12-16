import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagenPath: string; 
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ingredientes: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagenPath = imagePath;
        this.ingredients = ingredientes;
    }
}