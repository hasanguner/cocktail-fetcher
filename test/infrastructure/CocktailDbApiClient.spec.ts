import * as chai from "chai";
import "mocha";
import {CocktailDbApiClient} from "../../src/infrastructure/CocktailApiClient";

chai.should();

describe("CocktailDbApiClient", async () => {

    const client: CocktailDbApiClient = new CocktailDbApiClient();

    describe("#getIngredients()", () => {

        it("should return all ingredients", async () => {
            const ingredients = await client.getIngredients();
            console.log(`[${ingredients.length}] ingredients found.`);
            ingredients.length.should.have.equal(160);

        });
    });

    const ingredients = ["Gin", "Vodka"];

    ingredients.forEach((ingredient) =>

        describe(`#filterCocktails(${ingredient})`, () => {

            it("should return related cocktails", async () => {
                const cocktails = await client.filterCocktails(ingredient);
                console.log(`Ingredient : ${ingredient} - [${cocktails.length}] cocktails found.`);
                cocktails.should.not.be.empty;
            });
        }));

    const cocktailId = "14588";

    describe(`#getCocktailDetails(${cocktailId})`, async () => {
        const cocktailDetails = await client.getCocktailDetails(cocktailId);
        console.log(`[${cocktailId}] Details : ${JSON.stringify(cocktailDetails)}`);
        cocktailDetails.strDrink.should.be.equal("151 Florida Bushwacker");
        cocktailDetails.strInstructions.should.be.equal("Combine all ingredients. Blend until smooth. Garnish with chocolate shavings if desired.");
        cocktailDetails.strIngredient1.should.be.equal("Malibu rum");

    });

});
