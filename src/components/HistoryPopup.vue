<script>
import DiceRow from './DiceRow.vue';

export default {
    setup() {
    },
    props: {
        players: Array,
    },
    components: {
        DiceRow
    }
}
</script>

<template>
    <transition name="modal">
        <div class="wrapper w-4/5 lg:w-1/2 blur-none shadow-lg p-2">
            <div class="text-center">
                <h1 class="md:text-2xl sm:text-md font-bold">History</h1>
                <h4>Latest first</h4>
            </div>
            <div class="flex flex-col md:flex-row justify-evenly items-center self-center w-full m-1">
                <div v-for="(player, index) in players">
                    <div class="flex flex-row justify-evenly">
                        <h5>{{ player.name }}</h5>
                        <h5>Score: {{ player.getScore() }}</h5>
                    </div>
                    <ul class="list-decimal w-fit text-xl">
                        <li v-for="(rolls, index) in player.history.value" class="flex flex-row justify-evenly items-center align-center rounded-md border-neutral-900 border-b-2 w-full text-center text-3xl gap-1 px-2 my-1">
                            <DiceRow class="w-4/6" :items="rolls.roll"/>
                            <h3 class="w-1/6 text-lg">{{ rolls.score }}</h3>
                        </li>
                    </ul>
                    <h5 v-if="player.history.value.length < 1">No recorded rolls.</h5>
                </div>  
            </div>
            <button 
                type="button"
                title="Close Popup" 
                @click="$emit('close')"
                class="close-button"
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