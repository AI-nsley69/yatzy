import { ref } from 'vue';

export class Player {
    constructor(prefix) {
        this.prefix = prefix;
        this.currentRoll = [ref(1), ref(1), ref(1), ref(1), ref(1)];
        this.totalScore = ref(5);
        this.history = ref(this.readState());
    }

    saveState() {
        localStorage.setItem(`${this.prefix}-history`, JSON.stringify(this.history));
      };
    
    readState()  {
        const history = JSON.parse(localStorage.getItem(`${this.prefix}-history`));
        if (history) {
          return history;
        }
        return [];
    };
    
    appendToHistory() {
        this.history.value = [{
          roll: this.currentRoll.map((die) => die.value),
          score: this.totalScore.value,
        }].concat(this.history.value).slice(0, 10);
        this.saveState(this.history.value);
    };

    rollDice() {
        for (let i = 0; i < this.currentRoll.length; i++) {
          this.currentRoll[i].value = Math.floor(Math.random() * 6) + 1;
        }
        this.totalScore.value = this.currentRoll.reduce((acc, die) => acc + die.value, 0);
    
        this.appendToHistory();
      };

    reset()  {
        this.totalScore.value = 5;
        this.currentRoll.forEach((die) => {
          die.value = 1;
        });
        this.history.value = [];
        this.saveState();
    };
}