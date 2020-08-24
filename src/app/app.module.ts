import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';


import { ToastrModule } from 'ngx-toastr';
import { AppInitializerProviders } from '@core/initializers';
import { HttpInterceptorProviders } from '@core/interceptors'

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,

    ToastrModule.forRoot(),
  ],
  providers: [HttpInterceptorProviders, AppInitializerProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
