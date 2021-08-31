import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'load', component: LoadComponent },
  { path: '**', pathMatch: 'full', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
