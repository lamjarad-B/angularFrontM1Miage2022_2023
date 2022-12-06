import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // État de connexion de l'utilisateur.
  loggedIn = false;

  // L'utilisateur est-il un administrateur ?
  admin = false;

  // Liste des administrateurs
  admins: any = {
    'brahim@gmail.com': '1234',
  }

  // Liste des utilisateurs
  users: any = {
    'yannis@gmail.com': '1234',
  }

  constructor() { }

  logIn(email: any, password: string) {
    if (this.admins[email] === password)
    {
      this.loggedIn = true;
      this.admin = true;
    }
    else if (this.users[email] === password)
    {
      this.loggedIn = true;
    }
  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn && this.admin);
    });
    return isUserAdmin;
  }
}