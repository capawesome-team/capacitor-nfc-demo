import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService, PlatformService, RouterService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly isNativePlatform = this.platformService.isNativePlatform();

  constructor(
    private readonly routerService: RouterService,
    private readonly platformService: PlatformService,
    private readonly dialogService: DialogService,
  ) {}

  public async navigateToReadPage(): Promise<void> {
    await this.routerService.navigateToReadPage();
  }

  public async navigateToWritePage(): Promise<void> {
    await this.routerService.navigateToWritePage();
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
}
