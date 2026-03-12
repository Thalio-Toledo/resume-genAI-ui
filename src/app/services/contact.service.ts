import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  async get() {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('contacts/')
      .build();

    return await this._commService.getAll<Contact[]>(url);
  }

  async findById(contactId: string) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('contacts')
      .addRoute('FindById')
      .addRoute(contactId)
      .build();
    return await this._commService.findById<Contact>(url);
  }

  async create(contact: Contact) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('contacts/')
      .build();

    return await this._commService.post<Contact>(url, contact);
  }

  async update(contact: Contact) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('contacts/')
      .build();

    return await this._commService.put<Contact>(url, contact);
  }

  async delete(contactId: number) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('contacts')
      .addRoute(contactId)
      .build();

    return await this._commService.delete(url);
  }
}
