import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
    registre?:boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService{

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router) {}
    
    singup(email:string, password:string){
      return   this.http.post<AuthResponseData>('https//www.googleapis.com/identitytoolkit/v2/relyingparty/singupNewUser?key=AIzaSyDb0xTaRaoxyCgvaDF3kk5VYOsTwb_3o7Y',
        {
            email: email,
            passsword: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>{
                this.handelAutenticacion(resData.email, resData.localId, resData.idToken, +resData.expireIn);
        }));
    }

    login(email:string, password:string){
        return  this.http.post<AuthResponseData>('https//www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb0xTaRaoxyCgvaDF3kk5VYOsTwb_3o7Y',
        {
            email: email,
            passsword: password,
            returnSecureToken: true
        })
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin(){
        const userData:{
            email: string;
            id: string;
            _token:string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
         return;


         const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
         if(!loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
         }
    }

    autoLogout(expirationDuration: number){
       this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handelAutenticacion(email: string,userId: string, token: string, expireIn: number){
        const expirationDate = new Date(new Date().getTime() +  expireIn * 1000);
        const user = new User(email, userId, token, expirationDate);
    
        this.user.next(user);
        this.autoLogout(expireIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));

    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage  = 'An unknown error ocurred';

        if(!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not corect.';
                break;
            }
            return throwError(errorMessage);
    }
}