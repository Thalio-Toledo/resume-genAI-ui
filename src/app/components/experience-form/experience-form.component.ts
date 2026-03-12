import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Experience } from '../../models/experience.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss'],
})
export class ExperienceFormComponent implements OnInit {
  @Input() experiences: Experience[] = [];
  @Output() experiencesAdded = new EventEmitter<Experience[]>();
  @Output() experienceRemoved = new EventEmitter<Experience>();

  experienceForm!: FormGroup;
  experienceList: Experience[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    if(this.experiences == null) this.experiences = []
    this.experienceList = [...this.experiences];
  }

  initializeForm() {
    this.experienceForm = this.fb.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      start_date: ['', Validators.required],
      end_date: [''],
      is_current: [false],
    });
  }

  addExperience() {
    if (this.experienceForm.valid) {
      const newExperience = new Experience(this.experienceForm.value);
      this.experienceList.push(newExperience);
      this.experienceForm.reset();
    }
  }

  removeExperience(experience: Experience) {
    this.experienceList.splice(this.experienceList.indexOf(experience), 1);
    this.experienceRemoved.emit(experience)
  }

  onCurrentJobChange(event: any) {
    const endDateControl = this.experienceForm.get('end_date');
    if (event.checked) {
      endDateControl?.clearValidators();
      endDateControl?.disable();
    } else {
      endDateControl?.setValidators(Validators.required);
      endDateControl?.enable();
    }
    endDateControl?.updateValueAndValidity();
  }

  onSubmit() {
    this.experiencesAdded.emit(this.experienceList);
  }

  onSkip() {
    this.experiencesAdded.emit(this.experienceList);
  }
}
