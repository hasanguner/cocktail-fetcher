import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";
import {FileManager} from "../../src/domain/FileManager";
import {CocktailRepository} from "../../src/domain/CocktailRepository";
import {CocktailRepositoryImpl} from "../../src/domain/CocktailRepositoryImpl";
import {FileManagerImpl} from "../../src/infrastructure/FileManagerImpl";
import {AlcoholType} from "../../src/domain/AlcoholType";

chai.should();

const cocktails =
    [{
        id: 11046,
        name: "Applecar",
        category: "Ordinary Drink",
        alcoholType: AlcoholType.ALCOHOLIC,
        glass: "Cocktail glass",
        instructions: "Shake all ingredients with ice, strain into a cocktail glass, and serve.",
        imageUrl: "https://www.thecocktaildb.com/images/media/drink/sbffau1504389764.jpg",
        ingredients: [
            {name: "Applejack", measure: "3 cl"},
            {name: "Triple sec", measure: "3 cl"},
            {name: "Lemon juice", measure: "3 cl"}]
    }, {
        id: 17222,
        name: "A1",
        category: "Cocktail",
        alcoholType: AlcoholType.ALCOHOLIC,
        glass: "Cocktail glass",
        instructions: "Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.",
        imageUrl: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
        ingredients: [
            {name: "Gin", measure: "1 3/4 shot"},
            {name: "Grand Marnier", measure: "1 Shot"},
            {name: "Lemon Juice", measure: "1/4 Shot"},
            {name: "Grenadine", measure: "1/8 Shot"}]
    }, {
        id: 13940,
        name: "69 Special",
        category: "Ordinary Drink",
        alcoholType: AlcoholType.ALCOHOLIC,
        glass: "Collins Glass",
        instructions: "Pour 2 oz. gin. Add 4 oz. 7-up. Add Lemon Juice for flavor. If you are weak, top up glass with more 7-Up.",
        imageUrl: "https://www.thecocktaildb.com/images/media/drink/vqyxqx1472669095.jpg",
        ingredients: [
            {name: "Gin", measure: "2 oz dry"},
            {name: "7-Up", measure: "12 cl"},
            {name: "Lemon juice", measure: "2.3 cl"}]
    }];

describe("CocktailRepository", () => {

    const fileManager: FileManager = new FileManagerImpl();
    let fileManagerMock,
        cocktailRepository: CocktailRepository;

    beforeEach(() => {
        fileManagerMock = sinon.mock(fileManager);
        cocktailRepository = new CocktailRepositoryImpl(fileManager);
    });

    describe("#save()", () => {

        it("should save all items", async () => {

            //expect
            fileManagerMock.expects("write").once();

            //when
            await cocktailRepository.save(cocktails);

            //then
            fileManagerMock.verify();
            cocktailRepository.count().should.be.equal(3);

        });
    });

    describe("#findAll()", () => {

        it("should find all items", async () => {
            //given
            await cocktailRepository.save(cocktails);

            //when
            const items = await cocktailRepository.findAll();

            //then
            items.length.should.be.equal(3);

        });
    });

});
