import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { catchError, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { AddPostAction, AddPostFailAction, AddPostSuccessAction, DeletePostAction, DeletePostSuccessAction, LoadPostAction, LoadPostSuccessAction, UpdatePostAction, UpdatePostSuccessAction } from "./post.actions";

@Injectable()
export class PostEffects{
    constructor(
        private actions$:Actions, 
        private postsService: PostsService,
        private router:Router){}

    loadPosts$ = createEffect( ()=>{
            return this.actions$.pipe(ofType(LoadPostAction),
                mergeMap((action)=>{
                    return this.postsService.getPosts()
                    .pipe(map((data)=>{
                        return LoadPostSuccessAction({posts : data})
                    }))
                })
            )
        }
    );

    addPost$ = createEffect(()=>{
        //if post action is running, it will pipe success action to it
        return this.actions$.pipe(ofType(AddPostAction),
        mergeMap((action)=>{
            return this.postsService.addPost(action.post)
            .pipe(map((data)=>{                
                const addedPost = {...action.post, id: data.id}
                return AddPostSuccessAction({post:addedPost})
            }),
            catchError((error)=>{
                return of(AddPostFailAction());
            })
            )
        })
        )
    });

    updatePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(UpdatePostAction),
        switchMap((action)=>{
            return this.postsService.updatePost(action.post)
            .pipe(map((data)=>{
                console.log(data);
                return UpdatePostSuccessAction({post:action.post, redirect : true});
            }))
        })        
        )
    });

    //login redirect - effect
    updatePostRedirect$ = createEffect(()=>{
        return this.actions$.pipe( ofType(UpdatePostSuccessAction),
        //tap will not return any action, it will just do work
        tap((action)=>{            
            if(action.redirect){
                this.router.navigate(['/post'])
            }
        })
        )
    }, {dispatch:false})

    deletePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(DeletePostAction),
        switchMap((action)=>{
            return this.postsService.deletePost(action.id)
            .pipe(map((data)=>{
                return DeletePostSuccessAction({id:action.id});
            }))
        })        
        )
    });

    getSinglePost$ = createEffect(()=>{
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
        filter((r: RouterNavigatedAction)=>{
            return r.payload.routerState.url.startsWith('/post/details')
        }),
        map((r:RouterNavigatedAction)=>{            
            return r.payload.routerState['params']['id'];
        }),
        switchMap((id)=>{
            console.log(id);
            return this.postsService.getPostById(id)
            .pipe(map((post)=>{
                console.log(post);
                const postData = [{...post, id}];
                return LoadPostSuccessAction({posts:postData})
            }))
        })
        )
    })
}