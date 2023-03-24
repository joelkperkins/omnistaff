export class EmotionsModel {
  id: number;
  name: string;
  type: string;

  constructor(input?: any) {
    if (input) {
      this.id = input.id;
      this.name = input.name;
      this.type = input.type;
    }
  }
}
