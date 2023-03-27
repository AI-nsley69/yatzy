<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    watch: {
        items: {
            handler: function (newVal, oldVal) {
                console.log(newVal);
                // this.currentRoll = newVal[newVal.length - 1];
            },
        },
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
            return diceNames[index - 1] || 'fa-dice-one';
        },
    },
}
</script>

<template v-for="item in items">
    <i :class="['fas', getDiceNames(item)]" class="text-3xl" ></i>
</template>