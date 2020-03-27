import { ElementOptions, ElementsOptions } from 'ngx-stripe';

/** */
export const ELEMENTS_OPTIONS: ElementsOptions = {
  locale: 'es'
};


/**  */
export const CARD_OPTIONS: ElementOptions = {
  hidePostalCode: false,

  style: {
    base: {
      // iconColor: '#666EE8',
      // color: '#31325F',
      // lineHeight: '40px',
      // fontWeight: 300,
      // fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      // fontSize: '18px',
      // '::placeholder': {
        // color: '#CFD7E0'
      // }
    }
  }
};
