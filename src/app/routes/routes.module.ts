import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { LocalAuthComponent } from './auth/auth-local/auth-local.component';
import { RegisterComponent } from './register/register.component';

const COMPONENTS = [LocalAuthComponent, RegisterComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule {}
