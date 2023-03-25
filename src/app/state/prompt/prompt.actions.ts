import { PromptModel } from '../../models/prompt/prompt.model';

const category = 'PROMPT';

export class AddPrompt {
  static readonly type = `[${category}] UpdateInactiveTones`;
  constructor(public prompt: PromptModel) {}
}

export class RemovePrompt {
  static readonly type = `[${category}] RemovePrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangeActivePrompt {
  static readonly type = `[${category}] ChangeActivePrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangeTonePrompt {
  static readonly type = `[${category}] ChangeTonePrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangeEmotionPrompt {
  static readonly type = `[${category}] ChangeEmotionPrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangePersonaPrompt {
  static readonly type = `[${category}] ChangePersonaPrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangeGenrePrompt {
  static readonly type = `[${category}] ChangeGenrePrompt`;
  constructor(public prompt: PromptModel) {}
}

export class ChangeTopicPrompt {
  static readonly type = `[${category}] ChangeTopicPrompt`;
  constructor(public prompt: PromptModel) {}
}
