import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: WritePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WritePageRoutingModule {}
