export class PersonasModel {
  id: number;
  name: string;
  type: string;
  category?: string;

  constructor(input?: any) {
    if (input) {
      this.id = input.id;
      this.name = input.name;
      this.type = input.type;
      this.category = input.category;
    }
  }
}
