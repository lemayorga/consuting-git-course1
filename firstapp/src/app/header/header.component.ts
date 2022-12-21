import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth-service";
import { DataStorageService } from "../shared/data-storage-service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private userSub: Subscription;
    isAutenticated = false;

    constructor(private dataStoreService: DataStorageService,
                private authService: AuthService){}

    ngOnInit() {
     this.userSub =  this.authService.user.subscribe(user =>{
        this.isAutenticated = !!user;
     });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    onSaveData(){
        this.dataStoreService.storeRecipes();
    }

    onFetchData(){
        this.dataStoreService.fetchRecipes()
        .subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
}