import { NgModule } from '@angular/core';

import { TransceivePageRoutingModule } from './transceive-routing.module';

import { SharedModule } from '@app/shared';
import { TransceivePage } from './pages';

@NgModule({
  imports: [SharedModule, TransceivePageRoutingModule],
  declarations: [TransceivePage],
})
export class TransceivePageModule {}
