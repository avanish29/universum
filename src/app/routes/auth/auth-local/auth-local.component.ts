import { HttpErrorResponse } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '@core';
import { first } from 'rxjs/operators';
import { LocalAuthService } from './auth-local.service';

export interface AuthenticationResponse {
  authToken: String;
}

@Component({
  selector: 'app-local-auth',
  templateUrl: './auth-local.component.html',
  styleUrls: ['./auth-local.component.css'],
  providers: [LocalAuthService]
})
export class LocalAuthComponent implements OnInit {
  hidePassword: boolean = true;
  localLoginForm: FormGroup;
  loading: boolean = false;
  errorMsg: String = "Incorrect username or password.";

  constructor(private formBuilder: FormBuilder, private router: Router, 
      private menuService: MenuService, private remoteSrv: LocalAuthService, private toastr: ToastrService) {
    this.localLoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
    this.loading = true;
    this.errorMsg = "";
    this.remoteSrv.authenticate(this.localLoginForm.controls.username.value, this.localLoginForm.controls.password.value).pipe(first()).subscribe({
      next: () => {
        this.menuService.loadMenu().then(() => {
          this.router.navigateByUrl('/');
        });
      },
      error: (errorResp: HttpErrorResponse) => {
        this.toastr.error(errorResp.error.message, 'Error');
        this.loading = false;
      }
    });
  }
}