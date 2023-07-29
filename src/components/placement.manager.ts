import DiceModel from './dice.model';
import { DiceType } from './dice.type';

export default class PlacementManager {
   public readonly cheatMode = false;

   public markActive(array: DiceModel[], newType: DiceType): void {
      const hasAny = array.some((x) => x.placed);
      if (!hasAny) {
         array.forEach((x, i) => {
            if ((x.type & newType) !== x.type) return;
            const neighrbors = this.getOrthogonalNeighbors(array, i);
            if (neighrbors.some((x) => (x.type & newType) > DiceType.Empty)) return;
            x.active = i < 5 || i >= 15 || i % 5 < 1 || i % 5 >= 4;
         });
         return;
      }
      array.forEach((x, i) => {
         x.active = this.cheatMode;
         if (x.placed) return;
         const neighbors = this.getOrthogonalNeighbors(array, i);
         const diagonal = this.getDiagonalNeighbors(array, i);
         if (neighbors.every((x) => !x.placed) && diagonal.every((x) => !x.placed)) return;
         if ((x.type & newType) !== x.type) return;
         if (neighbors.some((x) => (x.type & newType) > DiceType.Empty)) return;
         x.active = true;
      });
   }

   public getOrthogonalNeighbors(array: DiceModel[], index: number): DiceModel[] {
      const indexes = [];
      if (index - 5 >= 0) indexes.push(index - 5);
      if (index - 1 >= 0 && index % 5 !== 0) indexes.push(index - 1);
      if (index + 1 < array.length && index % 5 !== 4) indexes.push(index + 1);
      if (index + 5 < array.length) indexes.push(index + 5);
      return indexes.map((i) => array[i]);
   }

   public getDiagonalNeighbors(array: DiceModel[], index: number): DiceModel[] {
      const indexes = [];
      if (index - 6 >= 0 && index % 5 !== 0) indexes.push(index - 6);
      if (index - 4 >= 0 && index % 5 !== 4) indexes.push(index - 4);
      if (index + 4 < array.length && index % 5 !== 0) indexes.push(index + 4);
      if (index + 6 < array.length && index % 5 !== 4) indexes.push(index + 6);
      return indexes.map((i) => array[i]);
   }

   public clearActive(array: DiceModel[]): void {
      array.forEach((x) => (x.active = false));
   }
}
