import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup, FormBuilder,
  Validators, AbstractControl
} from '@angular/forms';

import { AES, enc, lib } from 'crypto-js';

import { Card } from 'src/app/models/card';
import { Encryption } from 'src/app/helpers/Encryption';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  /** */
  stripeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
  }

  /** */
  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      cardName   : [null, Validators.required],
      cardNumber : [null, Validators.required],
      expMonth   : [null, Validators.required],
      expYear    : [null, Validators.required],
      cvcNumber  : [null, Validators.required],
      zipCode    : [null, Validators.required],
    });
  }

  /** */
  get cardName(): AbstractControl { return this.stripeForm.get('cardName'); }
  get cardNumber(): AbstractControl { return this.stripeForm.get('cardNumber'); }
  get expMonth(): AbstractControl { return this.stripeForm.get('expMonth'); }
  get expYear(): AbstractControl { return this.stripeForm.get('expYear'); }
  get cvcNumber(): AbstractControl { return this.stripeForm.get('cvcNumber'); }
  get zipCode(): AbstractControl { return this.stripeForm.get('zipCode'); }


  /** */
  pay(): void {
    const card: Card = this.stripeForm.value;

    const stripeData = new Encryption().encrypt(JSON.stringify(card), 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2M2MDc1ZDlhOTBhZDNiNDNhZTgyYjg0ZjdlNzI1MDVhNjNiOWMyZjljZGFjODI3N2NiOWMxOTU4NzEwM2ZjN2YwMDlhZjZhOGE0YmM1ZjMiLCJpYXQiOjE1ODUyNTA0ODgsIm5iZiI6MTU4NTI1MDQ4OCwiZXhwIjoxNjE2Nzg2NDg4LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.Dk83TxmtOOfzB-WnGOV84D2V4FdqN9Vu_w9EdDpNNwlOBD4kOfRYWO-9dE-Y_kC0ndDu28umJlksVqiMoxZuVUU4yA7R1mozT9MuALuHFwgWAk52_XUpck4rDpArHpin1EDHRZlxc9u9hyebvUnsPzTj5z0esQTTCgNKA6tDFmGh5dl1ByFO9phcVhAYKuFkRQdnsmPUSb78UXdBBuYN6nGC8ud0cOv4JUVTqkT7fJjadIQ1AWVLxK-kLhV-bR6tTrmUzBjexGZWiMapBnj5Ts8FD4NldCu44J5zFOujLYgd5xoWo9Wa01VI5e2FMk2ABFxNIzytUM9Prg48-O0qt2Y4Ihatex-QW6NDvA7O8hiP1cPLatlxjTCZX0zg50TZJ4RRQhI2jc87hWdJ8bC0FAY0nf8pLe8ZATv4B0bY854KJyFShSH3HP5dtsSi9V9vZB8Ju7y6sOwVgiaR4e1_x7bNEkWwNg4LwezjCni2H-KMHMGcT0BMbx3qlYhgwOs9qe-FnR9hlFpMRnzXd-VPdmsFKHig7Ftv5yHNVfaAJZ7bj6sNs9JJK01OhI1GBOG0x-KtUT1JGU1_Uwnwdb4YXdncBx2EWMrAJ5NYsT4o9rQehfLCIz_TwJ-dxhJe-UiQrGy1hvm8O8WmGu2Ux4OE1qA5Htzc1NUlUwpOvwUrkkA');

    this.http.post('http://42d4a934.ngrok.io/api/pago', { stripeData })
    .subscribe(response => {
      console.log('SUCCESS', response);
    }, error => console.error(error));
  }
}

