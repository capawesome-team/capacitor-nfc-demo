import { NgModule } from '@angular/core';
import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FaIconModule {
  constructor(
    private readonly library: FaIconLibrary,
    private readonly faConfig: FaConfig,
  ) {
    library.addIcons(faAnglesDown);
    library.addIcons(faAnglesUp);
    library.addIcons(faGooglePlay);
    library.addIcons(faApple);
    faConfig.fixedWidth = true;
  }
}
