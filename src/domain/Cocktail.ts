import {CocktailIngredient} from "./CocktailIngredient";
import {AlcoholType} from "./AlcoholType";

export interface Cocktail {

    id: number,
    name: string,
    category: string,
    alcoholType: AlcoholType,
    glass: string,
    instructions: string,
    imageUrl: string,
    ingredients: CocktailIngredient[]

}
