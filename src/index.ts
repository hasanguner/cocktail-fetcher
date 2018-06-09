import {CocktailRepositoryImpl} from "./domain/CocktailRepositoryImpl";
import {FetchCocktailsHandler} from "./handler/FetchCocktailsHandler";
import {FileManager} from "./domain/FileManager";
import {CocktailRepository} from "./domain/CocktailRepository";
import {CocktailDbApiClient} from "./infrastructure/CocktailApiClient";
import {OzToClConverter} from "./util/OzToClConverter";
import {FileManagerImpl} from "./infrastructure/FileManagerImpl";

const client: CocktailDbApiClient = new CocktailDbApiClient();
const fileManager: FileManager = new FileManagerImpl();
const cocktailRepository: CocktailRepository = new CocktailRepositoryImpl(fileManager);
const ozToClConverter: OzToClConverter = new OzToClConverter();
const handler = new FetchCocktailsHandler(client, cocktailRepository, ozToClConverter);

handler.fetch()
    .catch(it => console.error(`Operation failed. Error message : ${it.message}`))
    .then(() => console.log("Operation completed. All cocktails have been stored in [repository.json]."));
