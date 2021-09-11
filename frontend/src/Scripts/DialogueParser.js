class DialogueParser {
    parse(input) {
        if (typeof input !== 'string' && !(input instanceof String)) {
            // Not String - possibly just convert to string
            console.error('Please try again!');
        }

        const strInput = String(input);
        
        const result = {};

        if (strInput === 'Male') {
            result.gender = 'M';
            return result;
        } else if (strInput === 'Female') {
            result.gender = 'F';
            return result;
        }

        const imHeight = /(\d)\s*(?:'|ft|foot|feet)\s*(?:(\d\d?)\s*(?:"|in|inch|inches))?/g;
        let rejexRet = imHeight.exec(strInput);
        if (rejexRet) result.imperialHeight = this.parseImperialHeight(rejexRet);
        
        const metHeight = /(\d{1,3}.?\d{0,4})\s*(c?m)/g;
        rejexRet = metHeight.exec(strInput);
        if (rejexRet) result.metricHeight = this.parseMetricHeight(rejexRet);
        
        const imWeight = /(\d{1,3})\s*(?:lb|lbs|pounds)/g;
        rejexRet = imWeight.exec(strInput);
        if (rejexRet) result.imperialWeight = this.parseImperialWeight(rejexRet);
        
        const metWeight = /(\d{1,6})\s*(kg|kilograms|grams|kg)/g;
        rejexRet = metWeight.exec(strInput);
        if (rejexRet) result.metricWeight = this.parseMetricWeight(rejexRet);
        
        const age = /(\d{1,3})\s*(?:years old|years)/g;
        rejexRet = age.exec(strInput);
        if (rejexRet) result.age = this.parseAge(rejexRet);

        return result;
    }

    parseImperialHeight(rejexRet) {
        // Imperial Height found. 
        const imperialHeight = {
            text: rejexRet[0],
            feet: 0,
            inches: 0
        };

        let feet = parseInt(rejexRet[1]);
        if (!feet) {
            return null;
        } else {
            imperialHeight.feet = feet;
            if (rejexRet[2]) {
                let inches = parseInt(rejexRet[2]);
                if (inches) {
                    imperialHeight.feet += Math.floor(inches / 12);
                    imperialHeight.inches = inches - (Math.floor(inches / 12));
                }
            }
        }

        return imperialHeight;
    }

    parseMetricHeight(rejexRet) {
        // Metric Height found. 
        const metricHeight = {
            text: rejexRet[0],
            cm: 0
        };
        if (rejexRet[2] === 'm') {
            // Metres, convert to cm and send
            const metres = parseFloat(rejexRet[1]);
            if (metres) {
                metricHeight.cm = parseInt(Math.round(metres*100));
            } else {
                return null;
            }
        } else {
            const cm = parseInt(rejexRet[1]);
            if (cm) {
                metricHeight.cm = Math.round(cm);
            } else {
                return null;
            }
        }

        return metricHeight;
    }

    parseImperialWeight(rejexRet) {
        // Imperial Weight found. 
        const imperialWeight = {
            text: rejexRet[0],
            lb: 0
        };
        const lb = parseInt(rejexRet[1]);
        if (lb) {
            imperialWeight.lb = lb;
        } else {
            return null;
        }

        return imperialWeight;
    }

    parseMetricWeight(rejexRet) {
        // Metric Weight found. 
        const metricWeight = {
            text: rejexRet[0],
            kg: 0
        };
        if (rejexRet[2] === 'g' || rejexRet[2] === 'grams') {
            // Grams, convert to kg and send
            const grams = parseFloat(rejexRet[1]);
            if (grams) {
                metricWeight.kg = parseInt(Math.round(grams/1000));
            } else {
                return null;
            }
        } else {
            const kg = parseInt(rejexRet[1]);
            if (kg) {
                metricWeight.kg = Math.round(kg);
            } else {
                return null;
            }
        }

        return metricWeight;
    }

    parseAge(rejexRet) {
        // Age found. 
        const age = {
            text: rejexRet[0],
            years: 0
        };
        const years = parseInt(rejexRet[1]);
        if (years) {
            age.years = years;
        } else {
            return null;
        }

        return age;
    }
}

let parser = new DialogueParser;

let test = parser.parse("I am 5\'2\", also known as 1.3 m. I am also 150 pounds or 6000 grams. I am 10 years old");

console.log(test);


//export default DialogueParsing;