<script setup>
  import { ref } from 'vue';
  const currentRoll = [ref(1), ref(1), ref(1), ref(1), ref(1)];
  const totalScore = ref(5);

  const rollDice = () => {
    currentRoll.forEach((die) => {
      die.value = Math.floor(Math.random() * 6) + 1;
    });
    totalScore.value = currentRoll.reduce((acc, die) => acc + die.value, 0);
  };

  const getDiceNames = (index) => {
    const diceNames = [
      'fa-dice-one',
      'fa-dice-two',
      'fa-dice-three',
      'fa-dice-four',
      'fa-dice-five',
      'fa-dice-six',
    ];
    return diceNames[index - 1] || 'fa-dice-one';
  };
</script>

<template>
  <div class="navbar-thingy">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div class="flex flex-col px-6 py-6">
    <div class="flex flex-col justify-center items-center bg-secondary lg:w-64 lg:h-64 md:w-40 md:h-40 rounded-xl p-1">
      <div class="text-2xl flex flex-row gap-1">
        <h3>Total score: </h3>
        <h3>{{ totalScore }}</h3>
      </div>
      <div class="flex flex-row justify-evenly gap-1 dice-row">
        <template v-for="(die, index) in currentRoll">
          <i :class="['fas', getDiceNames(die.value)]" class="text-5xl" ></i>
        </template>
      </div>
      <button 
        type="input"
        @click="rollDice()"
        class="bg-primary text-white rounded-xl w-16 h-10 mt-4 hover:bg-primary-focus active:simple-shadow"
      >
        Roll
      </button>
    </div>
  </div>
</template>