import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { UserDataComponent } from '../../components/user-data/user-data.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserDataComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  userArray: any[] = [];
  currentPage: number = 1;
  totalPages: number = 2;
  userService = inject(UserService);
  httpClient = inject(HttpClient);

  async ngOnInit(): Promise<void> {
    await this.loadUsersPage(this.currentPage)
  }

  async loadUsersPage(page: number): Promise<void> {
    this.userService.getUsers(page).then((response: any) => {
      this.userArray = response.results;
      this.totalPages = response.total_pages;
      this.currentPage = page;
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
