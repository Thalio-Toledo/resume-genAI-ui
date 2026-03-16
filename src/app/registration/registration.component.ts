import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { ProfileFormComponent } from '../components/profile-form/profile-form.component';
import { Profile } from '../models/profile.model';
import { Contact } from '../models/contact.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { Skill } from '../models/skill.model';
import { Certification } from '../models/certification.model';
import { Project } from '../models/project.model';
import { Language } from '../models/language.model';
import { SocialMedia } from '../models/socialMedia.model';
import { ButtonModule } from 'primeng/button';
import { ContactFormComponent } from "../components/contact-form/contact-form.component";
import { ExperienceFormComponent } from "../components/experience-form/experience-form.component";
import { EducationFormComponent } from "../components/education-form/education-form.component";
import { SkillFormComponent } from "../components/skill-form/skill-form.component";
import { CertificationFormComponent } from "../components/certification-form/certification-form.component";
import { ProjectFormComponent } from "../components/project-form/project-form.component";
import { LanguageFormComponent } from "../components/language-form/language-form.component";
import { SocialMediaFormComponent } from "../components/social-media-form/social-media-form.component";
import { StepperModule } from 'primeng/stepper';
import { ProfileService } from '../services/profile.service';
import { ContactService } from '../services/contact.service';
import { ExperienceService } from '../services/experience.service';
import { EducationService } from '../services/education.service';
import { SkillService } from '../services/skill.service';
import { CertificationService } from '../services/certification.service';
import { ProjectService } from '../services/project.service';
import { LanguageService } from '../services/language.service';
import { SocialMediaService } from '../services/social-media.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    ProfileFormComponent,
    ContactFormComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    SkillFormComponent,
    CertificationFormComponent,
    ProjectFormComponent,
    LanguageFormComponent,
    SocialMediaFormComponent,
    StepperModule,
    ToastModule,
    ProgressSpinnerModule,
],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService]
})
export class RegistrationComponent implements OnInit {
  currentStep = 0;
  items: MenuItem[] = [];
  loading = signal<boolean>(false);

  profile = signal<Profile>(null);


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
    console.log(id);
    this.initializeSteps();
    //this.loadAllData();
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

  initializeSteps() {
    this.items = [
      {value:1, label: 'Profile' },
      {value:2, label: 'Contacts' },
      {value:3, label: 'Experiences' },
      {value:4, label: 'Education' },
      {value:5, label: 'Certifications' },
      {value:6, label: 'Skills' },
      {value:7, label: 'Projects' },
      {value:8, label: 'Languages' },
      {value:9, label: 'Social Media' },
    ];
  }


  onStepChange(stepIndex: number) {
    this.currentStep = stepIndex;
  }

  // PROFILE CRUD
  async onProfileSaved(profile: Profile) {
    try {
      this.loading.set(true);
      if (profile.profile_id) {
        await this.profileService.update(profile);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil atualizado' });
      } else {
        const savedProfile = await this.profileService.create(profile);
        console.log(savedProfile,'teste')
        this.profile.set(savedProfile);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil criado' });
      }
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar perfil' });
      console.error('Erro ao salvar perfil:', error);
    } finally {
      this.loading.set(false);
    }
  }

