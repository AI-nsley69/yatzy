<script>
import DiceRow from './DiceRow.vue';

export default {
    setup() {  
    },
    props: {
        history: Array,
    },
    components: {
        DiceRow
    }
}
</script>

<template>
    <div class="wrapper">
        <h1 class="text-2xl font-bold">History!</h1>
        <div v-for="rolls in history.value" class="flex flex-row justify-evenly">
            <DiceRow :items="history.value[rolls].roll" />
            <h3>Score: {{ history.value[rolls].score }}</h3>
        </div>
    </div>
</template>

<style>
.wrapper {
    @apply fixed flex flex-col justify-start items-center lg:w-1/5 h-3/5 sm:w-3/5 bg-info rounded-lg p-1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>