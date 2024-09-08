import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { UserInt } from '../../interfaces/user-int.interface';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit {

  userService = inject(UserService)
  activatedRoute = inject(ActivatedRoute)
  userData: UserInt | undefined;

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id');
    if (_id) {
      try {
        this.userData = await this.userService.getUserById(_id);
      } catch (error) {
        console.log("No se ha podido recuperar el usuario", error)
      }
    }
  }
}
