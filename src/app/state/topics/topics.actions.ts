import { TopicsModel } from '../../models/topics/topics.model';

const category = 'TOPICS';

export class ChangeInactiveTopics {
  static readonly type = `[${category}] ChangeInactiveTopics`;
  constructor(public topics: TopicsModel[]) {}
}

export class UpdateActiveTopics {
  static readonly type = `[${category}] UpdateActiveTopics`;
  constructor(public topic: TopicsModel) {}
}

export class UpdateInactiveTopics {
  static readonly type = `[${category}] UpdateInactiveTopics`;
  constructor(public topic: TopicsModel) {}
}
