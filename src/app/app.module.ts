import { UniversumMissingTranslationHandler } from './core/handler/UniversumMissingTranslationHandler';
import { I18Service } from './core/bootstrap/i18.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: UniversumMissingTranslationHandler },
      loader: { provide: TranslateLoader, useClass: I18Service, deps: [HttpClient] },
    }),
  ],
  providers: [HttpInterceptorProviders, AppInitializerProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
