import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Experience } from '../models/experience.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('experiences/')
      .build();

    return await this._commService.getAll<Experience[]>(url);
  }

  async findById(experienceId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('experiences')
      .addRoute('FindById')
      .addRoute(experienceId)
      .build();
    return await this._commService.findById<Experience>(url);
  }

  async create(experience: Experience) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('experiences/')
      .build();

    return await this._commService.post<Experience>(url, experience);
  }

  async update(experience: Experience) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('experiences/')
      .build();

    return await this._commService.put<Experience>(url, experience);
  }

  async delete(experienceId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('experiences')
      .addRoute(experienceId)
      .build();

    return await this._commService.delete(url);
  }
}
