<template>
   <div
      :class="`dice ${dice.placed ? '' : 'empty'} ${dice.active ? 'active' : ''} die-color-${dice.type % DiceType.One} die-value-${Math.floor(
         dice.type / DiceType.One
      )}`"
   ></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { DiceType } from './dice.type';
import Dice from './dice.model';
defineProps<{ dice: Dice }>();
</script>
