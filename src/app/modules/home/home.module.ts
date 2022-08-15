import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './pages';

@NgModule({
  imports: [SharedModule, HomePageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
