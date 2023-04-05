<script>
import DiceRow from './DiceRow.vue';

export default {
    setup() {
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
        <div class="wrapper w-3/5 md:w-2/5 lg:w-1/5 blur-none shadow-lg p-4">
            <div class="text-center">
                <h1 class="md:text-2xl sm:text-md font-bold">History</h1>
                <h4>Latest first</h4>
            </div>
            <ul class="list-decimal w-max text-xl">
                <li v-for="(rolls, index) in history" class="flex flex-row justify-evenly items-center align-center border-b-2 rounded-md border-neutral-900 w-full text-center text-3xl gap-1">
                    <h3 class="w-1/6 text-lg">{{ index + 1 }}.</h3>
                    <DiceRow :items="rolls.roll"/>
                    <h3 class="w-1/6 text-lg">{{ rolls.score }}</h3>
                </li>
            </ul>
            <h5 v-if="history.length < 1">No recorded rolls.</h5>
            <button 
                type="button"
                title="Close Popup" 
                @click="$emit('close')"
                class="rounded-lg border-2 border-neutral-700 bg-neutral-200 hover:bg-neutral-400 text-primary-content text-sm p-1 m-1"
            >
                Close
            </button>
        </div>
    </transition>
</template>

<style>
.wrapper {
    @apply fixed flex flex-col justify-start items-center h-fit bg-info rounded-lg p-1 m-2 border-blue-800 border-4 gap-1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.dice {
    @apply text-3xl !important;
}
</style>