import { Injectable, NgZone } from '@angular/core';
import { Nfc, NfcTag, WriteOptions } from '@capawesome-team/capacitor-nfc';
import { Observable, Subject } from 'rxjs';
import { PlatformService } from '../../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class CapacitorNfcService {
  private readonly scannedTagSubject = new Subject<NfcTag>();
  private readonly sessionCanceledSubject = new Subject<void>();
  private readonly sessionErrorSubject = new Subject<string>();

  constructor(
    private readonly ngZone: NgZone,
    private readonly platformService: PlatformService,
  ) {
    Nfc.removeAllListeners().then(() => {
      Nfc.addListener('nfcTagScanned', event => {
        console.log('nfcTagScanned', { event });
        this.ngZone.run(() => {
          this.scannedTagSubject.next(event.nfcTag);
        });
      });
      Nfc.addListener('scanSessionCanceled', () => {
        console.log('scanSessionCanceled');
        this.ngZone.run(() => {
          this.sessionCanceledSubject.next();
        });
      });
      Nfc.addListener('scanSessionError', event => {
        console.log('scanSessionError', { event });
        this.ngZone.run(() => {
          this.sessionErrorSubject.next(event.message);
        });
      });
    });
  }

  public get scannedTag$(): Observable<NfcTag> {
    return this.scannedTagSubject.asObservable();
  }

  public get sessionCanceled$(): Observable<void> {
    return this.sessionCanceledSubject.asObservable();
  }

  public get sessionError$(): Observable<string> {
    return this.sessionErrorSubject.asObservable();
  }

  public async startScanSession(): Promise<void> {
    // this.scannedTagSubject.next({
    //   id: [12, 45, 65, 70],
    //   canMakeReadOnly: true,
    //   isWritable: false,
    //   maxSize: 4096,
    //   ndefMessages: [
    //     {
    //       ndefRecords: [
    //         {
    //           id: [12, 45, 65, 70],
    //           payload: [12, 45, 65, 70],
    //           tnf: TypeNameFormat.MimeMedia,
    //           type: [54],
    //         },
    //       ],
    //     },
    //   ],
    //   techTypes: [NfcTagTechType.NfcA, NfcTagTechType.NfcB],
    //   type: NfcTagType.NfcForumType2,
    // });
    await Nfc.startScanSession({});
  }

  public async stopScanSession(): Promise<void> {
    await Nfc.stopScanSession();
  }

  public async write(options: WriteOptions): Promise<void> {
    await Nfc.write(options);
  }

  public async openSettings(): Promise<void> {
    await Nfc.openSettings();
  }

  public async isSupported(): Promise<boolean> {
    const { isSupported } = await Nfc.isSupported();
    return isSupported;
  }

  public async isEnabled(): Promise<boolean> {
    if (!this.platformService.isAndroid()) {
      return true;
    }
    const { isEnabled } = await Nfc.isEnabled();
    return isEnabled;
  }
}
