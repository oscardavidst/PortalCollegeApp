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
import { CoursesService } from '../../services/courses.service';
import { ResponseCourse } from '../../interfaces/response-course.interface';

@Component({
  selector: 'app-course-detail',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './course-detail.component.html',
  styles: ``,
})
export class CourseDetailComponent implements OnInit {
  router = inject(Router);
  id = input<string>();
  coursesService = inject(CoursesService);
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
      this.coursesService.getCourse(+this.id()!).subscribe({
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

  get currentForm(): ResponseCourse {
    return this.myForm.value as ResponseCourse;
  }

  myForm = this.#fb.group({
    id: [0],
    name: [
      '',
      [Validators.required, Validators.pattern(FormUtils.namePattern)],
    ],
    credits: [0, [Validators.required]],
  });

  save() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) {
      this.showAlert(3000, 'warning', 'Los datos son incorrectos');
      return;
    }

    if (this.isNew()) {
      this.coursesService.postCourse(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/course');
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
      this.coursesService.patchCourse(this.currentForm).subscribe({
        next: (resp) => {
          Swal.fire({
            theme: 'dark',
            title: 'Información',
            text: 'Registro guardado',
            icon: 'success',
            showConfirmButton: false,
          });
          this.router.navigateByUrl('layout/course');
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
