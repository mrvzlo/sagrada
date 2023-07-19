import DiceModel from './dice.model';
import { DiceType } from './dice.type';

export default class PlacementManager {
   public markActive(array: DiceModel[], newType: DiceType) {
      const hasAny = array.some((x) => x.placed);
      if (!hasAny) {
         array.forEach((x, i) => {
            if ((x.type & newType) !== x.type) return;
            const neighrbors = this.getNeighbors(array, i);
            if (neighrbors.some((x) => (x.type & newType) > DiceType.Empty)) return;
            x.active = i < 5 || i >= 15 || i % 5 < 1 || i % 5 >= 4;
         });
         return;
      }
      array.forEach((x, i) => {
         x.active = false;
         if (x.placed) return;
         const neighrbors = this.getNeighbors(array, i);
         if (neighrbors.every((x) => !x.placed)) return;
         if ((x.type & newType) !== x.type) return;
         if (neighrbors.some((x) => (x.type & newType) > DiceType.Empty)) return;
         x.active = true;
      });
   }

   public getNeighbors(array: DiceModel[], index: number) {
      const indexes = [];
      if (index - 5 >= 0) indexes.push(index - 5);
      if (index - 1 >= 0 && index % 5 !== 0) indexes.push(index - 1);
      if (index + 1 < array.length && index % 5 !== 4) indexes.push(index + 1);
      if (index + 5 < array.length) indexes.push(index + 5);
      return indexes.map((i) => array[i]);
   }

   public clearActive(array: DiceModel[]) {
      array.forEach((x) => (x.active = false));
   }
}
