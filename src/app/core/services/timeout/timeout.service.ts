import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeoutService {
  public timeout<T>(callback: () => T, timeoutMs: number): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = callback();
        resolve(result);
      }, timeoutMs);
    });
  }
}
