import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { PostModel } from "../../models/post.model";
import { postsNdEntityDataName } from "./post.entity.data.service";

@Injectable()
export class PostsEntityDataService extends DefaultDataService<PostModel>{
    constructor(private httpClient: HttpClient, httpUrlGenerator : HttpUrlGenerator){
        super(postsNdEntityDataName, httpClient, httpUrlGenerator);
    }
    baseUrl:string = "https://localhost:7231/";

    override getAll(): Observable<PostModel[]>{
        return this.httpClient.get(this.baseUrl + 'api/Post')
        .pipe(map((data)=>{
            const postList = <PostModel[]>data
            return postList;
        }))
    }

    override add(postData: PostModel): Observable<PostModel>{
        return this.httpClient.post(this.baseUrl + 'api/Post', postData)
        .pipe(map((data)=>{
            const postList = <PostModel>data
            return postList;
        }))
    }

    override update(postData: Update<PostModel>): Observable<PostModel>{
        return this.httpClient
        .put<PostModel>(this.baseUrl + 'api/Post/'+ postData.id, {...postData.changes})
    }

    override delete(id: number): Observable<number>{
        return this.httpClient.delete(this.baseUrl + 'api/Post/'+ id)
        .pipe(map(data=>{
            return id;
        }))
    }
}