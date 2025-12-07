import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'posts_app_user';

  login(username: string, password: string): boolean {
    const name = (username || '').trim().toLowerCase();
    const pass = (password || '').trim().toLowerCase();
    const ok = name === 'test' && pass === 'test123'
    if (ok) {
      localStorage.setItem(this.storageKey, JSON.stringify({ username: username.trim() }));
    }
    return ok;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getUser(): { username: string } | null {
    const v = localStorage.getItem(this.storageKey);
    return v ? JSON.parse(v) : null;
  }
}
