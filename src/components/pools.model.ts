import DiceModel from './dice.model';

export default class PoolsModel {
   public: DiceModel[] = [];
   private: DiceModel[] = [];
   central: DiceModel[] = [];
}
