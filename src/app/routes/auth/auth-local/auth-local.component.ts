import { HttpErrorResponse } from '@angular/common/http';
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService, StartupService, SupportedLanguage } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { LocalAuthService } from './auth-local.service';

export interface AuthenticationResponse {
  userName: String;
  firstName: String;
  lastName: String;
  picture: String;
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
  errorMsg: String = "";
  langs : Array<SupportedLanguage>;
  currentLang : string;

  constructor(private formBuilder: FormBuilder, private router: Router, private startupService: StartupService, private translate: TranslateService,
      private menuService: MenuService, private remoteSrv: LocalAuthService) {
        this.currentLang = this.startupService.getCurrentLanguage().code;
        this.langs = this.startupService.getAllLanguages();
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

  isRegistartionEnabled(): boolean {
    return this.startupService.registrationEnabled;
  }

  closeAlert() {
    this.errorMsg = "";
  }

  login() {
    if(this.localLoginForm.valid) {
      this.loading = true;
      this.errorMsg = "";
      this.remoteSrv.authenticate(this.localLoginForm.controls.username.value, this.localLoginForm.controls.password.value).pipe(first()).subscribe({
        next: () => {
          this.menuService.loadMenu().then(() => {
            this.router.navigateByUrl('/');
          });
        },
        error: (errorResp: HttpErrorResponse) => {
          this.errorMsg = errorResp.error.message;
          this.loading = false;
        }
      });
    }
  }

  onLanguageChange(): void {
    this.useLanguage(this.currentLang);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.startupService.setCurrentLanguage(language);
  }
}