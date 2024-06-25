import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineRenderComponent } from './pages/render/render.component';
import { OnlineDesignComponent } from './pages/design/design.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '',
    component: AppComponent,
  },
  { 
    path: 'render',
    component: OnlineRenderComponent,
  },
  { 
    path: 'design',
    component: OnlineDesignComponent,
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
