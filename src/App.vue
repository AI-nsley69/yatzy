<script setup>
  import { ref } from 'vue';
  import HistoryPopup from './components/HistoryPopup.vue';
  import InfoPopup from './components/InfoPopup.vue';
  import DeleteConfirmation from './components/DeleteConfirmation.vue';
  import PlayerMenu from './components/PlayerMenu.vue';
  import { Player } from './player.js';

  const createPlayers = (amount) => {
    const players = [];
    for (let i = 0; i < amount; i++) {
      const id = i + 1;
      players.push(new Player(`p${id}`, `Player ${id}`));
    }

    return players;
  }

  // Setup the players
  const players = createPlayers(2);

  // Save current round to local storage
  const saveState = () => {
    localStorage.setItem('currentRound', currentRound.value);
  }

  const readState = () => {
    const round = localStorage.getItem('currentRound');
    return round ? parseInt(round) : 1;
  }

  const currentRound = ref(readState());
  // Setup popup control
  const Popups = {
    NONE: 0,
    HISTORY: 1,
    INFO: 2,
    DELETE: 3,
  }

  const activePopup = ref(Popups.NONE);

  const isPopupActive = () => {
    return activePopup.value != Popups.NONE;
  };

  const closePopup = () => {
    activePopup.value = Popups.NONE;
  };

  // Setup for rerendering the player menu
  const renderKey = ref(0);

  const forceRerender = () => {
    renderKey.value++;
  };

  // Calls the reset on all players and then triggers a rerender
  const fullReset = () => {
    players.forEach(player => {
      player.hardReset();
    })
    currentRound.value = 1;

    saveState();
    forceRerender();
  }

  const switchRounds = () => {
    if (currentRound.value >= 10) return;
    currentRound.value++;
    players.forEach(player => {
      player.reset();
    })

    saveState();
    forceRerender();
  }

  const onRoll = () => {
    forceRerender();
  }
</script>

<template>
  <div class="navbar-thingy" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div class="flex flex-col px-8 py-8 justify-center self-center" v-bind:class="isPopupActive() ? 'blur-sm' : ''">
    <div class="flex flex-row justify-center rounded-lg bg-neutral-500 border-4 border-neutral-700 mx-auto mb-4 px-4 py-2 text-2xl lg:text-3xl gap-4">
      <h2 class="border-r-2 rounded-sm pr-4">Round {{ currentRound }}</h2>
      <button class="button" @click="switchRounds()"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
    <div class="flex flex-col md:flex-row justify-evenly gap-4">
      <div v-for="player in players" class="flex flex-col gap-1 m-4 lg:m-0 lg:mb-4">
        <h3>{{ player.name }}</h3>
        <PlayerMenu :player="player" :key="renderKey" @roll="onRoll()"/>
      </div>
    </div>
    <div class="info-row flex flex-row justify-evenly items-center bg-secondary-content w-48 h-10 rounded-xl self-center my-4 border-2 border-purple-900 border-opacity-30">
      <button type="button" class="button" title="Information button" @click="activePopup = Popups.INFO"><i class="fa-solid fa-question text-info"></i></button>
      <button type="button" class="button" title="Toggle history popup" @click="activePopup = Popups.HISTORY"><i class="fa-solid fa-clock-rotate-left text-success"></i></button>
      <button type="button" class="button" title="Clear history rolls" @click="activePopup = Popups.DELETE"><i class="fa-solid fa-trash text-error"></i></button>
    </div>
  </div>

  <Transition>
    <a v-if="isPopupActive()" class="popup-background" @click="closePopup()"></a>
  </Transition>

  <Transition name="popup-transition">
    <HistoryPopup v-if="activePopup === Popups.HISTORY" :players="players" @close="closePopup()" />
  </Transition>
  <Transition name="popup-transition">
    <InfoPopup v-if="activePopup === Popups.INFO" @close="closePopup()" />
  </Transition>
  <Transition name="popup-transition">
    <DeleteConfirmation v-if="activePopup === Popups.DELETE" @close="closePopup()" @delete="fullReset()" />
  </Transition>
</template>

<style>
.button {
  @apply active:scale-[0.98] hover:scale-[1.02] hover:contrast-200 active:contrast-50;
}

.popup-background {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer blur-sm;
}


.popup-transition-enter-active, .popup-transition-leave-active {
  transition: opacity 0.2s ease;
}

.popup-transition-enter-from, .popup-transition-leave-to {
  opacity: 0;
}
</style>