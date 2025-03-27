import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styles: ``,
})
export class AlertComponent {
  type = input.required<string>();
  message = input.required<string>();

  tittle = computed(() => {
    switch (this.type()) {
      case 'error':
        return 'Error';
      case 'warning':
        return 'Precaución';
      case 'success':
      case 'info':
        return 'Información';
      default:
        return 'Mensaje';
    }
  });

  colors = computed<string[]>(() => {
    switch (this.type()) {
      case 'warning':
        return [
          'text-yellow-800',
          'border-yellow-300',
          'bg-yellow-50',
          'text-yellow-300',
          'border-yellow-800',
        ];
      case 'error':
        return [
          'text-red-800',
          'border-red-300',
          'bg-red-50',
          'text-red-400',
          'border-red-800',
        ];
      case 'success':
        return [
          'text-green-800',
          'border-green-300',
          'bg-green-50',
          'text-green-400',
          'border-green-800',
        ];
      case 'info':
        return [
          'text-blue-800',
          'border-blue-300',
          'bg-blue-50',
          'text-blue-400',
          'border-blue-800',
        ];
      default:
        return [];
    }
  });
}
