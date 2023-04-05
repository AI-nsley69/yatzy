<script setup>
  import { ref } from 'vue';
  import DiceRow from './components/DiceRow.vue';
  import HistoryPopup from './components/HistoryPopup.vue';
  import InfoPopup from './components/InfoPopup.vue';

  const saveState = (history) => {
    localStorage.setItem('history', JSON.stringify(history));
  };

  const readState = () => {
    const history = JSON.parse(localStorage.getItem('history'));
    if (history) {
      return history;
    }
    return [];
  };

  const appendToHistory = () => {
    history.value = [{
      roll: currentRoll.map((die) => die.value),
      score: totalScore.value,
    }].concat(history.value).slice(0, 10);
    saveState(history.value);
  };

  const history = ref(readState());

  let showHistory = ref(false);
  let showInfo = ref(false);

  const currentRoll = [ref(1), ref(1), ref(1), ref(1), ref(1)];
  const totalScore = ref(5);

  const rollDice = () => {
    if (isPopupActive()) return;

    for (let i = 0; i < currentRoll.length; i++) {
      currentRoll[i].value = Math.floor(Math.random() * 6) + 1;
    }
    totalScore.value = currentRoll.reduce((acc, die) => acc + die.value, 0);

    appendToHistory();
  };

  const reset = () => {
    if (isPopupActive()) return;
    
    totalScore.value = 5;
    currentRoll.forEach((die) => {
      die.value = 1;
    });
    history.value = [];
    saveState(history.value);
  };

  const isPopupActive = () => {
    return showHistory.value || showInfo.value;
  };
</script>

<template>
  <div class="navbar-thingy" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div class="flex flex-col px-8 py-8 justify-center md:w-min md:self-center" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
    <div class="flex flex-col justify-center items-center bg-secondary md:w-64 md:h-48 sm:w-40 sm:h-40 lg:w-96 lg:h-64 rounded-xl p-1 border-4 border-secondary-focus gap-2">
      <div class="lg:text-3xl md:text-2xl sm:text-xl flex flex-row gap-1">
        <h1>Total score: </h1>
        <h1>{{ totalScore }}</h1>
      </div>
      <div class="flex flex-row justify-evenly gap-2 dice-row text-3xl lg:text-4xl">
        <DiceRow :items="currentRoll" />
      </div>
      <button 
        type="input"
        title="Roll Dice"
        @click="rollDice()"
        class="bg-primary text-primary-content rounded-xl sm:h-4 sm:w-12 md:h-6 w-2/5 lg:h-10 lg:w-2/5 md:mt-2 sm:mt-2 p-1 md:text-md sm:text-sm lg:text-xl active:bg-primary-focus shadow-md border-2 border-orange-900 border-opacity-30"
      >
        Roll
      </button>
    </div>

    <div class="info-row flex flex-row justify-evenly items-center bg-secondary-content w-48 h-10 rounded-xl self-center my-4 border-2 border-purple-900 border-opacity-30">
      <button type="button" class="button" title="Information button" @click="showInfo = true"><i class="fa-solid fa-question text-info"></i></button>
      <button type="button" class="button" title="Toggle history popup" @click="showHistory = true"><i class="fa-solid fa-clock-rotate-left text-success"></i></button>
      <button type="button" class="button" title="Clear history rolls" @click="reset"><i class="fa-solid fa-trash text-error"></i></button>
    </div>
  </div>

  <a v-if="isPopupActive()" class="popup-background" @click="showHistory = false; showInfo = false;"></a>

  <HistoryPopup v-if="showHistory" :history="history" @close="showHistory = false" />
  <InfoPopup v-if="showInfo" @close="showInfo = false" />
</template>

<style>
.button {
  @apply active:scale-[0.98] hover:scale-[1.02] hover:contrast-200 active:contrast-50;
}

.popup-background {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer blur-sm;
}
</style>