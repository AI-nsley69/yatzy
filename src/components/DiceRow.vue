<script>
export default {
    data() {
        return this.items;
    },
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
            return diceNames[index - 1] || 'fa-dice-one';
        },
    },
}
</script>

<template>
    <div v-for="item in items">
        <i :class="['fas', getDiceNames(item.value || item)]" class="text-3xl lg:text-4xl" ></i>
    </div>
</template>