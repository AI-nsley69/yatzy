<script setup>
  import { ref } from 'vue';
  import HistoryPopup from './components/HistoryPopup.vue';
  import InfoPopup from './components/InfoPopup.vue';
  import PlayerMenu from './components/PlayerMenu.vue';
  import { Player } from './player.js';

  const player1 = new Player('p1');
  const player2 = new Player('p2');

  let showHistory = ref(false);
  let showInfo = ref(false);

  const renderKey = ref(0);

  const forceRerender = () => {
    renderKey.value++;
  };

  const isPopupActive = () => {
    return showHistory.value || showInfo.value;
  };

  const resetPlayers = () => {
    player1.reset();
    player2.reset();
  }
</script>

<template>
  <div class="navbar-thingy" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div class="flex flex-col px-8 py-8 justify-center self-center" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
    <div class="flex flex-row justify-evenly gap-4">
      <PlayerMenu :player="player1" :key="renderKey" @roll="forceRerender()"/>
      <PlayerMenu :player="player2" :key="renderKey" @roll="forceRerender()"/>
    </div>
    <div class="info-row flex flex-row justify-evenly items-center bg-secondary-content w-48 h-10 rounded-xl self-center my-4 border-2 border-purple-900 border-opacity-30">
      <button type="button" class="button" title="Information button" @click="showInfo = true"><i class="fa-solid fa-question text-info"></i></button>
      <button type="button" class="button" title="Toggle history popup" @click="showHistory = true"><i class="fa-solid fa-clock-rotate-left text-success"></i></button>
      <button type="button" class="button" title="Clear history rolls" @click="resetPlayers()"><i class="fa-solid fa-trash text-error"></i></button>
    </div>
  </div>

  <a v-if="isPopupActive()" class="popup-background" @click="showHistory = false; showInfo = false;"></a>

  <HistoryPopup v-if="showHistory" :history="player1.history" @close="showHistory = false" />
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