import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RoleDetailComponent } from './security/role/components/role-detail.component';
import { AddRoleDialog } from './security/role/components/role-add-dialog.component';
import { RoleListComponent } from './security/role/components/role-list.component';
import { UserListComponent } from './security/user/components/list-user.component';
import { LabelListComponent } from './labels/components/list-label.component';

import { RoleDataService } from './security/role/services/role.service';
import { UserDataService } from './security/user/services/user.service';
import { LabelDataService } from './labels/services/label.service';

const COMPONENTS = [RoleListComponent, RoleDetailComponent, AddRoleDialog, UserListComponent, LabelListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
    imports: [SharedModule, AdminRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
    entryComponents: COMPONENTS_DYNAMIC,
    providers: [RoleDataService, UserDataService, LabelDataService]
  })
  export class AdminModule {}