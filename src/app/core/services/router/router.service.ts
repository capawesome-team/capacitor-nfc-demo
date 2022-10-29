import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private readonly router: Router) {}

  public navigateToReadPage(): Promise<boolean> {
    return this.router.navigate(['read']);
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
