import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from './security/user/admin-user.component';
import { AdminRoleComponent } from './security/role/admin-role.component';

const routes: Routes = [
    {path: 'users', component: AdminUserComponent},
    {path: 'roles', component: AdminRoleComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}