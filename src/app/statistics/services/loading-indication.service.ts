import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingIndicationService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this._loadingSubject.asObservable();

  constructor() {}

  public setLoading(value: boolean): void {
    this._loadingSubject.next(value);
  }
}