  // CONTACTS CRUD
  async onContactsAdded(contacts: Contact[]) {
    try {
      this.loading.set(true);
      for (const contact of contacts) {
        if (contact.contact_id) {
          await this.contactService.update(contact);
        } else {
          contact.profile_id = this.profile().profile_id
          await this.contactService.create(contact);
        }
      }
      this.profile().contacts = contacts;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contatos salvos' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar contatos' });
      console.error('Erro ao salvar contatos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteContact(contact: Contact) {
    try {
      await this.contactService.delete(contact.contact_id);
      this.profile().contacts = this.profile().contacts.filter(c => c.contact_id !== contact.contact_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato removido' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover contato' });
      console.error('Erro ao remover contato:', error);
    }
  }

  // EXPERIENCES CRUD
  async onExperiencesAdded(experiences: Experience[]) {
    try {
      this.loading.set(true);
      for (const experience of experiences) {
        if (experience.experience_id) {
          await this.experienceService.update(experience);
        } else {
          experience.profile_id = this.profile().profile_id
          await this.experienceService.create(experience);
        }
      }
      this.profile().experiences = experiences;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Experiências salvas' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar experiências' });
      console.error('Erro ao salvar experiências:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteExperience(experience: Experience) {
    try {
      await this.experienceService.delete(experience.experience_id);
      this.profile().experiences = this.profile().experiences.filter(e => e.experience_id !== experience.experience_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Experiência removida' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover experiência' });
      console.error('Erro ao remover experiência:', error);
    }
  }

  // EDUCATIONS CRUD
  async onEducationsAdded(educations: Education[]) {
    try {
     this.loading.set(true);
      for (const education of educations) {
        if (education.education_id) {
          await this.educationService.update(education);
        } else {
          education.profile_id = this.profile().profile_id
          await this.educationService.create(education);
        }
      }
      this.profile().educations = educations;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Educações salvas' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar educações' });
      console.error('Erro ao salvar educações:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteEducation(education: Education) {
    try {
      await this.educationService.delete(education.education_id);
      this.profile().educations = this.profile().educations.filter(e => e.education_id !== education.education_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Educação removida' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover educação' });
      console.error('Erro ao remover educação:', error);
    }
  }

  // SKILLS CRUD
  async onSkillsAdded(skills: Skill[]) {
    try {
      this.loading.set(false);
      for (const skill of skills) {
        if (skill.skill_id) {
          await this.skillService.update(skill);
        } else {
          skill.profile_id = this.profile().profile_id
          await this.skillService.create(skill);
        }
      }
      this.profile().skills = skills;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Skills salvos' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar skills' });
      console.error('Erro ao salvar skills:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteSkill(skill: Skill) {
    try {
      await this.skillService.delete(skill.skill_id);
      this.profile().skills = this.profile().skills.filter(s => s.skill_id !== skill.skill_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Skill removido' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover skill' });
      console.error('Erro ao remover skill:', error);
    }
  }

  // CERTIFICATIONS CRUD
  async onCertificationsAdded(certifications: Certification[]) {
    try {
      this.loading.set(true);
      for (const certification of certifications) {
        if (certification.certification_id) {
          await this.certificationService.update(certification);
        } else {
          certification.profile_id = this.profile().profile_id
          await this.certificationService.create(certification);
          certification.profile_id = this.profile().profile_id
        }
      }
      this.profile().certifications = certifications;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Certificações salvas' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar certificações' });
      console.error('Erro ao salvar certificações:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteCertification(certification: Certification) {
    try {
      await this.certificationService.delete(certification.certification_id);
      this.profile().certifications = this.profile().certifications.filter(c => c.certification_id !== certification.certification_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Certificação removida' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover certificação' });
      console.error('Erro ao remover certificação:', error);
    }
  }

  // PROJECTS CRUD
  async onProjectsAdded(projects: Project[]) {
    try {
      this.loading.set(true);
      for (const project of projects) {
        if (project.project_id) {
          await this.projectService.update(project);
        } else {
          project.profile_id
           = this.profile().profile_id
          await this.projectService.create(project);
        }
      }
      this.profile().projects = projects;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projetos salvos' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar projetos' });
      console.error('Erro ao salvar projetos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteProject(project: Project) {
    try {
      await this.projectService.delete(project.project_id);
      this.profile().projects = this.profile().projects.filter(p => p.project_id !== project.project_id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto removido' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover projeto' });
      console.error('Erro ao remover projeto:', error);
    }
  }

  // LANGUAGES CRUD
  async onLanguagesAdded(languages: Language[]) {
    try {
      this.loading.set(true);
      for (const language of languages) {
        if (language.language_id) {
          await this.languageService.update(language);
        } else {
          language.profile_id = this.profile().profile_id
          await this.languageService.create(language);
        }
      }
      this.profile().languages = languages;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Idiomas salvos' });
      this.nextStep();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar idiomas' });
      console.error('Erro ao salvar idiomas:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteLanguage(languageId: string) {
    try {
      await this.languageService.delete(languageId);
      this.profile().languages = this.profile().languages.filter(l => l.language_id !== languageId);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Idioma removido' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover idioma' });
      console.error('Erro ao remover idioma:', error);
    }
  }

  // SOCIAL MEDIAS CRUD
  async onSocialMediasAdded(socialMedias: SocialMedia[]) {
    try {
      this.loading.set(true);
      for (const socialMedia of socialMedias) {
        if (socialMedia.social_media_id) {
          await this.socialMediaService.update(socialMedia);
        } else {
          socialMedia.profile_id = this.profile().profile_id
          await this.socialMediaService.create(socialMedia);
        }
      }
      this.profile().socialMedias = socialMedias;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Redes sociais salvas' });
      this.finishRegistration();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar redes sociais' });
      console.error('Erro ao salvar redes sociais:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteSocialMedia(socialMediaId: string) {
    try {
      await this.socialMediaService.delete(socialMediaId);
      this.profile().socialMedias = this.profile().socialMedias.filter(s => s.social_media_id.toString() !== socialMediaId);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Rede social removida' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao remover rede social' });
      console.error('Erro ao remover rede social:', error);
    }
  }

  nextStep() {
    if (this.currentStep < this.items.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  finishRegistration() {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Sucesso', 
      detail: 'Registro concluído com sucesso!' 
    });
  }

  isLastStep(): boolean {
    return this.currentStep === this.items.length - 1;
  }
}
