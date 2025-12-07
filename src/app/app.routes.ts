import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
import { HomePage } from './pages/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PostDetailsPage } from './pages/post-details/post-details.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginPage },
	{ path: 'home', component: HomePage, canActivate: [AuthGuard] }
	, { path: 'posts/:id', component: PostDetailsPage }
];
