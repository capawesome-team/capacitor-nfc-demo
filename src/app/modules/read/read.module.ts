import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ReadPage } from './pages';
import { ReadPageRoutingModule } from './read-routing.module';

@NgModule({
  imports: [SharedModule, ReadPageRoutingModule],
  declarations: [ReadPage],
})
export class ReadPageModule {}
