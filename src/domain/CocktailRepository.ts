import {Cocktail} from "./Cocktail";

export interface CocktailRepository {

    save(cocktails: Cocktail[]): Promise<void>;

    update(cocktail: Cocktail): Promise<void>;

    findAll(): Promise<Cocktail[]>;

    count(): number;
}
