const readline = require("readline");
const _ = require("underscore");
const HmacGenerator = require("./HmacGenerator.js");
const Rules = require("./Rules.js");
const TableDisplayer = require("./TableDisplayer.js");

class RockPaperScissors {

    constructor() {
        this.tableDisplayer = new TableDisplayer();
        this.hmacGenerator = new HmacGenerator();
        this.rules = new Rules();
        this.rules.setRules(argv);
        this.determineWinner = this.rules.determineWinner;
        this.choices = this.rules.userInput;
        this.displayTable = this.tableDisplayer.displayTable;
        this.computerChoice = { key: "", value: "" };
        this.playerChoice = { key: "", value: "" };
        this.resultsOptions = ["It's a tie!", "Computer wins!", "You win!"];
        this.key = "";
        this.hmac = "";

    }

    checkArguments(argv) {
        argv.length > 1
            ? argv.length % 2 === 1 ? game.play()
            : console.log("Must enter odd number of arguments!")
            : console.log("Must enter more than 1 arguments!");
    }

    assignChoice(choiceIndex, selectedChoice, targetChoice) {
        if (choiceIndex >= 0 && choiceIndex < this.choices.length) {
            targetChoice = { key: choiceIndex, value: selectedChoice };
        }
    }

    createChoice(Choice) {
        return {
            key: parseInt(Choice),
            value: this.choices[parseInt(Choice)],
        };
    }
    generateComputerChoice() {
        this.computerChoice = this.createChoice(
            _.random(1, this.choices.length) - 1
        );
    }
    generateKeyAndHmac() {
        this.key = this.hmacGenerator.generateKey();
        this.hmac = this.hmacGenerator.generateHmac
        (this.key, this.computerChoice.value);
        console.log("HMAC: " + this.hmac);
    }

    logOnNewLines(...args) {
        args.forEach((arg) => console.log(arg));
    }

    createReadline() {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    printInfo() {
        console.log("Available moves:");
        this.choices.forEach((element, index) => {
            console.log(`${index + 1} - ${element}`);
        });
        this.logOnNewLines("0 - exit", "? - help");
    }
     checkForRepeatedParams(arr) {
        return _.some(arr, (element, index) => _.contains(arr.slice(index + 1), element));
    }
    

    async displayTableAndRestart(choices) {
        this.tableDisplayer.displayTable(choices);
    }

    async play() {
        const rl = this.createReadline();

        const askForUserInput = async () => {
            return new Promise((resolve) => {
                this.printInfo();
                rl.question("Enter your move: ", async (answer) => {
                    if (answer === "?") {
                        this.displayTableAndRestart(this.choices);
                        resolve(await askForUserInput());
                    } else if (answer === "0") {
                        process.exit();
                    } else {
                        resolve(answer);
                    }
                });
            });
        };
        

        

        try {

            if (this.checkForRepeatedParams(this.choices)) {
                throw new Error("Do Not Enter Repeated Arguments");
            }
            
            this.generateComputerChoice()
            this.generateKeyAndHmac();

            let userChoice = "";
            await askForUserInput().then((returnedValue) => {
                userChoice = returnedValue;
                rl.close();
            });

            this.playerChoice = this.createChoice(userChoice - 1);

            if (this.playerChoice.value === undefined) {
                throw new Error("invalid move");
            }

            const result =this.resultsOptions[this.determineWinner
                (this.playerChoice.key,this.computerChoice.key,this.choices)];

            this.logOnNewLines(`Your move: ${this.playerChoice.value}`,
            `Computer's move: ${this.computerChoice.value}`,result,"HMAC key: " + this.key);

        } catch (error) {
            this.logOnNewLines(error, "");
            await new Promise((resolve) => {
                const rl = this.createReadline();
                rl.question("type one 1 restart game: ", async (answer) => {
                    rl.close();
                    answer === "1" ? await this.play() : null;
                    resolve();
                });
            });
        }
    }
}

const argv = process.argv.slice(2);
const game = new RockPaperScissors();
game.checkArguments(argv);
