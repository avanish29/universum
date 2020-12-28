import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class UniversumMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return params.key;
    }
}