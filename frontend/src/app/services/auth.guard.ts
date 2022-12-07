import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { first, map, Observable } from "rxjs";
import { UserService } from "./user.service";


@Injectable({
  providedIn: 'root',
})
export class IsAuthenticated implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const isAuthorized = this.userService.isAuthenticated();

    if (!isAuthorized) {
      return this.userService.user$.pipe(
        first(),

        (res: any) => {
            console.log('IsAuth===>>>> ', res);
            if (!!res) {
              return true;
            } else {
              this.router.navigate(['signin']);
              return false;
            }
          },
          () => {
            return false;
        }
        
      );
    }
    else {
      return true;
    }
  }
}