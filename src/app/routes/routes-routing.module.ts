import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';

import { RegisterComponent } from './auth/register/register.component';
import { LocalAuthComponent } from './auth/auth-local/auth-local.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { title: 'Administration', titleI18n: 'admin' },
      },
      {
        path: 'pages/:pageName',
        loadChildren: () => import('./dynamic-pages/daynamic-pages.module').then(m => m.DynamicPagesModule),
        data: { title: '{pageName}', titleI18n: '{pageName}' },
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LocalAuthComponent,
        data: {  title: 'Login', titleI18n: 'login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'register' },
      },
    ],
  },  
  { path: '**', redirectTo: 'dashboard' }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
