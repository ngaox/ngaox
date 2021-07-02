import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'padup',
    loadChildren: () => import('./padup/padup.module').then(m => m.PadupModule)
  },
  { path: '**', redirectTo: 'padup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
