import { UniversumMissingTranslationHandler } from './core/handler/global-missing-translation-handler';
import { I18Service } from './core/bootstrap/i18.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { GlobalErrorHandler } from './core/handler/global-error-handler';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';

import { AppInitializerProviders } from '@core/initializers';
import { HttpInterceptorProviders } from '@core/interceptors'
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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

    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,

    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: UniversumMissingTranslationHandler },
      loader: { provide: TranslateLoader, useClass: I18Service, deps: [HttpClient] },
    }),
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    HttpInterceptorProviders, 
    AppInitializerProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
