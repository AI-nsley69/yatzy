import { ref } from 'vue';

export class Player {
    // The constructor takes a prefix for the local storage key
    constructor(prefix) {
        this.prefix = prefix;
        this.currentRoll = [ref(1), ref(1), ref(1), ref(1), ref(1)];
        this.remainingRolls = ref(3);
        this.lockedRoll = ref([]);
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
    canRoll() {
      return this.remainingRolls.value > 0;
    }
    // Roll the dice
    rollDice() {
        if (!this.canRoll()) return;
        for (let i = 0; i < this.currentRoll.length; i++) {
          if (!this.isDieLocked(i)) {
            this.currentRoll[i].value = Math.floor(Math.random() * 6) + 1;
          }
        }
        this.totalScore.value = this.currentRoll.reduce((acc, die) => acc + die.value, 0);
    
        this.remainingRolls.value--;
        if (!this.canRoll()) this.appendToHistory();
      };
    // Reset per round
    reset() {
        this.totalScore.value = 5;
        this.currentRoll.forEach((die) => {
          die.value = 1;
        });
        this.lockedRoll.value = [];
        this.remainingRolls.value = 3;
    };
    // Reset the game and clear the history
    hardReset() {
        this.reset();
        this.history.value = [];
        this.saveState();
    };
    toggleDieLock(index) {
        if (this.isDieLocked(index)) {
          this.unlockDie(index);
        } else {
          this.lockDie(index);
        }
    };
    // Lock a die
    lockDie(index) {
        this.lockedRoll.value.push(index);
    };
    // Unlock a die
    unlockDie(index) {
        this.lockedRoll.value = this.lockedRoll.value.filter((i) => i !== index);
    };
    // Check if a die is locked
    isDieLocked(index) {
        return this.lockedRoll.value.includes(index)
    };
    // Get the score from history
    getScore() {
        return this.history.value.reduce((acc, roll) => acc + roll.score, 0);
    }
}