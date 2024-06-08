import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '',
    component: AppComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.OnlineComponentDesignPagesModule)
  },
  {
    path: '**',
    redirectTo: 'render'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
