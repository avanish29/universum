import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleListComponent } from './security/role/components/role-list.component';
import { RoleDetailComponent } from './security/role/components/role-detail.component';
import { UserListComponent } from './security/user/components/list-user.component';
import { LabelListComponent } from './labels/components/list-label.component';

const routes: Routes = [
    {path: 'roles', component: RoleListComponent},
    {path: 'roles/:roleId', component: RoleDetailComponent},
    {path: 'users', component: UserListComponent},
    {path: 'labels', component: LabelListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminRoutingModule {}