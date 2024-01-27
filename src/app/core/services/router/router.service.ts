import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private readonly router: Router) {}

  public navigateToReadPage(options?: {
    showLastScannedTag?: boolean;
  }): Promise<boolean> {
    let extras: NavigationExtras = {};
    if (options?.showLastScannedTag) {
      extras.queryParams = { showLastScannedTag: 'true' };
    }
    return this.router.navigate(['read'], extras);
  }

  public navigateToWritePage(): Promise<boolean> {
    return this.router.navigate(['write']);
  }

  public navigateToTransceivePage(): Promise<boolean> {
    return this.router.navigate(['transceive']);
  }

  public openAppStoreInNewTab(): void {
    // TODO: implement
    throw new Error('Not implemented.');
  }

  public openPlayStoreInNewTab(): void {
    window.open(
      'https://play.google.com/store/apps/details?id=dev.robingenz.capacitorjs.nfc.demo',
      '_blank',
    );
  }

  public openLegalPageInNewTab(): void {
    window.open('https://capawesome.io/legal', '_blank');
  }
}
