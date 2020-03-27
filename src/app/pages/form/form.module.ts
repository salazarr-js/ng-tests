import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { FormComponent } from './form.component';


@NgModule({
  declarations: [ FormComponent ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: FormComponent
    }])
  ]
})
export class FormModule { }
