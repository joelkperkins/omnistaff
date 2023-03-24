import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

// state
import { AuthState, AuthStatus } from './state/auth/auth.state';
import { ChangeStatus } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @Select(AuthState.status) status$: Observable<AuthStatus>;

  constructor(private store: Store, private router: Router) {
    // this.store.dispatch(new ChangeStatus(AuthStatus.AUTH_COMPLETE));
  }

  ngOnInit(): void {
    const sub$ = this.status$.subscribe((status) => {
      if (status === AuthStatus.AUTH_COMPLETE) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
