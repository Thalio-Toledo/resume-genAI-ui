import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Certification } from '../../models/certification.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss'],
})
export class CertificationFormComponent implements OnInit {
  @Input() certifications: Certification[] = [];
  @Output() certificationsAdded = new EventEmitter<Certification[]>();
  @Output() certificationsRemoved = new EventEmitter<Certification>();

  certificationForm!: FormGroup;
  certificationList: Certification[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.certificationList = [...this.certifications?? []];
  }

  initializeForm() {
    this.certificationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      issuer: ['', [Validators.required, Validators.minLength(2)]],
      date_issued: ['', Validators.required],
    });
  }

  addCertification() {
    if (this.certificationForm.valid) {
      const newCertification = new Certification(this.certificationForm.value);
      this.certificationList.push(newCertification);
      this.certificationForm.reset();
    }
  }

  removeCertification(certification: Certification) {
    this.certificationList.splice(this.certificationList.indexOf(certification), 1);
    this.certificationsRemoved.emit(certification)
  }

  onSubmit() {
    this.certificationsAdded.emit(this.certificationList);
  }

  onSkip() {
    this.certificationsAdded.emit(this.certificationList);
  }
}
