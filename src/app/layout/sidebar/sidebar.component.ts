import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems = signal<MenuItem[]>([
    {
      title: 'Inscripciones',
      icon: 'fa-solid fa-clipboard-check',
      link: 'enrollment',
    },
    {
      title: 'Estudiantes',
      icon: 'fa-solid fa-user',
      link: 'student',
    },
    {
      title: 'Materias',
      icon: 'fa-solid fa-book',
      link: 'course',
    },
    {
      title: 'Profesores',
      icon: 'fa-solid fa-user-tie',
      link: 'professor',
    },
  ]);
}
