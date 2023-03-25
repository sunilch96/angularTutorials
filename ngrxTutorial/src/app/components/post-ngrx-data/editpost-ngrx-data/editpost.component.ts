import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { PostEntityDataService } from '../state/post.entity.data.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostNdComponent implements OnInit, OnDestroy{
constructor(
  private currentRoute : ActivatedRoute,
  private postEntityDataService : PostEntityDataService,
  private router:Router){}

ngOnInit(): void {
  
  this.postFormGroup = new FormGroup({
    title: new FormControl(null,[
      Validators.required,
      Validators.minLength(5)
    ]),
    description: new FormControl(null,[
      Validators.required,
      Validators.minLength(5)
    ])
  });
  
  this.postId = this.currentRoute.snapshot.params['id'];  
  this.postEntityDataService.entities$.subscribe(posts=>{    
    const _postById = posts.find(x=> x.id == this.postId);
    if(_postById != undefined){
      this.postFormGroup.patchValue({
      description : _postById.description,
      title : _postById.title,
    })
    }
  });
}

ngOnDestroy(): void {
  if(this.postSubscription){
    this.postSubscription.unsubscribe();
  }
}

postId:number;
postSubscription : Subscription;
postFormGroup: FormGroup;
selectedPostId:number = 0;
postDetails : PostModel;

onAddFormSubmit(){
  if(!this.postFormGroup.valid){
    return;
  }

  //else update record
  const updatedPostData : PostModel = {
    id: this.postId,
    title : this.postFormGroup.value.title,
    description : this.postFormGroup.value.description
  };

  this.postEntityDataService.update( updatedPostData).subscribe(data=>{
    this.router.navigate(['/postnd'])
  });
}

showFormControlErrors(elementName){
  const elementError = this.postFormGroup.get(elementName);
  if(elementError.touched && !elementError.valid){
    if(elementError.errors?.['required']){
      return this.capitalizeFirstLetter(elementName) + ' Required.';
    }
    if(elementError.errors?.['minlength']){
      const requiredLength = elementError.errors?.['minlength']?.requiredLength;
      return this.capitalizeFirstLetter(elementName) 
      + ' length must be minimum '
      + requiredLength+' characters.';
    }
  }
  return '';
}
capitalizeFirstLetter(elementName) {
  return elementName.charAt(0).toUpperCase() + elementName.slice(1);
}
}

