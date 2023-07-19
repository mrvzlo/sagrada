<style lang="scss">
@import '@/assets/main.scss';
</style>

<template>
   <Grid :map="map" />
</template>

<script setup lang="ts">
import DiceManager from './components/dice.manager';
import Grid from './components/grid.vue';

const manager = new DiceManager();
const map = manager.shuffleMap([256, 128, 16, 64, 1024, 32, 2, 1, 4, 256, 0, 64, 8, 128, 0, 0, 0, 512, 0, 0]);
</script>
