import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(user_id: String) {
    window.localStorage['jwtToken'] = user_id;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
