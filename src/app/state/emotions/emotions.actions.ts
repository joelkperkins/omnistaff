import { EmotionsModel } from '../../models/emotions/emotions.model';
import { EmotionsCategory } from './emotions.state';

const category = 'EMOTIONS';

export class ResetEmotions {
  static readonly type = `[${category}] ResetActiveEmotions`;
}

export class ChangeInactiveEmotions {
  static readonly type = `[${category}] ChangeInactiveEmotions`;
  constructor(public emotions: EmotionsModel[]) {}
}

export class ChangeActiveCategory {
  static readonly type = `[${category}] ChangeActiveCategory`;
  constructor(public activeCategory: EmotionsCategory) {}
}

export class UpdateActiveEmotions {
  static readonly type = `[${category}] UpdateActiveEmotions`;
  constructor(public emotion: EmotionsModel) {}
}

export class UpdateInactiveEmotions {
  static readonly type = `[${category}] UpdateInactiveEmotions`;
  constructor(public emotion: EmotionsModel) {}
}
