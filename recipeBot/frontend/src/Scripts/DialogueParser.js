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

        const imHeight = /(\d)\s*(?:'|ft|foot|feet)\s*(?:(\d\d?)\s*(?:"|in|inch|inches))?/;
        let regexRet = imHeight.exec(strInput);
        if (regexRet) result.imperialHeight = this.parseImperialHeight(regexRet);
        
        const metHeight = /(\d{1,3}.?\d{0,4})\s*(c?m)/;
        regexRet = metHeight.exec(strInput);
        if (regexRet) result.metricHeight = this.parseMetricHeight(regexRet);
        
        const imWeight = /(\d{1,3})\s*(?:lb|lbs|pounds)/;
        regexRet = imWeight.exec(strInput);
        if (regexRet) result.imperialWeight = this.parseImperialWeight(regexRet);
        
        const metWeight = /(\d{1,6})\s*(kg|kilograms|grams|kg)/;
        regexRet = metWeight.exec(strInput);
        if (regexRet) result.metricWeight = this.parseMetricWeight(regexRet);
        
        const age = /(\d{1,3})\s*(?:years old|years)/;
        regexRet = age.exec(strInput);
        if (regexRet) result.age = this.parseAge(regexRet);

        const checkForIngredients = /(with|including|w\/|without|no)\s+([A-Z]+)/ig;
        result.ingredients = this.parseIngredients(checkForIngredients, strInput);

        const checkForIntolerances = /(?:(?:allergic to|intolerant to|free of)\s*([A-Z]+))|(?:([A-Z]+\s*(?:free|-free|allergy|intolerance)))/ig;
        result.intolerances = this.parseIntolerances(checkForIntolerances, strInput);

        const diets = ['Gluten Free', 'Gluten-Free', 'Ketogenic',
                        'Keto', 'Vegetarian', 'Lacto-Vegetarian',
                        'Ovo-Vegetarian', 'Vegan', 'Pescetarian',
                        'Paleo', 'Primal', 'Whole30'];
        const checkForDiets = new RegExp(`(${diets.join('|')})`, 'ig');
        result.diets = this.parseDiets(checkForDiets, strInput);

        return result;
    }

    parseImperialHeight(regexRet) {
        // Imperial Height found. 
        const imperialHeight = {
            text: regexRet[0],
            feet: 0,
            inches: 0
        };

        let feet = parseInt(regexRet[1]);
        if (!feet) {
            return null;
        } else {
            imperialHeight.feet = feet;
            if (regexRet[2]) {
                let inches = parseInt(regexRet[2]);
                if (inches) {
                    imperialHeight.feet += Math.floor(inches / 12);
                    imperialHeight.inches = inches - (Math.floor(inches / 12));
                }
            }
        }

        return imperialHeight;
    }

    parseMetricHeight(regexRet) {
        // Metric Height found. 
        const metricHeight = {
            text: regexRet[0],
            cm: 0
        };
        if (regexRet[2] === 'm') {
            // Metres, convert to cm and send
            const metres = parseFloat(regexRet[1]);
            if (metres) {
                metricHeight.cm = parseInt(Math.round(metres*100));
            } else {
                return null;
            }
        } else {
            const cm = parseInt(regexRet[1]);
            if (cm) {
                metricHeight.cm = Math.round(cm);
            } else {
                return null;
            }
        }

        return metricHeight;
    }

    parseImperialWeight(regexRet) {
        // Imperial Weight found. 
        const imperialWeight = {
            text: regexRet[0],
            lb: 0
        };
        const lb = parseInt(regexRet[1]);
        if (lb) {
            imperialWeight.lb = lb;
        } else {
            return null;
        }

        return imperialWeight;
    }

    parseMetricWeight(regexRet) {
        // Metric Weight found. 
        const metricWeight = {
            text: regexRet[0],
            kg: 0
        };
        if (regexRet[2] === 'g' || regexRet[2] === 'grams') {
            // Grams, convert to kg and send
            const grams = parseFloat(regexRet[1]);
            if (grams) {
                metricWeight.kg = parseInt(Math.round(grams/1000));
            } else {
                return null;
            }
        } else {
            const kg = parseInt(regexRet[1]);
            if (kg) {
                metricWeight.kg = Math.round(kg);
            } else {
                return null;
            }
        }

        return metricWeight;
    }

    parseAge(regexRet) {
        // Age found. 
        const age = {
            text: regexRet[0],
            years: 0
        };
        const years = parseInt(regexRet[1]);
        if (years) {
            age.years = years;
        } else {
            return null;
        }

        return age;
    }

    parseIngredients(regex, input) {
        const ingredients = {
            with: {
                text: [],
                ingredient: []
            },
            without: {
                text: [],
                ingredient: []
            },
        };

        let regexRet = regex.exec(input);
        let qualifier;
        while (regexRet !== null) {
            qualifier = regexRet[1];
            if (qualifier === 'with' || qualifier === 'including' || qualifier === 'w/') {
                ingredients.with.text.push(regexRet[0])
                ingredients.with.ingredient.push(regexRet[2]);
            } else {
                ingredients.without.text.push(regexRet[0])
                ingredients.without.ingredient.push(regexRet[2]);
            }
            regexRet = regex.exec(input);
        }

        return ingredients;
    }

    parseIntolerances(regex, input) {
        const intolerances = {
            text: [],
            intolerance: []
        };

        let regexRet = regex.exec(input);
        while (regexRet !== null) {
            intolerances.text.push(regexRet[0])
            intolerances.intolerance.push(regexRet[1]);
            regexRet = regex.exec(input);
        }

        return intolerances;
    }

    parseDiets(regex, input) {
        const diets = {
            text: [],
            diet: []
        };
        console.log(regex);
        let regexRet = regex.exec(input);
        while (regexRet !== null) {
            console.log(regexRet);
            diets.text.push(regexRet[1])
            if (regexRet[1].toLowerCase() === 'gluten-free') {
                diets.diet.push('gluten free')
            } else if (regexRet[1].toLowerCase() === 'keto') {      
                diets.diet.push('ketogenic');
            } else {
                diets.diet.push(regexRet[1].toLowerCase());
            }
            regexRet = regex.exec(input);
        }

        return diets;
    }
}


export default DialogueParser;