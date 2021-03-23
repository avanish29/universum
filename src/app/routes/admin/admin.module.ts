import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RoleDetailComponent } from './security/role/components/role-detail.component';
import { AddRoleDialog } from './security/role/components/role-add-dialog.component';
import { RoleListComponent } from './security/role/components/role-list.component';
import { AdminUserComponent } from './security/user/admin-user.component';
import { RoleDataService } from './security/role/services/role.service';

const COMPONENTS = [AdminUserComponent, RoleListComponent, RoleDetailComponent, AddRoleDialog];
const COMPONENTS_DYNAMIC = [];

@NgModule({
    imports: [SharedModule, AdminRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
    entryComponents: COMPONENTS_DYNAMIC,
    providers: [RoleDataService]
  })
  export class AdminModule {}