import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';
import { UrlBuilder } from '../../utils/urlBuilder';
import { CommService } from '../core/services/comm.service';
import { RoleDescription } from '../dtos/roleDescription.dto';
import { Resume } from '../dtos/resume.dto';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _commService: CommService
  ) { }

  teste(){
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

  generate(roleDescription: RoleDescription) {
    const url = UrlBuilder.from(this.apiUrl)
      .addRoute('profiles')
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
}
