<script>
import { ref } from 'vue';
import DiceRow from './DiceRow.vue';

export default {
    props: {
        player: Object,
    },
    components: {
        DiceRow
    },
    methods: {
      lockPress(index) {
        this.player.toggleDieLock(index);
      }
    }
}
</script>

<template>
        <div class="flex flex-col justify-center items-center bg-secondary md:w-64 md:h-48 sm:w-40 sm:h-40 lg:w-96 lg:h-64 rounded-xl p-1 border-4 border-secondary-focus gap-2">
      <div class="lg:text-3xl md:text-2xl sm:text-xl flex flex-row gap-1">
        <h1>Total score: </h1>
        <h1>{{ player.totalScore }}</h1>
      </div>
      <div class="flex flex-row justify-evenly gap-2 dice-row text-3xl lg:text-4xl w-3/5">
        <DiceRow :items="player.currentRoll"/>
      </div>
      <div class="flex flex-row justify-evenly dice-row text-lg lg:text-xl w-3/5">
        <div v-for="(roll, index) in player.currentRoll">
          <button @click="lockPress(index); $emit('roll')" class="w-1/5">
            <i class="fa-solid" v-bind:class="player.isDieLocked(index) ? 'fa-lock' : 'fa-lock-open'"></i>
          </button>
        </div>
      </div>
      <button 
        type="input"
        title="Roll Dice"
        @click="player.rollDice(); $emit('roll')"
        class="bg-primary text-primary-content rounded-xl sm:h-4 sm:w-12 md:h-6 w-2/5 lg:h-10 lg:w-2/5 md:mt-2 sm:mt-2 p-1 md:text-md sm:text-sm lg:text-xl active:bg-primary-focus shadow-md border-2 border-orange-900 border-opacity-30"
        v-bind:class="player.canRoll() ? '' : 'locked-button'"
      >
        Roll ({{ player.remainingRolls }})
      </button>
    </div>
</template>
<style>
.locked-button {
  @apply bg-primary-focus cursor-default;
}
</style>