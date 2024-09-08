import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: UsersListComponent },
    { path: "user/:_id", component: UserViewComponent },
    { path: "newuser", component: FormComponent },
    { path: "update/user/:_id", component: FormComponent }
]; 
