import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransceivePage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: TransceivePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransceivePageRoutingModule {}
