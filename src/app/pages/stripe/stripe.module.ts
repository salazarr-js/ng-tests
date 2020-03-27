import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { StripeComponent } from './stripe.component';

import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [ StripeComponent ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: StripeComponent
    }])
  ]
})
export class StripeModule { }
