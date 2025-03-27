import { Component, inject, OnInit, signal } from '@angular/core';
import Swal from 'sweetalert2';

import { StudentsService } from '../../services/students.service';
import { RouterLink } from '@angular/router';
import { ResponseStudent } from '../../interfaces/response-student.interface';

@Component({
  selector: 'app-students-list',
  imports: [RouterLink],
  templateUrl: './students-list.component.html',
  styles: ``,
})
export class StudentsListComponent implements OnInit {
  studentsService = inject(StudentsService);
  students = signal<ResponseStudent[]>([]);

  ngOnInit(): void {
    this.studentsService.getStudents('', '', '').subscribe({
      next: (resp) => this.students.set(resp.data),
      error: (message) => Swal.fire('Error', message, 'error'),
    });
  }

  deleteItem(id: number, email: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Borrarás el registro con email: ${email}`,
      theme: 'dark',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudent(id).subscribe({
          next: () => {
            Swal.fire({
              theme: 'dark',
              title: 'Eliminado',
              text: 'Registro eliminado correctamente',
              icon: 'success',
            });

            this.studentsService.getStudents('', '', '').subscribe({
              next: (resp) => this.students.set(resp.data),
              error: (message) => Swal.fire('Error', message, 'error'),
            });
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
