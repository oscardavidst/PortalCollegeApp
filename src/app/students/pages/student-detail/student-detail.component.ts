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

import { AlertComponent } from '../../../shared/alert/alert.component';
import Swal from 'sweetalert2';
import { StudentsService } from '../../services/students.service';
import { ResponseStudent } from '../../interfaces/response-student.interface';

@Component({
  selector: 'app-student-detail',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './student-detail.component.html',
  styles: ``,
})
export class StudentDetailComponent implements OnInit {
  router = inject(Router);
  id = input<string>();
  studentsService = inject(StudentsService);
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
      this.studentsService.getStudent(+this.id()!).subscribe({
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

  get currentForm(): ResponseStudent {
    return this.myForm.value as ResponseStudent;
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
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
    ],
    // creditsCount: [0],
    // coursesEnrollments: [null],
  });

  save() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      this.showAlert(3000, 'warning', 'Los datos son incorrectos');
      return;
    }

    if (this.isNew()) {
      this.studentsService.postStudent(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/student');
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
      this.studentsService.patchStudent(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/student');
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
