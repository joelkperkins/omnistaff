export class PromptModel {
  id?: number;
  name: string;
  body: string;
  descriptors: number[];

  idCounter = 0;
  constructor(input?: any) {
    if (input) {
      this.id = this.idCounter + 1;
      this.name = input.name;
      this.body = input.body;
      this.descriptors = input.descriptors;
    }
  }
}
