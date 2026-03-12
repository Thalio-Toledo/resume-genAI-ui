import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Education } from '../../models/education.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
  @Input() educations: Education[] = [];
  @Output() educationsAdded = new EventEmitter<Education[]>();
  @Output() educationRemoved = new EventEmitter<Education>();

  educationForm!: FormGroup;
  educationList: Education[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.educationList = [...this.educations];
  }

  initializeForm() {
    this.educationForm = this.fb.group({
      institution: ['', [Validators.required, Validators.minLength(2)]],
      degree: ['', [Validators.required, Validators.minLength(2)]],
      field: ['', [Validators.required, Validators.minLength(2)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  addEducation() {
    if (this.educationForm.valid) {
      const newEducation = new Education(this.educationForm.value);
      this.educationList.push(newEducation);
      this.educationForm.reset();
    }
  }

  removeEducation(education: Education) {
    this.educationList.splice(this.educationList.indexOf(education), 1);
    this.educationRemoved.emit(education)
  }

  onSubmit() {
    this.educationsAdded.emit(this.educationList);
  }

  onSkip() {
    this.educationsAdded.emit(this.educationList);
  }
}
