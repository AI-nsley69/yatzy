<script>

</script>

<template>
<div class="wrapper w-4/5 lg:w-2/5 text-center">
    <h3>Are you sure you wish to fully reset the game?</h3>
    <h5 class="text-error mb-4">This will reset your entire history, current rolls and rounds played!</h5>
    <div class="flex flex-row justify-evenly w-full">
    <button 
        type="button"
        class="bg-error popup-button border-red-900"
        @click="$emit('delete'); $emit('close')"
        >
    Yes I'm sure
    </button>
    <button
        type="button"
        class="close-button popup-button"
        @click="$emit('close')"
    >
        No, cancel
    </button>
    </div>
</div>
</template>

<style>
.wrapper {
    @apply fixed flex flex-col justify-start items-center h-fit bg-neutral-focus rounded-lg p-4 m-2 border-neutral-800 border-4 gap-1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>