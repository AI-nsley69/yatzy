<script>
export default {
    props: {
        items: Array,
    },
    methods: {
        getDiceNames(index) {
            const diceNames = [
                'fa-dice-one',
                'fa-dice-two',
                'fa-dice-three',
                'fa-dice-four',
                'fa-dice-five',
                'fa-dice-six',
            ];
            // console.log(index, diceNames[index - 1]);
            return diceNames[index.value - 1] || diceNames[index - 1] || 'fa-dice-one';
        },
    },
}
</script>

<template>
    <div class="flex flex-row justify-evenly gap-2 m-1">
        <i v-for="item in items" :class="['fas', getDiceNames(item)]"></i>
    </div>
</template>