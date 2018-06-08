import * as request from "request-promise-native";
import {
    CocktailDetailDto,
    CocktailDto,
    FilterCocktailsResponse,
    GetCocktailDetailsResponse,
    GetIngredientsResponse
} from "./CocktailApiModels";

export class CocktailDbApiClient {

    private readonly BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
    private readonly GET_INGREDIENTS_URI = `${this.BASE_URL}/list.php?i=list`;
    private readonly FILTER_COCKTAILS_URI = `${this.BASE_URL}//filter.php?i={ingredient}`;
    private readonly GET_DETAILS_URI = `${this.BASE_URL}/lookup.php?i={cocktailId}`;

    async getIngredients(): Promise<string[]> {
        const response = await this.httpGet<GetIngredientsResponse>(this.GET_INGREDIENTS_URI);
        return response.drinks.map(it => it.strIngredient1);
    }

    async filterCocktails(ingredient: string): Promise<CocktailDto[]> {
        const uri = this.FILTER_COCKTAILS_URI.replace("{ingredient}", encodeURIComponent(ingredient));
        const response = await this.httpGet<FilterCocktailsResponse>(uri);
        return response.drinks;
    }

    async getCocktailDetails(cocktailId: string): Promise<CocktailDetailDto> {
        const uri = this.GET_DETAILS_URI.replace("{cocktailId}", cocktailId);
        const response = await this.httpGet<GetCocktailDetailsResponse>(uri);
        return response.drinks[0];
    }

    private async httpGet<T>(uri: string): Promise<T> {
        // console.log(`Request - Uri : ${uri}`);
        const options = {uri: uri};
        const response = await request.get(options);
        // console.log(`Response : ${response}`);
        return JSON.parse(response) as T
    }

}
