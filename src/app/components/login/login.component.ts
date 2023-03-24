import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import { ChangeStatus } from '../../state/auth/auth.actions';
import { AuthStatus } from '../../state/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl({ value: null, disabled: false }, []),
    pw: new FormControl({ value: null, disabled: false }, []),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  login(): void {
    this.store.dispatch(new ChangeStatus(AuthStatus.AUTH_COMPLETE));
  }
}
