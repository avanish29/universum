import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { LocalStorageService } from '../../shared/services/storage.service';
import { TokenModel, AuthReferrer } from './interface';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private change$ : BehaviorSubject<TokenModel> = new BehaviorSubject<TokenModel>(null);

  /**
   * The referrer of current page
   */
  get referrer() {
    return this._referrer;
  }

  get change() {
    return this.change$.asObservable();
  }

  private _referrer: AuthReferrer = {};

  constructor(private store: LocalStorageService) {
    const data = this.get();
    if(data !== null && Object.keys(data).length !== 0) {
      this.set(data);
    }
  }

  set(data: TokenModel): boolean {
    this.change$.next(data);
    return this.store.set(TOKEN_KEY, data);
  }

  get<T extends TokenModel>(type?: new () => T): T {
    const data = this.store.get(TOKEN_KEY);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this.store.remove(TOKEN_KEY);
    this.set(null);
  }
}
