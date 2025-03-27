import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static emailPattern =
    /^[a-zA-Z0-9_.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9\-]{2,4}$/;
  static passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
  static namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  static userNamePattern = /^[a-zA-Z0-9_]+$/;

  static isFieldMatch(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const control1 = formGroup.get(field1)?.value;
      const control2 = formGroup.get(field2)?.value;
      return control1 === control2 ? null : { fieldMatch: true };
    };
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'No es un correo válido';
          }
          return 'Valor del campo no válido';
        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }
}
