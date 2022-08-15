import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import {
  AlertOptions,
  LoadingOptions,
  ModalOptions,
  PopoverOptions,
} from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private readonly alertCtrl: AlertController,
    private readonly modalCtrl: ModalController,
    private readonly loadingCtrl: LoadingController,
    private readonly popoverCtrl: PopoverController,
  ) {}

  public async showAlert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  public async showErrorAlert(
    options?: AlertOptions,
  ): Promise<HTMLIonAlertElement> {
    const defaultOptions: AlertOptions = {
      header: 'Error',
      buttons: ['OK'],
    };
    options = { ...defaultOptions, ...options };
    return this.showAlert(options);
  }

  public async showModal(options: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    return modal;
  }

  public async dismissModal(
    data?: any,
    role?: string,
    id?: string,
  ): Promise<boolean> {
    return this.modalCtrl.dismiss(data, role, id);
  }

  public async showPopover(
    options: PopoverOptions,
  ): Promise<HTMLIonPopoverElement> {
    const popover = await this.popoverCtrl.create(options);
    await popover.present();
    return popover;
  }

  public async showLoading(
    options?: LoadingOptions,
  ): Promise<HTMLIonLoadingElement> {
    const defaultOptions: LoadingOptions = {
      message: 'Please wait...',
    };
    options = { ...defaultOptions, ...options };
    const loading = await this.loadingCtrl.create(options);
    await loading.present();
    return loading;
  }
}
