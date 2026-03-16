import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SocialMedia } from '../../models/socialMedia.model';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-social-media-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.scss'],
})
export class SocialMediaFormComponent implements OnInit {
  @Input() socialMedias: SocialMedia[] = [];
  @Output() socialMediasAdded = new EventEmitter<SocialMedia[]>();
  @Output() socialMediaRemoved = new EventEmitter<SocialMedia>();

  socialMediaForm!: FormGroup;
  socialMediaList: SocialMedia[] = [];
  platforms = [
    { label: 'LinkedIn', value: 'LinkedIn' },
    { label: 'GitHub', value: 'GitHub' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Portfolio', value: 'Portfolio' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.socialMediaList = [...this.socialMedias?? []];
  }

  initializeForm() {
    this.socialMediaForm = this.fb.group({
      platform: ['LinkedIn', Validators.required],
      handle: ['', [Validators.required, Validators.minLength(2)]],
      link: ['', Validators.required],
    });
  }

  addSocialMedia() {
    if (this.socialMediaForm.valid) {
      const newSocialMedia = new SocialMedia(this.socialMediaForm.value);
      this.socialMediaList.push(newSocialMedia);
      this.socialMediaForm.reset({ platform: 'LinkedIn' });
    }
  }

  removeSocialMedia(socialMedia: SocialMedia) {
    this.socialMediaList.splice(this.socialMediaList.indexOf(socialMedia), 1);
    this.socialMediaRemoved.emit(socialMedia)
  }

  onSubmit() {
    this.socialMediasAdded.emit(this.socialMediaList);
  }

  onSkip() {
    this.socialMediasAdded.emit(this.socialMediaList);
  }
}
