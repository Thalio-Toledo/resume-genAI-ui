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

@Component({
  selector: 'resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss'],
  imports:[DatePipe],
  providers:[MessageService, ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeTemplateComponent {
  loading = signal<boolean>(true)
  profile = signal<Profile>(null)



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

  name = signal('');
  title = signal('');
  summary = signal('');
  experience = signal<Array<{ company: string; role: string; period: string; description: string }>>([]);
  education = signal<Array<{ institution: string; degree: string; period: string }>>([]);
  projects = signal<Array<{name: string; company: string;description: string;}>>([
  {
    name: 'Societário Digital',
    company: 'Confirp',
    description: 'Sistema de gestão de certidões empresariais.'
  },
  {
    name: 'Workflow',
    company: 'Confirp',
    description: 'Sistema de gerenciamento de tarefas e controle de fluxos.'
  },
  {
    name: 'Storm ORM',
    company: 'Pessoal',
    description: 'Sistema de mapeamento objeto-relacional e consultas SQL.'
  }
]); 
  skills = signal<string[]>([]);
  socialMedia = signal<Array<{name: string; url: string}>>([{name: 'LinkedIn', url: 'https://www.linkedin.com/in/thalio-toledo-a7825023b/'}]);
  languagens = signal<Array<{name: string; level: string}>>([{name: 'Português', level: 'Nativo'}, {name: 'Inglês', level: 'Avançado'}]);


  setProfile(   
    name:  string,
    title: string,
    summary: string,
    experience: Array<{ company: string; role: string; period: string; description: string }>,
    education: Array<{ institution: string; degree: string; period: string }>,
    skills: string[]
    ){
        this.name.set(name);
        this.title.set(title);
        this.summary.set(summary);

        this.experience.set(experience);
        this.education.set(education);
        this.skills.set(skills);
    }
}
