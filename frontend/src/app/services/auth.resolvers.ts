import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first } from "rxjs";
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class LoggedInUserResolver implements Resolve<any> {
    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.isAuthenticated();
    }
}