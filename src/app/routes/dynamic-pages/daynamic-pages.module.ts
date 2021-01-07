import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DynamicPagesRoutingModule } from './daynamic-pages-routing.module';
import { BrowseDynamicPagesComponent } from './browse/browse-dynamic-pages.component';

const COMPONENTS = [BrowseDynamicPagesComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
    imports: [SharedModule, DynamicPagesRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
    entryComponents: COMPONENTS_DYNAMIC,
  })
  export class DynamicPagesModule {}