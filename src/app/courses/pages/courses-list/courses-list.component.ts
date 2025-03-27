import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { CoursesService } from '../../services/courses.service';
import { ResponseCourse } from '../../interfaces/response-course.interface';

@Component({
  selector: 'app-courses-list',
  imports: [RouterLink],
  templateUrl: './courses-list.component.html',
  styles: ``,
})
export class CoursesListComponent implements OnInit {
  coursesService = inject(CoursesService);
  courses = signal<ResponseCourse[]>([]);

  ngOnInit(): void {
    this.coursesService.getCourses('', '').subscribe({
      next: (resp) => this.courses.set(resp.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  deleteItem(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Borrarás el registro: ${nombre}`,
      theme: 'dark',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCourse(id).subscribe({
          next: () => {
            Swal.fire({
              theme: 'dark',
              title: 'Eliminado',
              text: 'Registro eliminado correctamente',
              icon: 'success',
            });

            this.coursesService.getCourses('', '').subscribe({
              next: (resp) => this.courses.set(resp.data),
              error: (message) => Swal.fire('Error', message, 'error'),
            });
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
