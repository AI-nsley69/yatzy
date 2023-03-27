<script>
export default {
    props: {
        history: Array,
    },
    data() {
        return {
            showHistory: false,
        };
    },
    methods: {
        toggleHistory() {
            this.showHistory = !this.showHistory;
        },
    },
    components: {
        History,
    },
}
</script>

<template>
    <div v-if="showHistory" class="popup">
        <div class="popup-content">
            <h3>Hello there, general kenobi!</h3>
            <button @click="toggleHistory">Close</button>
        </div>
    </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>