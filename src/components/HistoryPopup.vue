<script>
import DiceRow from './DiceRow.vue';

export default {
    setup() {
        console.log(history)
    },
    props: {
        history: Object,
        showHistory: Boolean,
    },
    components: {
        DiceRow
    }
}
</script>

<template>
    <transition name="modal">
        <div class="wrapper">
            <h1 class="text-2xl font-bold">History!</h1>
            <div v-for="rolls of history" class="flex flex-row justify-evenly items-center align-center border-b-2 rounded-md border-neutral-900 w-4/5 text-center">
                <DiceRow :items="rolls.roll" />
                <h3>{{ rolls.score }}</h3>
            </div>
            <button 
                type="button" 
                @click="$emit('close')"
                class="rounded-lg border-2 border-neutral-700 bg-neutral-200 hover:bg-neutral-400 text-primary-content text-sm p-1"
            >
                Close
            </button>
        </div>
    </transition>
</template>

<style>
.wrapper {
    @apply fixed flex flex-col justify-start items-center sm:w-4/5 lg:w-1/5 h-fit bg-info rounded-lg p-1 m-2 border-blue-800 border-4 gap-1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>