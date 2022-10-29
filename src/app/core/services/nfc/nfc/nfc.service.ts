import { Injectable } from '@angular/core';
import {
  NdefMessage,
  NfcTag,
  NfcTagTechType,
} from '@capawesome-team/capacitor-nfc';
import { Observable } from 'rxjs';
import { CapacitorNfcService } from '../../capacitor';
import { PlatformService } from '../../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class NfcService {
  constructor(
    private readonly capacitorNfcService: CapacitorNfcService,
    private readonly platformService: PlatformService,
  ) {}

  public get scannedTag$(): Observable<NfcTag> {
    return this.capacitorNfcService.scannedTag$;
  }

  public async startScanSession(): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    await this.capacitorNfcService.startScanSession();
  }

  public async stopScanSession(): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      return;
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      return;
    }
    await this.capacitorNfcService.stopScanSession();
  }

  public async write(message: NdefMessage): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    await this.capacitorNfcService.write({
      message,
    });
  }

  public async erase(): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    await this.capacitorNfcService.erase();
  }

  public async format(): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    await this.capacitorNfcService.format();
  }

  public async transceive(
    techType: NfcTagTechType,
    data: number[],
  ): Promise<number[]> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    const { response } = await this.capacitorNfcService.transceive({
      techType,
      data,
    });
    return response;
  }

  public isSupported(): Promise<boolean> {
    return this.capacitorNfcService.isSupported();
  }

  public isEnabled(): Promise<boolean> {
    return this.capacitorNfcService.isEnabled();
  }

  private createNotSupportedError(): Error {
    let message = [
      'Your browser does not support NFC on this device.',
      'Please use the native Android or iOS app.',
    ].join(' ');
    const isNativePlatform = this.platformService.isNativePlatform();
    if (isNativePlatform) {
      message = 'Your device does not support NFC.';
    }
    return new Error(message);
  }

  private createNotEnabledError(): Error {
    const message = 'Please enable NFC in your device.';
    return new Error(message);
  }
}
