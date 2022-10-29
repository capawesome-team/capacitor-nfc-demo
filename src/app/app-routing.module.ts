import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'read',
    loadChildren: () =>
      import('./modules/read/read.module').then(m => m.ReadPageModule),
  },
  {
    path: 'write',
    loadChildren: () =>
      import('./modules/write/write.module').then(m => m.WritePageModule),
  },
  {
    path: 'transceive',
    loadChildren: () =>
      import('./modules/transceive/transceive.module').then(
        m => m.TransceivePageModule,
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
