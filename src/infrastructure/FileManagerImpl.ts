import * as fs from "fs";
import {FileManager} from "../domain/FileManager";

export class FileManagerImpl implements FileManager {

    async write(fileName: string, data: string): Promise<void> {
        fs.writeFileSync(fileName, data, "utf8");
        console.log(`Write Operation - File : [${fileName}].`);
    }

    async read(filename: string): Promise<string> {
        return fs.readFileSync(filename, "utf8");
    }

}
