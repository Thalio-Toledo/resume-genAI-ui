import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Certification } from '../models/certification.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('certifications/')
      .build();

    return await this._commService.getAll<Certification[]>(url);
  }

  async findById(certificationId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('certifications')
      .addRoute('FindById')
      .addRoute(certificationId)
      .build();
    return await this._commService.findById<Certification>(url);
  }

  async create(certification: Certification) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('certifications/')
      .build();

    return await this._commService.post<Certification>(url, certification);
  }

  async update(certification: Certification) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('certification/')
      .build();

    return await this._commService.put<Certification>(url, certification);
  }

  async delete(certificationId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('certifications')
      .addRoute(certificationId)
      .build();

    return await this._commService.delete(url);
  }
}
