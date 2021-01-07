import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminRoleComponent } from './security/role/admin-role.component';
import { AdminUserComponent } from './security/user/admin-user.component';

const COMPONENTS = [AdminUserComponent, AdminRoleComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
    imports: [SharedModule, AdminRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
    entryComponents: COMPONENTS_DYNAMIC,
  })
  export class AdminModule {}