import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  DialogService,
  NfcService,
  PlatformService,
  RouterService,
} from '@app/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, ViewDidEnter, ViewDidLeave {
  public readonly isNativePlatform = this.platformService.isNativePlatform();

  private viewDidLeave = false;

  constructor(
    private readonly routerService: RouterService,
    private readonly platformService: PlatformService,
    private readonly dialogService: DialogService,
    private readonly nfcService: NfcService,
  ) {}

  public ngOnInit(): void {
    this.nfcService.lastScannedTag$.subscribe(() => {
      if (this.viewDidLeave) {
        return;
      }
      void this.routerService.navigateToReadPage({
        showLastScannedTag: true,
      });
    });
  }

  public ionViewDidEnter(): void {
    this.viewDidLeave = false;
  }

  public ionViewDidLeave(): void {
    this.viewDidLeave = true;
  }

  public async navigateToReadPage(): Promise<void> {
    await this.routerService.navigateToReadPage();
  }

  public async navigateToWritePage(): Promise<void> {
    await this.routerService.navigateToWritePage();
  }

  public async navigateToTransceivePage(): Promise<void> {
    const confirmed = await this.showTransceivePageWarning();
    if (!confirmed) {
      return;
    }
    await this.routerService.navigateToTransceivePage();
  }

  public openAppStoreInNewTab(): void {
    this.dialogService.showAlert({
      header: 'Info',
      message: 'Coming soon!',
      buttons: ['OK'],
    });
    // TODO: implement
    // this.routerService.openAppStoreInNewTab();
  }

  public openPlayStoreInNewTab(): void {
    this.dialogService.showAlert({
      header: 'Info',
      message: 'Coming soon!',
      buttons: ['OK'],
    });
    // TODO: implement
    // this.routerService.openPlayStoreInNewTab();
  }

  public openLegalPageInNewTab(): void {
    this.routerService.openLegalPageInNewTab();
  }

  public showTransceivePageWarning(): Promise<boolean> {
    return new Promise(resolve => {
      this.dialogService.showAlert({
        header: 'Warning',
        message: [
          'This function is experimental and can damage your tag forever!',
          'Please use this function only for testing.',
          'WE TAKE NO RESPONSIBILITY AND LIABILITY FOR ANY DAMAGE CAUSED.',
        ].join(' '),
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'I got this!',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
    });
  }
}
