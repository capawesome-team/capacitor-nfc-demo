import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { PlatformService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private readonly platformService: PlatformService) {}

  public ngOnInit(): void {
    this.setStatusBarStyle();
  }

  private setStatusBarStyle(): void {
    if (this.platformService.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
    }
  }
}
