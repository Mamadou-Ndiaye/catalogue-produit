import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users: User[]= [];
  public authenticatedUser : User | undefined;

  constructor() {
    this.users.push(
      {id: 1, username: "modou",password: "1234",roles: ["ADMIN", "user"]},
      {id: 2, username: "Mamadou",password: "123",roles: ["USER"]},
      {id: 3, username: "Awa",password: "123",roles: [ "USER"]},
      {id: 4, username: "Fatou",password: "123",roles: [ "USER"]},
      );
  }

  login(username: string, password: string): Observable<User>{
    let user=  this.users.find(u=>u.username==username);
     if(!user){
       return  throwError(()=> new Error('User not found'));
     }
     if(user.password!= password)
       return  throwError(()=> new Error('Bad credential '));

     return of(user);

  }

  anthenticateUser(user: User): Observable<boolean>{
     this.authenticatedUser= user;
     localStorage.setItem("authUser",JSON.stringify({username: this.authenticatedUser.username,roles: this.authenticatedUser.roles, jwt: "JWT_TOKEN"}));
     return of(true);
  }

  public  hasRoles(role: string): boolean{
   return this.authenticatedUser!.roles.includes(role);
  }

  isAuthenticated(): boolean{
    return this.authenticatedUser!= undefined;
  }

  logout(): Observable<boolean>{
    this.authenticatedUser= undefined;
    localStorage.removeItem("authUser");
    return  of(true);
  }
}
