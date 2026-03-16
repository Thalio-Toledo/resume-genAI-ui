import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Skill } from '../../models/skill.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent implements OnInit {
  @Input() skills: Skill[] = [];
  @Output() skillsAdded = new EventEmitter<Skill[]>();
  @Output() skillRemoved = new EventEmitter<Skill>();

  skillForm!: FormGroup;
  skillList: Skill[] = [];
  skillLevels = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
    { label: 'Expert', value: 'Expert' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.skillList = [...this.skills?? []];
  }

  initializeForm() {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['Intermediate', Validators.required],
    });
  }

  addSkill() {
    if (this.skillForm.valid) {
      const newSkill = new Skill(this.skillForm.value);
      this.skillList.push(newSkill);
      this.skillForm.reset({ level: 'Intermediate' });
    }
  }

  removeSkill(skill: Skill) {
    this.skillList.splice(this.skillList.indexOf(skill), 1);
    this.skillRemoved.emit(skill)
  }

  onSubmit() {
    this.skillsAdded.emit(this.skillList);
  }

  onSkip() {
    this.skillsAdded.emit(this.skillList);
  }
}
