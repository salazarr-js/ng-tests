import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { tap, first } from 'rxjs/operators';

import {
  StripeService, Element as StripeElement,
  CardDataOptions
} from "ngx-stripe";

import { ELEMENTS_OPTIONS, CARD_OPTIONS } from './stripe.constants';


@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  /** FORM WITH */
  public stripeForm: FormGroup;

  /** CARD DATA */
  public card: StripeElement;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}


  ngOnInit() {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    // NOT REQUIRED WITH ELEMENTS COMPONENT
    this.stripeService.elements(ELEMENTS_OPTIONS)
    .pipe(
    ).subscribe(elements => {
      if ( !this.card ) {
        this.card = elements.create('card', CARD_OPTIONS);
        this.card.mount('#card-container');
      }
    });
  }


  /** */
  buy() {
    const cardDataOptions: CardDataOptions = this.stripeForm.value;

    this.stripeService.createToken(this.card, cardDataOptions)
    .subscribe(result => {
      console.log('RESULT', result);
    });
  }
}
