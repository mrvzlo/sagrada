<style lang="scss">
@import '@/assets/main.scss';
</style>

<template>
   <div class="main">
      <div class="toolbar">
         <button class="btn-lang" v-on:click="() => toggleLocale()">
            {{ localeName() }}
         </button>
         <button class="btn-exit" v-on:click="() => clear()" v-if="map.dice.length">
            <img alt="exit" src="./assets/exit.svg" />
         </button>
      </div>
      <Grid :map="map.dice" v-if="map.dice.length" @onEnd="() => clear()" />

      <div v-if="!map.dice.length" class="menu">
         <h1>{{ $t('title') }}</h1>
         <h3>{{ $t('choose') }}</h3>
         <button v-on:click="pickRandom(easy)">{{ $t('easy') }}</button>
         <button v-on:click="pickRandom(medium)">{{ $t('medium') }}</button>
         <button v-on:click="pickRandom(hard)">{{ $t('hard') }}</button>

         <hr />
      </div>
   </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import DiceManager from './components/dice.manager';
import Grid from './components/grid.vue';
import LocaleManager from './components/locale.manager';

let map: { dice: number[] } = reactive({ dice: [] });
const localeManager = new LocaleManager();

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

const clear = () => (map.dice = []);
const toggleLocale = () => localeManager.toggleLocale();
const localeName = () => localeManager.nextLocaleNativeName();
</script>
