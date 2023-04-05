<script>
    
</script>

<template>
    <div class="wrapper bg-info text-sm w-4/5 md:w-3/5 md:text-lg blur-none shadow-lg p-4 justify-center m-3">
        <h1 class="font-bold">Information</h1>
        <ul class="list-disc text-neutral-content w-fit">
            <li>This is a simple yatzy site, you can roll 5 dices at once and see your 10 latest rolls.</li>
            <li>This site was built through Vue and TailwindCSS using Vite as the building tooling.</li>
            <li>If you wish to check out the source, you can find it <a href="https://github.com/AI-nsley69/yatzy" class="link">here!</a></li>
            <li>If you're interested in my other projects, you can find them on my <a href="https://portfolio.trainsley69.me" class="link">portfolio</a>.</li>
        </ul>
        <button 
                type="button"
                title="Close Popup" 
                @click="$emit('close')"
                class="rounded-lg border-2 border-neutral-700 bg-neutral-200 hover:bg-neutral-400 text-primary-content text-sm p-1 m-1"
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