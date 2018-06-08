export class OzToClConverter {

    convert(ozMeasure: string) {
        const match = ozMeasure.match(/^([0-9]+[\s]+)?([0-9.\/]+)\s*([oO][zZ])(.*)$/);
        if (match && match[2] && match[3]) {
            let ozValue = <number>eval(match[2]);
            if (match[1]) {
                ozValue += +match[1]
            }
            const cl = (ozValue * 3).toFixed(1);
            return `${+cl} cl${match[4]}`;
        }
        return ozMeasure;
    }

}