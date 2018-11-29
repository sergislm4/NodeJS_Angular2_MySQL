import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Profile> {
    return this.apiService.get('/profile')
      .pipe(map((data: {profile: Profile}) => {
        console.log(data.profile);
        return data.profile;
      }));
  }

}