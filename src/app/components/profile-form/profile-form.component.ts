import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.model';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export  class ProfileFormComponent implements OnInit {
  @Input() profile!: Profile;
  @Output() profileSaved = new EventEmitter<Profile>();

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      name: [this.profile?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.profile?.email || '', [Validators.required, Validators.email]],
      phone_number: [this.profile?.phone_number || '', Validators.required],
      birth_date: [new Date(this.profile?.birth_date) || '', Validators.required],
      description: [this.profile?.description || '', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const profile = new Profile({
        ...this.profile,
        ...formValue,
      });
      this.profileSaved.emit(profile);
    }
  }
}
