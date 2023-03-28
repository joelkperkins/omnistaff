import { TonesModel } from '../../models/tones/tones.model';
import { TonesCategory } from './tones.state';

const category = 'TONES';

export class ResetTones {
  static readonly type = `[${category}] ResetActiveTones`;
}

export class ChangeInactiveTones {
  static readonly type = `[${category}] ChangeInactiveTones`;
  constructor(public tones: TonesModel[]) {}
}

export class ChangeActiveCategory {
  static readonly type = `[${category}] ChangeActiveCategory`;
  constructor(public activeCategory: TonesCategory) {}
}

export class UpdateActiveTones {
  static readonly type = `[${category}] UpdateActiveTones`;
  constructor(public tone: TonesModel) {}
}

export class UpdateInactiveTones {
  static readonly type = `[${category}] UpdateInactiveTones`;
  constructor(public tone: TonesModel) {}
}
