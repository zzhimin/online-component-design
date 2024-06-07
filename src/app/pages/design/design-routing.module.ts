import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineDesignComponent } from "./design.component";

const routes: Routes = [
  {
    path: 'design',
    component: OnlineDesignComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OnlineDesignRoutingModule { }
