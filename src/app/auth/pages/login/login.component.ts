import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { FormUtils } from '../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  typeError = signal('');
  messageError = signal('');

  fb = inject(FormBuilder);
  isPosting = signal(false);
  formUtils = FormUtils;

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.showAlert(3000, 'warning', 'Los datos de ingreso son incorrectos');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next: (resp) => {
        console.log(resp);

        if (resp.succeded) {
          this.router.navigateByUrl('/');
        } else {
          this.showAlert(6000, 'error', resp.Message);
        }
      },
      error: (resp) => this.showAlert(6000, 'error', resp.Message),
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
