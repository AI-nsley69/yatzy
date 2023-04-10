import { ref } from 'vue';

export class Player {
    // The constructor takes a prefix for the local storage key
    constructor(prefix) {
        this.prefix = prefix;
        this.currentRoll = [ref(1), ref(1), ref(1), ref(1), ref(1)];
        this.totalScore = ref(5);
        this.history = ref(this.readState());
    }
    // Save the history to local storage
    saveState() {
        localStorage.setItem(`${this.prefix}-history`, JSON.stringify(this.history));
      };
    // Read the history from local storage
    readState()  {
        const history = JSON.parse(localStorage.getItem(`${this.prefix}-history`));
        if (history) {
          return history;
        }
        return [];
    };
    // Append the current roll to the history
    appendToHistory() {
        this.history.value = [{
          roll: this.currentRoll.map((die) => die.value),
          score: this.totalScore.value,
        }].concat(this.history.value).slice(0, 10);
        this.saveState(this.history.value);
    };
    // Roll the dice
    rollDice() {
        for (let i = 0; i < this.currentRoll.length; i++) {
          this.currentRoll[i].value = Math.floor(Math.random() * 6) + 1;
        }
        this.totalScore.value = this.currentRoll.reduce((acc, die) => acc + die.value, 0);
    
        this.appendToHistory();
      };
    // Reset the game
    reset()  {
        this.totalScore.value = 5;
        this.currentRoll.forEach((die) => {
          die.value = 1;
        });
        this.history.value = [];
        this.saveState();
    };
}