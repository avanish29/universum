import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserComponent } from './security/user/admin-user.component';
import { RoleListComponent } from './security/role/components/role-list.component';
import { RoleDetailComponent } from './security/role/components/role-detail.component';

const routes: Routes = [
    {path: 'roles', component: RoleListComponent},
    {path: 'roles/:roleId', component: RoleDetailComponent},
    {path: 'users', component: AdminUserComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}