import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { ChangeStatus } from './auth.actions';
import { filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

// eslint-disable-next-line
export enum AuthStatus {
  AUTH_INIT = 'INIT',
  AUTH_COMPLETE = 'COMPLETE',
  AUTH_VALID = 'VALID',
  AUTH_INVALID = 'INVALID',
  AUTH_NO_ACCESS = 'NO_ACCESS',
  AUTH_NO_REFRESH = 'NO_REFRESH',
  AUTH_REFRESHING = 'REFRESHING',
  AUTH_IN_PROGRESS = 'IN_PROGRESS',
}

interface IAuthState {
  status: AuthStatus;
}

@Injectable({
  providedIn: 'root',
})
@State<IAuthState>({
  name: 'auth',
  defaults: {
    status: AuthStatus.AUTH_INIT,
  },
})
export class AuthState {
  constructor(private store: Store) {}

  @Selector()
  static status(state: IAuthState): string {
    return state.status;
  }

  @Action(ChangeStatus)
  changeStatus(ctx: StateContext<IAuthState>, action: ChangeStatus): void {
    ctx.patchState({
      status: action.status,
    });
  }

  emitAuthComplete(): Observable<string> {
    return this.store
      .select(AuthState.status)
      .pipe(filter((status) => status === AuthStatus.AUTH_COMPLETE));
  }

  emitAuthInvalid(): Observable<string> {
    return this.store
      .select(AuthState.status)
      .pipe(filter((status) => status === AuthStatus.AUTH_INVALID));
  }
}
