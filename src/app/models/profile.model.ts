
import { MenuItem } from 'primeng/api';
import { BaseModel } from './base.model';
import { Certification } from './certification.model';
import { Contact } from './contact.model';
import { Education } from './education.model';
import { Experience } from './experience.model';
import { Language } from './language.model';
import { Project } from './project.model';
import { Skill } from './skill.model';
import { SocialMedia } from './socialMedia.model';

export class Profile extends BaseModel {
  profile_id!: number;
  name!: string;
  email!: string;
  birth_date!: string;
  phone_number!: string;
  description!: string;

  contacts: Contact[] = [];
  experiences: Experience[] = [];
  educations: Education[] = [];
  skills: Skill[] = [];
  projects: Project[] = [];
  certifications: Certification[] = [];
  socialMedias: SocialMedia[] = [];
  languages: Language[] = [];

  menu: MenuItem[] = []

  constructor(init?: Partial<Profile>) {
    super(init);
    Object.assign(this, init);
  }
}