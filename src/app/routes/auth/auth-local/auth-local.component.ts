import { OnInit, Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '@core';

@Component({
  selector: 'app-local-auth',
  templateUrl: './auth-local.component.html'
})
export class LocalAuthComponent implements OnInit {
  hidePassword : boolean = true;
  localLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private menuService: MenuService) {
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
    this.menuService.loadMenu().then(() => {
      this.router.navigateByUrl('/');
    })
  }
}