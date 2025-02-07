import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuariosService } from '../../../core/services/users.service.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { User } from '../../../core/models/user.interface.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  usuario: User | null = null;
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  constructor(
    private userService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      usuario: [
        this.usuario?.usuario,
        {
          validators: [Validators.required],
          asyncValidators: [this.validateUsername.bind(this)],
          updateOn: 'blur',
        },
      ],
      nombre: [this.usuario?.nombre, Validators.required],
      apellido: [this.usuario?.apellido, Validators.required],
      telefono: [this.usuario?.telefono, Validators.required],
      mail: [
        this.usuario?.mail,
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.validateEmail.bind(this)],
          updateOn: 'blur',
        },
      ],
      direccion: [this.usuario?.direccion, Validators.required],
    });
    this.passwordForm = this.fb.group(
      {
        currentPassword: [
          '',
          {
            validators: [Validators.required],
            asyncValidators: [this.validateCurrentPassword.bind(this)],
            updateOn: 'blur', // se ejecuta la validación al salir del campo
          },
        ],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    return group.get('newPassword')?.value ===
      group.get('confirmPassword')?.value
      ? null
      : { notMatching: true };
  }

  validateCurrentPassword(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (!this.usuario?.id) {
      return of(null);
    }
    return this.userService
      .validatePassword(this.usuario.id, control.value)
      .pipe(
        map((isValid: boolean) =>
          isValid ? null : { invalidCurrentPassword: true }
        ),
        catchError(() => of({ invalidCurrentPassword: true }))
      );
  }

  validateUsername(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    if (!this.usuario || control.value === this.usuario.usuario) {
      return of(null);
    }
    return this.userService.checkUsername(control.value).pipe(
      map((exists) => {
        console.log(
          'Resultado de checkUsername para',
          control.value,
          ':',
          exists
        );
        return exists ? { usernameTaken: true } : null;
      }),
      catchError((err) => {
        console.error('Error en validación de username', err);
        return of(null);
      })
    );
  }

  validateEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!this.usuario || control.value === this.usuario.mail) {
      return of(null);
    }
    return this.userService.checkEmail(control.value).pipe(
      map((exists) => (exists ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  get formPending(): boolean {
    return this.profileForm.status === 'PENDING';
  }

  async updateProfile(): Promise<void> {
    this.profileForm.markAllAsTouched();

    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      control?.updateValueAndValidity();
    });

    if (this.profileForm.status === 'PENDING') {
      const isValid = await new Promise<boolean>((resolve) => {
        const sub = this.profileForm.statusChanges.subscribe((status) => {
          if (status !== 'PENDING') {
            sub.unsubscribe();
            resolve(status === 'VALID');
          }
        });
      });

      if (!isValid) return;
    }

    if (this.profileForm.invalid) return;

    if (this.usuario?.id) {
      const updatedUser: User = { ...this.usuario, ...this.profileForm.value };
      this.userService.editUser(updatedUser).subscribe({
        next: () => {
          this.authService.setUserSession(updatedUser);
          this.ngOnInit();
          alert('Perfil actualizado correctamente');
        },
        error: () => {
          alert('Error al actualizar el perfil');
        },
      });
    }
  }

  changePassword(): void {
    if (this.usuario?.id) {
      this.userService
        .changePassword(this.usuario.id, this.passwordForm.value)
        .subscribe({
          next: () => {
            this.closeModal('updatePassword');
            this.ngOnInit();
            alert('Contraseña actualizada correctamente');
          },
          error: () => {
            console.error('Error al cambiar la contraseña');
            alert('Error al cambiar la contraseña');
          },
        });
    } else {
      console.error('El id del usuario es indefinido');
    }
  }

  openModal(modalId: string): void {
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal(modalId: string) {
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop != null) {
      backdrop.parentNode?.removeChild(backdrop);
    }
  }
}
