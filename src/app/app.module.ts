import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// THIRDs
import { NgxStripeModule } from 'ngx-stripe';

// APP
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    NgxStripeModule.forRoot('pk_test_NBUWxJozylDIfjJtNPFhEtpR00bS01WTBE')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
