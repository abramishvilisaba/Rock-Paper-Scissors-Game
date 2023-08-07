const Rules = require("./Rules.js");
const _ = require("underscore");

class TableDisplayer {
    
    constructor() {
        this.rules = new Rules();
        this.userInput = this.rules.userInput;
        this.determineWinner = this.rules.determineWinner;
        this.resultOptions = ["Draw", "Lose", "Win"];
    }

    combineStrings(start, padding, end, char = " ") {
        return start.padEnd(padding, char) + end;
    }

    returnResult(i, j, table) {
        return this.resultOptions[this.determineWinner([i], [j], table)];
    }

    displayTable(table) {

        const maxLength = _.max(table, (str) => str.length).length;
        const spaceAfterWord = maxLength + 5;
        let firstLine = "| PC/User".padEnd(spaceAfterWord, " ") + "|";
        let lineDivider = "", lineDividerSaved = "", results = "";

        for (let i = 0; i < table.length; i++) {
            firstLine += this.combineStrings(" " + table[i],table[i].length + 2,"|");
            results += this.combineStrings("| " + table[i],spaceAfterWord,"|");
            lineDivider += this.combineStrings("+", spaceAfterWord, "+", "-");
            for (let j = 0; j < table.length; j++) {
                results += this.combineStrings(" " + this.returnResult(i, j, table),
                table[j].length + 2,"|");
                lineDivider += "".padEnd(table[j].length + 2, "-") + "+"; }
            results += "\n" + lineDivider + "\n";
            lineDividerSaved = lineDivider;
            lineDivider = "";
        }

        const final = lineDividerSaved +"\n" +firstLine +"\n" +lineDividerSaved +"\n" +results;
        console.log(final);
    }
}
module.exports = TableDisplayer;
