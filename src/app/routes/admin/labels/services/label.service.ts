import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { LabelModel, LanguageModel } from '../models/label.model';
import { URLUtils } from '../../../../core/utils/url.utils'

const API_BASE_URL : string = environment.api_base_url;
const LANGUAGES = API_BASE_URL + 'api/admin/languages';
const LANGUAGE_BY_CODE = LANGUAGES + '/{langCode}';
const MESSAGES_BY_LANG_CODE = LANGUAGE_BY_CODE + '/messages';
const MESSAGES_BY_KEY = MESSAGES_BY_LANG_CODE + '/{messageKey}';

@Injectable()
export class LabelDataService {
    constructor(private http: HttpClient) {}

    loadLanguagesAndMessages(): Observable<[LanguageModel[], Map<string, string>]> {
        let languagesResponse = this.getAllLanguages();
        let messagesResponse = this.getLabelsForLanguage();
        return forkJoin([languagesResponse, messagesResponse]);
    }

    getAllLanguages(): Observable<LanguageModel[]> {
        return this.http.get<LanguageModel[]>(LANGUAGES);
    }

    deleteLanguage(langCode: string): Observable<void> {
        return this.http.delete<void>(URLUtils.create(LANGUAGE_BY_CODE, {'langCode': langCode}));
    }

    addLanguage(requestBody: LanguageModel): Observable<LanguageModel> {
        return this.http.post<LanguageModel>(LANGUAGES, requestBody);
    }

    updateLanguage(langCode: string, requestBody: LanguageModel): Observable<LanguageModel> {
        return this.http.put<LanguageModel>(URLUtils.create(LANGUAGE_BY_CODE, {'langCode': langCode}), requestBody);
    }

    getLabelsForLanguage(langCode: string = "en_US"): Observable<Map<string, string>> {
        return this.http.get<Map<string, string>>(URLUtils.create(MESSAGES_BY_LANG_CODE, {'langCode': langCode}));
    }

    deleteLabel(language: string = "en_US", labelKey: string): Observable<void> {
        return this.http.delete<void>(URLUtils.create(MESSAGES_BY_KEY, {'langCode': language, 'messageKey': labelKey}));
    }

    addLabel(langCode: string = "en_US", requestBody: LabelModel): Observable<LabelModel> {
        return this.http.post<LabelModel>(URLUtils.create(MESSAGES_BY_LANG_CODE, {'langCode': langCode}), requestBody);
    }

    updateLabel(language: string = "en_US", requestBody: LabelModel) : Observable<LabelModel> {
        return this.http.put<LabelModel>(URLUtils.create(MESSAGES_BY_KEY, {'langCode': language, 'messageKey': requestBody.labelKey}), requestBody);
    }
}