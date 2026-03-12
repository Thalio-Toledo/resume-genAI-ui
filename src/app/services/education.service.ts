import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Education } from '../models/education.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('educations/')
      .build();

    return await this._commService.getAll<Education[]>(url);
  }

  async findById(educationId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('educations')
      .addRoute('FindById')
      .addRoute(educationId)
      .build();
    return await this._commService.findById<Education>(url);
  }

  async create(education: Education) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('educations/')
      .build();

    return await this._commService.post<Education>(url, education);
  }

  async update(education: Education) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('educations/')
      .build();

    return await this._commService.put<Education>(url, education);
  }

  async delete(educationId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('educations')
      .addRoute(educationId)
      .build();

    return await this._commService.delete(url);
  }
}
