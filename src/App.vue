<script setup>
  import { ref } from 'vue';
  const currentRoll = [ref(1), ref(2), ref(3), ref(4), ref(5)];
  let totalScore = ref(15);

  const rollDice = () => {
    totalScore = 0;
    currentRoll.forEach((die) => {
      die.value = Math.floor(Math.random() * 6) + 1;
      totalScore += die.value;
    });

    document.getElementsByName('i').forEach((tag, index) => {
      tag.classList.remove('fa-dice-one', 'fa-dice-two', 'fa-dice-three', 'fa-dice-four', 'fa-dice-five', 'fa-dice-six');
      console.log(getDiceNames(index));
      tag.classList.add(getDiceNames(index));
    })
  };

  const getDiceNames = (idx) => {
    switch (currentRoll[idx].value) {
      case 1:
        return 'fa-dice-one';
      case 2:
        return 'fa-dice-two';
      case 3:
        return 'fa-dice-three';
      case 4:
        return 'fa-dice-four';
      case 5:
        return 'fa-dice-five';
      case 6:
        return 'fa-dice-six';
      default:
        return 'fa-dice-one';
    }
  };
</script>

<template>
  <div class="navbar-thingy">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div class="flex flex-col px-6 py-6">
    <div class="flex flex-col justify-center items-center bg-secondary w-64 h-64 rounded-xl">
      <div class="text-2xl flex flex-row gap-1">
        <h3>Total score: </h3>
        <h3>{{ totalScore }}</h3>
      </div>
      <div class="flex flex-row justify-evenly gap-1 dice-row">
        <i class="fa-solid fa-dice-one"></i>
        <i class="fa-solid fa-dice-two"></i>
        <i class="fa-solid fa-dice-three"></i>
        <i class="fa-solid fa-dice-four"></i>
        <i class="fa-solid fa-dice-five"></i>
      </div>
      <button 
        type="input"
        @click="rollDice()"
        class="bg-primary text-white rounded-xl w-16 h-10 mt-4 hover:bg-primary-focus active:resize"
      >
        Roll
      </button>
    </div>
  </div>
</template>