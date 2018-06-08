import * as chai from "chai";
import "mocha";
import {OzToClConverter} from "../../src/util/OzToClConverter";

chai.should();

describe("OzToClConverter", () => {

    const converter = new OzToClConverter();

    const dataSet = [
        {
            oz: "1 oz",
            cl: "3 cl"
        },
        {
            oz: "0.5  oz",
            cl: "1.5 cl"
        },
        {
            oz: "3/5 oz",
            cl: "1.8 cl"
        },
        {
            oz: "1 3/5 oz",
            cl: "4.8 cl"
        },
        {
            oz: "1 3/5 oz white",
            cl: "4.8 cl white"
        }
    ];

    dataSet.forEach(measure =>

        describe(`#converter(${measure.oz})`, () => {

            it("should convert to cl measure", () => {
                const result = converter.convert(measure.oz);
                console.log(`Conversion Result : ${result}`);
                result.should.be.equal(measure.cl);
            });

        }));

});
