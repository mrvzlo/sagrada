<style lang="scss">
@import '@/assets/main.scss';
</style>

<template>
   <div v-if="!map.dice.length" class="menu">
      <h1>Torre di Verto</h1>
      <h3>Choose your difficulty level</h3>
      <button v-on:click="pickRandom(easy)">Easy</button>
      <button v-on:click="pickRandom(medium)">Medium</button>
      <button v-on:click="pickRandom(hard)">Hard</button>

      <hr />
      <button v-on:click="showRules.value = !showRules.value">Show rules</button>
      <div class="rules" v-if="showRules.value">
         <div>In the center you have a board plan with 20 slots</div>
         <div>Each round you pick one dice from the top pool and one from the bottom</div>
         <div>You can cancel your turn before both dice are placed</div>
         <div>Top pool is rolled once and will be unchanged since the game start</div>
         <div>Bottom pool changes every round</div>
         <div>If slot an a board has color, it means you can place only dice with the same color</div>
         <div>If slot an a board has dots, it means you can place only dice with the same amount of dots</div>
         <div>You cant place dice near another dice with the same color or with the same amount of dots</div>
         <div>If you cant place any dice - use lose | If your board is full - you win</div>
      </div>
   </div>
   <Grid v-if="map.dice.length" :map="map.dice" @on-end="clear" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import DiceManager from './components/dice.manager';
import Grid from './components/grid.vue';

let showRules = reactive({ value: false });
let map: { dice: number[] } = reactive({ dice: [] });

const easy = [
   [0, 0, 0, 0, 0, 1, 0, 2, 0, 4, 0, 2, 0, 4, 0, 0, 0, 0, 0, 0],
   [0, 32, 0, 64, 0, 0, 0, 0, 0, 0, 1024, 0, 512, 0, 128, 0, 0, 256, 0, 0],
];

const medium = [
   [0, 256, 0, 1, 1024, 2, 0, 64, 0, 0, 0, 0, 2, 8, 32, 4, 1, 0, 0, 0],
   [32, 64, 0, 0, 0, 1, 2, 256, 32, 0, 0, 1, 2, 1024, 32, 1024, 128, 0, 0, 0],
   [1, 0, 1024, 0, 0, 0, 32, 512, 0, 64, 128, 1, 2, 4, 0, 0, 0, 256, 128, 2],
   [0, 1, 64, 0, 2, 0, 256, 0, 4, 0, 0, 0, 512, 2, 0, 8, 128, 0, 0, 16],
   [16, 8, 0, 0, 32, 1, 0, 512, 0, 256, 128, 0, 2, 0, 1, 64, 0, 0, 8, 16],
   [0, 0, 1, 512, 0, 2, 256, 0, 4, 128, 102, 0, 0, 8, 0, 0, 16, 64, 0, 0],
   [1, 1024, 0, 0, 2, 0, 128, 1, 0, 0, 0, 512, 1024, 64, 0, 0, 256, 0, 32, 16],
   [16, 0, 8, 0, 4, 256, 2, 128, 1, 64, 0, 32, 0, 512, 0, 0, 0, 1024, 0, 0],
   [0, 0, 1, 0, 0, 64, 2, 512, 4, 32, 0, 8, 128, 16, 0, 32, 0, 1024, 0, 256],
];

const hard = [
   [0, 0, 512, 0, 0, 0, 128, 8, 64, 0, 256, 4, 1, 2, 32, 1024, 64, 16, 128, 256],
   [0, 1, 512, 2, 0, 1, 1024, 256, 512, 2, 64, 2, 128, 1, 32, 0, 0, 32, 0, 0],
   [1, 128, 0, 0, 0, 32, 1, 512, 0, 0, 0, 64, 1, 256, 512, 1024, 0, 128, 1, 0],
   [32, 0, 128, 1, 0, 0, 64, 1, 0, 0, 1024, 1, 0, 256, 0, 1, 512, 64, 0, 32],
   [1, 1024, 0, 0, 128, 512, 1, 128, 0, 0, 0, 64, 1, 32, 0, 0, 32, 512, 1, 256],
   [0, 0, 32, 1, 512, 0, 256, 1, 128, 0, 64, 1, 1024, 0, 0, 1, 512, 64, 0, 256],
   [32, 64, 256, 512, 0, 128, 512, 0, 0, 1, 1024, 0, 0, 1, 2, 256, 0, 1, 2, 32],
   [0, 512, 0, 128, 0, 0, 1, 256, 2, 0, 4, 64, 8, 1024, 16, 32, 0, 512, 0, 64],
   [1, 128, 2, 1024, 4, 0, 8, 64, 16, 256, 0, 0, 8, 512, 0, 32, 0, 0, 8, 1024],
];

const pickRandom = (list: number[][]) => pickMap(list[Math.floor(Math.random() * list.length)]);

const pickMap = (newMap: number[]) => (map.dice = new DiceManager().shuffleMap(newMap));

const clear = () => {
   map.dice = [];
};
</script>
