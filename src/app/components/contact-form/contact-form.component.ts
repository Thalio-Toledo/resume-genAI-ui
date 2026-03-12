import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';

import { Contact } from '../../models/contact.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  @Output() contactsAdded = new EventEmitter<Contact[]>();
  @Output() contactsRemoved = new EventEmitter<Contact>();

  contactForm!: FormGroup;
  contactList: Contact[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.contactList = [...this.contacts];
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
    });
  }

  addContact() {
    if (this.contactForm.valid) {
      const newContact = new Contact(this.contactForm.value);
      this.contactList.push(newContact);
      this.contactForm.reset();
    }
  }

  removeContact(contact: Contact) {
    this.contactList.splice(this.contactList.indexOf(contact), 1);
    this.contactsRemoved.emit(contact)
  }

  onSubmit() {
    this.contactsAdded.emit(this.contactList);
  }

  onSkip() {
    this.contactsAdded.emit(this.contactList);
  }
}
