import { ChangeDetectionStrategy, Component, input, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CertificationService } from './services/certification.service';
import { ContactService } from './services/contact.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { LanguageService } from './services/language.service';
import { ProfileService } from './services/profile.service';
import { ProjectService } from './services/project.service';
import { SkillService } from './services/skill.service';
import { SocialMediaService } from './services/social-media.service';
import { Profile } from './models/profile.model';
import { DatePipe } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RoleDescription } from './dtos/roleDescription.dto';
import { Resume } from './dtos/resume.dto';

@Component({
  selector: 'resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss'],
  imports:[DatePipe, ProgressSpinnerModule, FormsModule, FloatLabelModule, ButtonModule],
  providers:[MessageService, ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeTemplateComponent {
  loading = signal<boolean>(true)
  profile = signal<Profile>(null)

  description: string
  resume = signal<Resume>(null)


  constructor(
    private profileService: ProfileService,
    private contactService: ContactService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private skillService: SkillService,
    private certificationService: CertificationService,
    private projectService: ProjectService,
    private languageService: LanguageService,
    private socialMediaService: SocialMediaService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProfileById(Number(id))
  }

  getProfileById(id: number){
    this.loading.set(true);
    this.profileService.findById(id).subscribe({
      next: data=>{
        this.profile.set(data)
        console.log(this.profile())
      },
      // error: err => {
      //     this.error.set('Erro ao carregar profiles');
      // },
      complete: () => {
        this.loading.set(false);
      }
    })
  }

  generateResume(){
    this.loading.set(true);
    this.profileService
    .generate({description: this.description, profile_Id: this.profile().profile_id} as RoleDescription)
    .subscribe({
      next: data=>{
        this.resume.set(data)
        this.profile.set(data.profile)
        console.log(this.profile())
      },
      // error: err => {
      //     this.error.set('Erro ao carregar profiles');
      // },
      complete: () => {
        this.loading.set(false);
      }
    })
  }

}
