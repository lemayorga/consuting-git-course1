export class Recipe {
    public name: string;
    public description: string;
    public imagenPath: string; 

    constructor(name: string, desc: string, imagePath: string){
        this.name = name;
        this.description = desc;
        this.imagenPath = imagePath;
    }
}