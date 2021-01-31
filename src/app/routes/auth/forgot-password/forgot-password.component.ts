import { HttpErrorResponse } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '@core';
import { first } from 'rxjs/operators';
import { ForgotPasswordService } from './forgot-password.service';

export interface AuthenticationResponse {
  authToken: String;
}

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private menuService: MenuService, private remoteSrv: ForgotPasswordService,) {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  get username() {
    return this.forgotPasswordForm.get('username');
  }

  recoverPassword() {
    
  }
}