import { Component, OnInit } from '@angular/core';
import { UserInt } from '../../interfaces/user-int.interface';
import { UserService } from '../../services/user-service.service';
import { UserDataComponent } from '../../components/user-data/user-data.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserDataComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class HomeComponent implements OnInit {
  userArray: UserInt[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.loadUsersPage(this.currentPage)
  }

  async loadUsersPage(page: number): Promise<void> {
    this.userService.getUsers().then((response: any) => {
      this.userArray = response.results;
      this.currentPage = response.total_pages;
      this.totalPages = page;
    });
  }

  nextUsersPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadUsersPage(this.currentPage + 1)
    }
  }

  previousUsersPage(): void {
    if (this.currentPage > 1) {
      this.loadUsersPage(this.currentPage - 1)
    }
  }

  getNumberOfUsersPages(): number[] {
    const pageNumbers = []
    for (let i = 0; i < this.totalPages; i++) {
      pageNumbers.push(i + 1)
    }
    return pageNumbers
  }

}
