<script>
    
</script>

<template>
    <div class="wrapper bg-info text-sm w-4/5 max-w-2xl md:w-3/5 md:text-lg blur-none shadow-lg p-4 justify-center m-3 gap-2 overflow-y-scroll">
        <h1 class="font-bold">Information</h1>
        <ul class="list-disc text-neutral-content w-full border-b-2 rounded-sm p-2">
            <li>This is a simple yatzy site with a 2 player system with 10 rounds</li>
            <li>Each player has 5 dice they can roll</li>
            <li>Every round, each player gets 3 rolls and can lock any number of them</li>
            <li>After every player has exhausted their rolls, they can advance the rounds by pressing the arrow button</li>
            <li>Each round is recorded in the history popup, and after the 10th round you can see who won the game by comparing the scores in the history menu</li>
            <li>You can also reset the entire game by pressing the trashcan icon</li>
        </ul>
        <ul class="list text-neutral-content w-full p-2">
            <li>Built with <i class="fa-brands fa-vuejs"></i></li>
            <li>Source code is available <a href="https://github.com/AI-nsley69/yatzy" class="link">here!</a></li>
            <li>My <a href="https://portfolio.trainsley69.me" class="link">portfolio</a> for anyone curious :)</li>
        </ul>
        <button 
                type="button"
                title="Close Popup" 
                @click="$emit('close')"
                class="close-button popup-button button"
            >
                Close
            </button>
    </div>
</template>

<style>
.wrapper {
    @apply fixed flex flex-col justify-start items-center h-fit bg-info rounded-lg p-1 m-2 border-blue-800 border-4 gap-1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.link {
    @apply underline text-pink-300 hover:scale-[.98] active:scale-[1.02];
}

.list-disc > li {
    @apply w-4/5 ml-4;
}
</style>