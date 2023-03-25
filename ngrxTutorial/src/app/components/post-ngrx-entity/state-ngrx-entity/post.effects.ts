import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity/src";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { catchError, filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { AuthDummyAction } from "../../auth/state/auth.action";
import { PostModel } from "../../models/post.model";
import { AddPostNeAction,
    AddPostNeFailAction,
    AddPostNeSuccessAction,
    DeletePostNeAction,
    DeletePostNeSuccessAction,
    LoadPostNeAction,
    LoadPostNeSuccessAction,
    UpdatePostNeAction,
    UpdatePostNeSuccessAction } from "./post.actions";
import { getPostStateAllEntitiesSelector, getPostStateEntitiesSelector } from "./post.selector";

@Injectable()
export class PostNeEffects{
    constructor(
        private actions$:Actions, 
        private postsService: PostsService,
        private router:Router,
        private store : Store<AppState>){}

    loadPosts$ = createEffect( ()=>{
            return this.actions$.pipe(ofType(LoadPostNeAction),
                mergeMap((action)=>{
                    return this.postsService.getPosts()
                    .pipe(map((data)=>{
                        return LoadPostNeSuccessAction({posts : data})
                    }))
                })
            )
        }
    );

    addPost$ = createEffect(()=>{
        //if post action is running, it will pipe success action to it
        return this.actions$.pipe(ofType(AddPostNeAction),
        mergeMap((action)=>{
            return this.postsService.addPost(action.post)
            .pipe(map((data)=>{                
                const addedPost = {...action.post, id: data.id}
                return AddPostNeSuccessAction({post:addedPost})
            }),
            catchError((error)=>{
                return of(AddPostNeFailAction());
            })
            )
        })
        )
    });

    updatePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(UpdatePostNeAction),
        switchMap((action)=>{
            return this.postsService.updatePost(action.post)
            .pipe(map((data)=>{
                console.log(data);
                const updatedPost:Update<PostModel> = {
                    id: action.post.id,
                    changes: action.post
                }
                return UpdatePostNeSuccessAction({post:updatedPost, redirect : true});
            }))
        })        
        )
    });

    //login redirect - effect
    updatePostRedirect$ = createEffect(()=>{
        return this.actions$.pipe( ofType(UpdatePostNeSuccessAction),
        //tap will not return any action, it will just do work
        tap((action)=>{            
            if(action.redirect){
                this.router.navigate(['/postne'])
            }
        })
        )
    }, {dispatch:false})

    deletePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(DeletePostNeAction),
        switchMap((action)=>{
            return this.postsService.deletePost(action.id)
            .pipe(map((data)=>{
                return DeletePostNeSuccessAction({id:action.id});
            }))
        })        
        )
    });

    getSinglePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction)=>{
            return r.payload.routerState.url.startsWith('/postne/details')
        }),
        map((r:RouterNavigatedAction)=>{            
            return r.payload.routerState['params']['id'];
        }),
        switchMap((id)=>{           
            return this.postsService.getPostById(id)
            .pipe(map((post)=>{
                const postData = [{...post, id}];
                return LoadPostNeSuccessAction({posts:postData})
            }))
        })
        )
    })
    
    // getSinglePost$ = createEffect(()=>{
    //     return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
    //     filter((r: RouterNavigatedAction)=>{
    //         return r.payload.routerState.url.startsWith('/postne/details')
    //     }),
    //     map((r:RouterNavigatedAction)=>{            
    //         return r.payload.routerState['params']['id'];
    //     }),
    //     withLatestFrom((this.store.select(getPostStateEntitiesSelector))),
    //     switchMap(([id, entities])=>{
    //         console.log(entities)
    //         if(!entities){
    //             return this.postsService.getPostById(id)
    //             .pipe(map((post)=>{
                    
    //                 const postData = [{...post, id}];
    //                 return LoadPostNeSuccessAction({posts:postData})
    //             }))
    //         }
    //         //else send dummy action            
    //         return of(AuthDummyAction());
    //     })
    //     )
    // })
}