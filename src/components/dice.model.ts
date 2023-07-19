import { DiceType } from './dice.type';

export default class DiceModel {
   public active = false;

   constructor(public type = DiceType.Empty, public placed = false) {}
}
