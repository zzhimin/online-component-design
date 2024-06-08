import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineRenderComponent } from "./render.component";

const routes: Routes = [
  {
    path: 'render',
    component: OnlineRenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  OnlineRenderRoutingModule { }
