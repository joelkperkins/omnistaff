import { PersonasModel } from '../../models/personas/personas.model';
import { PersonasCategory } from './personas.state';

const category = 'PERRSONAS';

export class ResetPersonas {
  static readonly type = `[${category}] ResetActivePersonas`;
}

export class ChangeActiveCategory {
  static readonly type = `[${category}] ChangeActiveCategory`;
  constructor(public activeCategory: PersonasCategory) {}
}

export class ChangeInactivePersonas {
  static readonly type = `[${category}] ChangeInactivePersonas`;
  constructor(public personas: PersonasModel[]) {}
}

export class UpdateActivePersonas {
  static readonly type = `[${category}] UpdateActivePersonas`;
  constructor(public persona: PersonasModel) {}
}

export class UpdateInactivePersonas {
  static readonly type = `[${category}] UpdateInactivePersonas`;
  constructor(public persona: PersonasModel) {}
}
