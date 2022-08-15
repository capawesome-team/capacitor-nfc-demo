import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  public isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  public isIos(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }

  public isAndroid(): boolean {
    return Capacitor.getPlatform() === 'android';
  }

  public isWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
  }
}
