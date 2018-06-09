import {CocktailRepository} from "./CocktailRepository";
import {FileManager} from "./FileManager";
import {Cocktail} from "./Cocktail";
import * as _ from "lodash";

export class CocktailRepositoryImpl implements CocktailRepository {

    private static REPOSITORY_FILE = "repository.json";

    private cocktails = [];

    constructor(private fileManager: FileManager) {
    }

    async save(cocktails: Cocktail[]): Promise<void> {
        const size = this.count();
        this.cocktails = _.uniqBy(this.cocktails.concat(cocktails), "id");
        console.log(`[${this.count() - size}] new cocktails saved.`);
        await this.flushToFile();
    }

    async update(cocktail: Cocktail): Promise<void> {
        const index = _.findIndex(this.cocktails, ['id', cocktail.id]);
        if (index !== -1) {
            console.log(`Cocktail [Id : ${cocktail.id}] updated.`);
            this.cocktails[index] = cocktail;
        }
        await this.flushToFile();
    }

    async findAll(): Promise<Cocktail[]> {
        return this.cocktails;
    }

    count(): number {
        return this.cocktails.length;
    }

    async load() {
        const json = await this.fileManager.read(CocktailRepositoryImpl.REPOSITORY_FILE);
        this.cocktails = JSON.parse(json);
        console.log(`[${this.cocktails.length}] cocktails loaded.`);
    }

    private async flushToFile() {
        //Since no removal has taken place, no locking mechanism is required here.
        const json = JSON.stringify(this.cocktails);
        await this.fileManager.write(CocktailRepositoryImpl.REPOSITORY_FILE, json);
    }

}