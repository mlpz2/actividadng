import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {

  @Input() userForm: FormGroup;
  userService = inject(UserService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  type: string = "Crear nuevo"
  isUpdateMode: boolean = false;
  userId: String = '';
  validador_url_string: RegExp = RegExp('ftp://|http://|https://?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  validador_username: RegExp = RegExp('(^[A-Za-z0-9_.]*$)');

  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.pattern(this.validador_username)]),
      image: new FormControl('', [Validators.required, Validators.pattern(this.validador_url_string)]),
    });
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.isUpdateMode = true;
        this.userId = params._id;
        this.type = 'Actualizar'
        const response = await this.userService.getUserById(this.userId!)
        this.userForm = new FormGroup({
          email: new FormControl(response.email, [Validators.required, Validators.email]),
          first_name: new FormControl(response.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(response.last_name, [Validators.required, Validators.minLength(3)]),
          username: new FormControl(response.username, [Validators.required, Validators.pattern(this.validador_username)]),
          image: new FormControl(response.image, [Validators.required, Validators.pattern(this.validador_url_string)]),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isUpdateMode) {
        this.userService.updateUser(this.userId!, this.userForm.value).then(() => {
          alert('User updated successfully');
          this.router.navigate(['/home']);
        });
      } else {
        this.userService.createUser(this.userForm.value).then(() => {
          alert('User created successfully');
          this.router.navigate(['/home']);
        });
      }
    }
  }
  async getDataForm() {
    if (this.userId) {
      const response = await this.userService.updateUser(this.userId!, this.userForm.value);
      if (response.id) {
        console.log(response)
        Swal.fire({
          title: "Usuario actualizado",
          text: `El usuario ${response._id} se ha actualizado correctamente`,
          icon: "success"
        })
        this.router.navigate(['/home'])
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario que intentas editar no existe"
        })
      }

    } else {
      const response = await this.userService.createUser(this.userForm.value)
      if (response.id) {
        console.log(response)
        Swal.fire({
          title: "Usuario creado",
          text: `El usuario ${response.id} se ha creado correctamente`,
          icon: "success"
        })
        this.router.navigate(['/home'])
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha habido un problema. Intentálo de nuevo"
        })
      }
    }
  }

  checkControl(formControlName: string, validator: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched;
  }

}
