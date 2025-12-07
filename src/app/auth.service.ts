import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'posts_app_user';

  login(username: string, password: string): boolean {
    const normalizedUsername = (username || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim().toLowerCase();
    const isValid =
      normalizedUsername.startsWith('test') && normalizedPassword.startsWith('test123');
    if (isValid) {
      localStorage.setItem(this.storageKey, JSON.stringify({ username: username.trim() }));
    }
    return isValid;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getUser(): { username: string } | null {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }
}
