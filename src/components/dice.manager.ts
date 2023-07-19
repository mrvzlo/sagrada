import { DiceType } from './dice.type';

export default class DiceManager {
   private colors = [DiceType.Red, DiceType.Blue, DiceType.Orange, DiceType.Green, DiceType.Yellow];
   private values = [DiceType.One, DiceType.Two, DiceType.Three, DiceType.Four, DiceType.Five, DiceType.Six];

   public generateBag = () => {
      const diceBag = [];
      for (let i = 0; i < this.colors.length; i++)
         for (let j = 0; j < 10; j++) {
            const color = this.colors[i];
            const value = this.values[Math.floor(Math.random() * 6)];
            diceBag.push(value | color);
         }
      return this.shuffle(diceBag);
   };

   public shuffleMap = (array: number[]) => {
      const shuffledColors = this.shuffle(this.colors);
      const shuffledValues = this.shuffle(this.values);
      const translator = [];
      for (let i = 0; i < shuffledColors.length; i++) translator[this.colors[i]] = shuffledColors[i];
      for (let i = 0; i < shuffledValues.length; i++) translator[this.values[i]] = shuffledValues[i];
      translator[DiceType.Empty] = DiceType.Empty;

      for (let i = 0; i < array.length; i++) array[i] = translator[array[i]];
      return array;
   };

   private shuffle = (array: number[]) => {
      return array.slice().sort(() => Math.random() - 0.5);
   };
}
