import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SocialMedia } from '../models/socialMedia.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('socialmedias/')
      .build();

    return await this._commService.getAll<SocialMedia[]>(url);
  }

  async findById(socialMediaId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('socialmedias')
      .addRoute('FindById')
      .addRoute(socialMediaId)
      .build();
    return await this._commService.findById<SocialMedia>(url);
  }

  async create(socialMedia: SocialMedia) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('socialmedias/')
      .build();

    return await this._commService.post<SocialMedia>(url, socialMedia);
  }

  async update(socialMedia: SocialMedia) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('socialmedias/')
      .build();

    return await this._commService.put<SocialMedia>(url, socialMedia);
  }

  async delete(socialMediaId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('socialmedias')
      .addRoute(socialMediaId)
      .build();

    return await this._commService.delete(url);
  }
}
