import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('projects/')
      .build();

    return await this._commService.getAll<Project[]>(url);
  }

  async findById(projectId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('projects')
      .addRoute('FindById')
      .addRoute(projectId)
      .build();
    return await this._commService.findById<Project>(url);
  }

  async create(project: Project) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('projects/')
      .build();

    return await this._commService.post<Project>(url, project);
  }

  async update(project: Project) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('projects/')
      .build();

    return await this._commService.put<Project>(url, project);
  }

  async delete(projectId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('projects')
      .addRoute(projectId)
      .build();

    return await this._commService.delete(url);
  }
}
