import { DescriptionType } from './dashboard.state';

const category = 'DASHBOARD';

export class ChangeActiveDescriptionType {
  static readonly type = `[${category}] ChangeActiveDescriptionType`;
  constructor(public descriptionType: DescriptionType) {}
}
