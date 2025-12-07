import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { HomePage } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { PostDetailsPage } from './pages/post-details/post-details.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginPage, canActivate: [GuestGuard] },
	{ path: 'home', component: HomePage, canActivate: [AuthGuard] }
	, { path: 'posts/:id', component: PostDetailsPage }
];
