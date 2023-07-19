export default class BoardStatus {
   public mode: 'pick' | 'place' = 'pick';

   public actions: {
      mode: 'pick' | 'place';
      public: boolean;
      number: number;
   }[] = [];

   public canPick = (isPublic: boolean) => this.mode === 'pick' && !this.actions.some((x) => x.mode === 'pick' && x.public === isPublic);
}
