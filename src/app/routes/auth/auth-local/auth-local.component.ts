import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-auth',
  templateUrl: './auth-local.component.html'
})
export class LocalAuthComponent implements OnInit {
  localLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.localLoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('ng-matero')]],
      password: ['', [Validators.required, Validators.pattern('ng-matero')]],
    });
  }

  ngOnInit(): void { }

  get username() {
    return this.localLoginForm.get('username');
  }

  get password() {
    return this.localLoginForm.get('password');
  }

  login() {
  }
}