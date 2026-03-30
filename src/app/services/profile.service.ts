import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';
import { RoleDescription } from '../dtos/roleDescription.dto';
import { Resume } from '../dtos/resume.dto';
import { Certification } from '../models/certification.model';
import { Education } from '../models/education.model';
import { Experience } from '../models/experience.model';
import { Language } from '../models/language.model';
import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { SocialMedia } from '../models/socialMedia.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  ping(){
    return this.http.get('http://localhost:8080/ping').subscribe(console.log);
  }

 get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles/')
      .build();

    return this.http.get<Profile[]>(url)

    //return await this._commService.getAll<Profile[]>(url);
  }

  findById(profileId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute(profileId)
      .build();

    return this.http.get<Profile>(url)
  }

  async create(profile: Profile) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles/')
      .build();

    return await this._commService.post<Profile>(url, profile);
  }

 async addCertification(certification: Certification) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-certification')
      .build();

    return await this._commService.post<Profile>(url, certification);
  }

  async addEducation(education: Education) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-education')
      .build();

    return await this._commService.post<Profile>(url, education);
  }

  async addExperience(experience: Experience) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-experience')
      .build();

    return await this._commService.post<Profile>(url, experience);
  }

  async addLanguage(language: Language) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-language')
      .build();

    return await this._commService.post<Profile>(url, language);
  }

  async addProject(project: Project) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-project')
      .build();

    return await this._commService.post<Profile>(url, project);
  }

  async addSkill(skill: Skill) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-skill')
      .build();

    return await this._commService.post<Profile>(url, skill);
  }

  async addSocialMedia(socialMedia: SocialMedia) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('add-social-media')
      .build();

    return await this._commService.post<Profile>(url, socialMedia);
  }

  generate(roleDescription: RoleDescription) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('resume')
      .addRoute('generate')
      .build();

    return this.http.post<Resume>(url, roleDescription);
  }

  async update(profile: Profile) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles/')
      .build();

    return await this._commService.put<Profile>(url, profile);
  }

  async delete(profileId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute(profileId)
      .build();

    return await this._commService.delete(url);
  }

  async updateCertification(certification: Certification) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-certification')
      .build();

    return await this._commService.put<Profile>(url, certification);
  }

  async updateEducation(education: Education) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-education')
      .build();

    return await this._commService.put<Profile>(url, education);
  }

  async updateExperience(experience: Experience) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-experience')
      .build();

    return await this._commService.put<Profile>(url, experience);
  }

  async updateLanguage(language: Language) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-language')
      .build();

    return await this._commService.put<Profile>(url, language);
  }

  async updateProject(project: Project) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-project')
      .build();

    return await this._commService.put<Profile>(url, project);
  }

  async updateSkill(skill: Skill) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-skill')
      .build();

    return await this._commService.put<Profile>(url, skill);
  }

  async updateSocialMedia(socialMedia: SocialMedia) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('update-social-media')
      .build();

    return await this._commService.put<Profile>(url, socialMedia);
  }

  async deleteCertification(certificationId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-certification')
      .addRoute(certificationId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteEducation(educationId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-education')
      .addRoute(educationId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteExperience(experienceId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-experience')
      .addRoute(experienceId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteLanguage(languageId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-language')
      .addRoute(languageId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteProject(projectId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-project')
      .addRoute(projectId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteSkill(skillId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-skill')
      .addRoute(skillId)
      .build();

    return await this._commService.delete(url);
  }

  async deleteSocialMedia(socialMediaId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
      .addRoute('delete-social-media')
      .addRoute(socialMediaId)
      .build();

    return await this._commService.delete(url);
  }
}
