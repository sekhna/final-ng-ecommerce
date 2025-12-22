import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  login(username: string, password: string) {
    // username: "johnd",
    // password: "m38rmF$"

    return this.http.post("https://fakestoreapi.com/auth/login", {
      username: username,
      password: password
    });
  }
}
