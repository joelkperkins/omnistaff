import { AuthStatus } from './auth.state';

const category = 'AUTH';

export class ChangeStatus {
  static readonly type = `[${category}] ChangeStatus`;
  constructor(public status: AuthStatus) {}
}
