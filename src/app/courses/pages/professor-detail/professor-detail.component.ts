import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

import Swal from 'sweetalert2';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { ProfessorsService } from '../../services/professors.service';
import { ResponseProfessor } from '../../interfaces/response-professor.interface';

@Component({
  selector: 'app-professor-detail',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './professor-detail.component.html',
  styles: ``,
})
export class ProfessorDetailComponent implements OnInit {
  router = inject(Router);
  id = input<string>();
  professorsService = inject(ProfessorsService);
  #fb = inject(FormBuilder);

  isNew = computed(() => {
    return this.id() ? false : true;
  });

  formUtils = FormUtils;
  hasError = signal(false);
  typeError = signal('');
  messageError = signal('');

  ngOnInit(): void {
    if (this.id()) {
      this.professorsService.getProfessor(+this.id()!).subscribe({
        next: (resp) => this.myForm.setValue(resp.data),
        error: (message) =>
          Swal.fire({
            theme: 'dark',
            title: 'Error',
            text: message,
            icon: 'error',
          }),
      });
    }
  }

  get currentForm(): ResponseProfessor {
    return this.myForm.value as ResponseProfessor;
  }

  myForm = this.#fb.group({
    id: [0],
    name: [
      '',
      [Validators.required, Validators.pattern(FormUtils.namePattern)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.pattern(FormUtils.namePattern)],
    ],
  });

  save() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      this.showAlert(3000, 'warning', 'Los datos son incorrectos');
      return;
    }

    if (this.isNew()) {
      this.professorsService.postProfessor(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/professor');
        },
        error: (error) =>
          Swal.fire({
            theme: 'dark',
            title: error.Message,
            text: error.Errors.join(','),
            icon: 'error',
            showConfirmButton: false,
          }),
      });
    } else {
      this.professorsService.patchProfessor(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/professor');
        },
        error: (error) => {
          Swal.fire({
            theme: 'dark',
            title: error.Message,
            text: error.Errors.join(','),
            icon: 'error',
            showConfirmButton: false,
          });
        },
      });
    }
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
