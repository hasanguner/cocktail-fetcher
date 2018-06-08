import * as chai from "chai";
import "mocha";
import {FileManager} from "../../src/domain/FileManager";
import {CocktailRepositoryImpl} from "../../src/domain/CocktailRepositoryImpl";
import {CocktailRepository} from "../../src/domain/CocktailRepository";
import {FileManagerImpl} from "../../src/infrastructure/FileManagerImpl";
import {CocktailDbApiClient} from "../../src/infrastructure/CocktailApiClient";
import {FetchCocktailsHandler} from "../../src/handler/FetchCocktailsHandler";
import {OzToClConverter} from "../../src/util/OzToClConverter";

chai.should();

describe("FetchCocktailsHandler", () => {

    const client = new CocktailDbApiClient();
    const fileManager: FileManager = new FileManagerImpl();
    const cocktailRepository: CocktailRepository = new CocktailRepositoryImpl(fileManager);
    const ozToClConverter = new OzToClConverter();
    const handler = new FetchCocktailsHandler(client, cocktailRepository, ozToClConverter);

    describe("#fetch()", () => {

        it("should fetch and store all cocktails", async () => {
            await handler.fetch();
        }).timeout(400000);
    });

});
