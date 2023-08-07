class Rules {

    constructor() {
        this.userInput = [];
    }

    determineWinner(playerChoice, computerChoice, choices) {
        const choiceDifference =
            (playerChoice - computerChoice + choices.length) % choices.length;
        return choiceDifference === 0 ? 0
            : choiceDifference <= choices.length / 2 ? 1
            : 2;
    }

    setRules(argv) {
        argv.forEach((argv, i) => {
            this.userInput.push(argv);
        });
    }

}
module.exports = Rules;
