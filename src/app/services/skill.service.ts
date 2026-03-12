import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Skill } from '../models/skill.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('skills/')
      .build();

    return await this._commService.getAll<Skill[]>(url);
  }

  async findById(skillId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('skills')
      .addRoute('FindById')
      .addRoute(skillId)
      .build();
    return await this._commService.findById<Skill>(url);
  }

  async create(skill: Skill) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('skills/')
      .build();

    return await this._commService.post<Skill>(url, skill);
  }

  async update(skill: Skill) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('skills/')
      .build();

    return await this._commService.put<Skill>(url, skill);
  }

  async delete(skillId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('skills')
      .addRoute(skillId)
      .build();

    return await this._commService.delete(url);
  }
}
