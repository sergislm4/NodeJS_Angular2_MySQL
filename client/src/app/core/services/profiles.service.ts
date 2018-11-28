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

  get(user_id: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + user_id)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

}