class DialogueParser {
    parse(input) {
        if (typeof input !== 'string' && !(input instanceof String)) {
            // Not String - possibly just convert to string
            console.error('Please try again!');
        }

        const strInput = String(input);

        const imHeight = /\d'\s*(\d\d?)?"/;
        const metHeight = /\d{1,3}.?\d{0,4}\s*c?m/;

        const result = {};

        console.log(strInput);

        result.imperialHeight = imHeight.exec(strInput);
        if (result.imperialHeight) {
            // Imperial Height found. 
        }
        result.metricHeight = metHeight.exec(strInput);
        if (result.metricHeight) {
            // Metric Height found. 

        }

        return result;
    }
}

let parser = new DialogueParser;

let test = parser.parse("I am 5\'2\"");

console.log(test);


//export default DialogueParsing;