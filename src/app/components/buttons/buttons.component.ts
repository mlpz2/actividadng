import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  @Input() parent: string = "";
  @Input() idUser: number | undefined = 0;

  constructor(private userService: UserService) { }

  async deleteUser(id: number | undefined) {
    if (id !== undefined) {
      Swal.fire({
        title: `Estas seguro de eliminar al usuario: ${this.idUser}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.userService.deleteUser(id)
            console.log("Borrado")
            Swal.fire({
              title: "Borrado",
              text: `Se ha borrado correctamente al usuario: ${this.idUser}`,
              icon: "success"
            })
          } catch (error) {
            console.error("Error al borrar el usuario:", error)
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "El usuario que intentas borrar no existe"
            })
          }
        }
      });
    }
  }
}
