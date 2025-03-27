import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { Router, RouterLink } from '@angular/router';

import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  typeError = signal('');
  messageError = signal('');

  fb = inject(FormBuilder);
  isPosting = signal(false);
  formUtils = FormUtils;

  registerForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(FormUtils.namePattern),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(FormUtils.namePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
          Validators.pattern(FormUtils.userNamePattern),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(FormUtils.passwordPattern)],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [FormUtils.isFieldMatch('password', 'confirmPassword')],
    }
  );

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      this.showAlert(3000, 'warning', 'Los datos de registro son incorrectos');
      return;
    }

    const { name, lastName, userName, email, password, confirmPassword } =
      this.registerForm.value;

    this.authService
      .registerStudent(
        name!,
        lastName!,
        userName!,
        email!,
        password!,
        confirmPassword!
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);

          if (resp.succeded) {
            this.router.navigateByUrl('auth/login');
          } else {
            this.showAlert(6000, 'error', resp.Message);
          }
        },
      });
  }

  showAlert(time: number, type: string, message: string) {
    this.typeError.set(type);
    this.messageError.set(message);
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, time);
  }
}
