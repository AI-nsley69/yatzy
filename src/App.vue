<script setup>
  import { ref } from 'vue';
  const totalScore = ref(3);
</script>

<template>
  <div class="navbar-thingy">
      <h1 class="navbar-text">Yatzy</h1>
  </div>
  <div>
    <div class="fixed flex flex-col justify-center items-center bg-secondary top-24 left-24 w-64 h-64 rounded-xl">
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
      <button class="bg-primary text-white rounded-xl w-16 h-10 mt-4">Roll</button>
    </div>
  </div>
</template>