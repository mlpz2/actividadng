import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInt } from '../../interfaces/user-int.interface';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [RouterLink, ButtonsComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})

export class UserDataComponent {

  @Input() userData!: UserInt;

}
