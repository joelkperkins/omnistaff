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
