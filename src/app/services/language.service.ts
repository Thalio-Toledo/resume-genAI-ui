import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Language } from '../models/language.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('languages/')
      .build();

    return await this._commService.getAll<Language[]>(url);
  }

  async findById(languageId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('languages')
      .addRoute('FindById')
      .addRoute(languageId)
      .build();
    return await this._commService.findById<Language>(url);
  }

  async create(language: Language) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('languages/')
      .build();

    return await this._commService.post<Language>(url, language);
  }

  async update(language: Language) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('languages/')
      .build();

    return await this._commService.put<Language>(url, language);
  }

  async delete(languageId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('languages')
      .addRoute(languageId)
      .build();

    return await this._commService.delete(url);
  }
}
