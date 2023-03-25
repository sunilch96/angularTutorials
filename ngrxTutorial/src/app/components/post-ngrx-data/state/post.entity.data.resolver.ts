import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first, map, mergeMap, Observable, of, tap } from "rxjs";
import { PostEntityDataService } from "./post.entity.data.service";

// this resolver will be used in post list route
@Injectable()
export class PostEntityDataResolver implements Resolve<boolean>{
    constructor(private postEntityDataService : PostEntityDataService ){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            // this resolved is sued to avoid unecessary call if already data is loaded in state
            //there are 2 ways to resolve
            //1
            return this.postEntityDataService.loaded$.pipe(
                tap((loaded)=>{
                    if(!loaded){
                        this.postEntityDataService.getAll();
                    }
                }),
                first() //unti and unless first data/response is returned
            )
            //or
            //2
            // return this.postEntityDataService.loaded$.pipe(
            //     mergeMap((loaded) =>{
            //         //using merge map, cause we need to make api ca;;
            //         if(loaded){
            //             return of(true);
            //         }
            //         //else call api
            //         return this.postEntityDataService.getAll().pipe(
            //             map((posts)=>{
            //                 return !!posts;
            //             })
            //         )
            //     }),
            //     first() //atleast one data need to get return.
            // )
    }
}