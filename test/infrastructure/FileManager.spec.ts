import * as chai from "chai";
import "mocha";
import {FileManagerImpl} from "../../src/infrastructure/FileManagerImpl";
import {FileManager} from "../../src/domain/FileManager";

chai.should();

describe("FileManager", () => {

    const fileManager: FileManager = new FileManagerImpl();

    const fileName = "sample.json";
    const text = '{"message" : "HI!"}';

    describe("#write()", () => {

        it("should succeed", async () => {
            await fileManager.write(fileName, text);
        });
    });

    describe("#read()", () => {

        it("should succeed", async () => {
            const content = await fileManager.read(fileName);
            console.log(`Content : ${content}`);
            content.should.be.equal(text);
        });
    });

});
