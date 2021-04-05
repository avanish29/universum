import { Injectable } from '@angular/core';
import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

@Injectable()
export class UniversumMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}