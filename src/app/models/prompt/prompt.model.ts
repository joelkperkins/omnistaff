export class PromptModel {
  id?: number;
  name: string;
  body: string;
  descriptors: number[];

  constructor(input?: any) {
    if (input) {
      this.name = input.name;
      this.body = input.body;
      this.descriptors = input.descriptors;
    }
  }
}
