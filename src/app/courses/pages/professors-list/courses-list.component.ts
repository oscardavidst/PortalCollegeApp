import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { ProfessorsService } from '../../services/professors.service';
import { ResponseProfessor } from '../../interfaces/response-professor.interface';

@Component({
  selector: 'app-professors-list',
  imports: [RouterLink],
  templateUrl: './professors-list.component.html',
  styles: ``,
})
export class ProfessorsListComponent implements OnInit {
  professorsService = inject(ProfessorsService);
  professors = signal<ResponseProfessor[]>([]);

  ngOnInit(): void {
    this.professorsService.getProfessors('', '').subscribe({
      next: (resp) => this.professors.set(resp.data),
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
        this.professorsService.deleteProfessor(id).subscribe({
          next: () => {
            Swal.fire({
              theme: 'dark',
              title: 'Eliminado',
              text: 'Registro eliminado correctamente',
              icon: 'success',
            });

            this.professorsService.getProfessors('', '').subscribe({
              next: (resp) => this.professors.set(resp.data),
              error: (message) => Swal.fire('Error', message, 'error'),
            });
          },
          error: (message) => Swal.fire('Error', message, 'error'),
        });
      }
    });
  }
}
