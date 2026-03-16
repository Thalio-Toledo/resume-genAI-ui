import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Project } from '../../models/project.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  @Input() projects: Project[] = [];
  @Output() projectsAdded = new EventEmitter<Project[]>();
  @Output() projectRemoved = new EventEmitter<Project>();

  projectForm!: FormGroup;
  projectList: Project[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.projectList = [...this.projects?? []];
  }

  initializeForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', Validators.required],
    });
  }

  addProject() {
    if (this.projectForm.valid) {
      const newProject = new Project(this.projectForm.value);
      this.projectList.push(newProject);
      this.projectForm.reset();
    }
  }

  removeProject(project: Project) {
    this.projectList.splice(this.projectList.indexOf(project), 1);
    this.projectRemoved.emit(project)
  }

  onSubmit() {
    this.projectsAdded.emit(this.projectList);
  }

  onSkip() {
    this.projectsAdded.emit(this.projectList);
  }
}
