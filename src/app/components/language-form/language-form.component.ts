import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Language } from '../../models/language.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-language-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss'],
})
export class LanguageFormComponent implements OnInit {
  @Input() languages: Language[] = [];
  @Output() languagesAdded = new EventEmitter<Language[]>();

  languageForm!: FormGroup;
  languageList: Language[] = [];
  proficiencyLevels = [
    { label: 'Basic', value: 'Basic' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Fluent', value: 'Fluent' },
    { label: 'Native', value: 'Native' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.languageList = [...this.languages];
  }

  initializeForm() {
    this.languageForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['Intermediate', Validators.required],
    });
  }

  addLanguage() {
    if (this.languageForm.valid) {
      const newLanguage = new Language(this.languageForm.value);
      this.languageList.push(newLanguage);
      this.languageForm.reset({ level: 'Intermediate' });
    }
  }

  removeLanguage(index: number) {
    this.languageList.splice(index, 1);
  }

  onSubmit() {
    this.languagesAdded.emit(this.languageList);
  }

  onSkip() {
    this.languagesAdded.emit(this.languageList);
  }
}
