import {Cocktail} from "../domain/Cocktail";
import {AlcoholType} from "../domain/AlcoholType";
import {CocktailIngredient} from "../domain/CocktailIngredient";
import {CocktailRepository} from "../domain/CocktailRepository";
import {CocktailDbApiClient} from "../infrastructure/CocktailApiClient";
import {CocktailDetailDto, CocktailDto} from "../infrastructure/CocktailApiModels";
import * as _ from "lodash";
import {OzToClConverter} from "../util/OzToClConverter";

export class FetchCocktailsHandler {

    constructor(private cocktailClient: CocktailDbApiClient,
                private cocktailRepository: CocktailRepository,
                private ozToClConverter: OzToClConverter) {
    }

    async fetch(): Promise<void> {

        const ingredients = await this.cocktailClient.getIngredients();
        console.log(`Ingredients : ${ingredients}`);

        for (const ingredient of ingredients) {
            console.log(`Ingredient : ${ingredient}`);
            const cocktailDtos = await this.cocktailClient.filterCocktails(ingredient);
            const cocktails = cocktailDtos.map(it => this.convertFromCocktailDto(it));
            await this.cocktailRepository.save(cocktails);
        }

        const cocktails = await this.cocktailRepository.findAll();

        console.log("Cocktails : " + JSON.stringify(cocktails));
        for (const cocktail of cocktails) {
            const cocktailDetail = await this.cocktailClient.getCocktailDetails(cocktail.id.toString());
            console.log("Cocktail Details : " + JSON.stringify(cocktailDetail));
            const detailedCocktail = this.convertFromCocktailDetailDto(cocktailDetail);
            console.log("Detailed Cocktail : " + JSON.stringify(detailedCocktail));
            await this.cocktailRepository.update(detailedCocktail);
        }
    }

    private convertFromCocktailDto(cocktailDto: CocktailDto): Cocktail {
        return {
            id: Number(cocktailDto.idDrink),
            name: cocktailDto.strDrink,
            category: null,
            alcoholType: null,
            glass: null,
            instructions: null,
            imageUrl: cocktailDto.strDrinkThumb,
            ingredients: null
        };
    }

    private convertFromCocktailDetailDto(cocktailDetailDto: CocktailDetailDto): Cocktail {
        return {
            id: Number(cocktailDetailDto.idDrink),
            name: cocktailDetailDto.strDrink,
            category: cocktailDetailDto.strCategory,
            alcoholType: this.parseAlcoholType(cocktailDetailDto.strAlcoholic),
            glass: cocktailDetailDto.strGlass,
            instructions: cocktailDetailDto.strInstructions,
            imageUrl: cocktailDetailDto.strDrinkThumb,
            ingredients: this.parseCocktailIngredients(cocktailDetailDto)
        };
    }

    private parseAlcoholType(strCategory: string): AlcoholType {
        switch (strCategory) {
            case "Alcoholic" :
                return AlcoholType.ALCOHOLIC;
            case "Non alcoholic" :
                return AlcoholType.NONALCOHOLIC;
            case "Optional alcohol" :
                return AlcoholType.OPTIONAL;
            default:
                return AlcoholType.OPTIONAL;
        }
    }

    private parseCocktailIngredients(cocktailDetailDto: CocktailDetailDto): CocktailIngredient[] {
        return _
            .range(1, 16)
            .map(it =>
                <CocktailIngredient>{
                    name: cocktailDetailDto[`strIngredient${it}`],
                    measure: cocktailDetailDto[`strMeasure${it}`]
                })
            .filter(it => !!it.name && !(/^[\s]*$/.test(it.name)))
            .map(it => <CocktailIngredient>{
                name: it.name.trim(),
                measure: this.ozToClConverter.convert(it.measure.trim())
            })
    }

}
