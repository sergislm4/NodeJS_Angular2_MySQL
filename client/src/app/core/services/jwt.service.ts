import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    if(window.localStorage['jwtToken']){
      return window.localStorage['jwtToken'];
    }else{
      return null;
    }
  }

  saveToken(user_id: String) {
    window.localStorage['jwtToken'] = user_id;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
