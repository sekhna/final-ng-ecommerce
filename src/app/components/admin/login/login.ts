import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    userName: '',
    password: ''
  }

  onSubmit(form: any) {
    console.log('Form Submitted:', this.user, form.value);
  }
}
