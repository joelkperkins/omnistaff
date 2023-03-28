export class TopicsModel {
  id: number;
  name: string;
  category?: string;

  constructor(input?: any) {
    if (input) {
      this.id = input.id;
      this.name = input.name;
      this.category = input.category;
    }
  }
}
