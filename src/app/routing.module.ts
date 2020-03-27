import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/** APP ROUTES */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stripe'
  },
  {
    path: 'stripe',
    loadChildren: () => import('./pages/stripe/stripe.module').then(m => m.StripeModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
