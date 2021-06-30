import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from  '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [ './contact-form.scss' ]
})
export class ContactForm  {
  
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: [''],  
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
      console.log('Your form data : ', this.contactForm.value );
  }
}