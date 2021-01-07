import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseDynamicPagesComponent } from './browse/browse-dynamic-pages.component';

const routes: Routes = [
    {path: 'browse', component: BrowseDynamicPagesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DynamicPagesRoutingModule {}