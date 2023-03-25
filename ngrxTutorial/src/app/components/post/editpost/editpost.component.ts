import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { PostModel } from '../../models/post.model';
import { UpdatePostAction } from '../state/post.actions';
import { getPostStateByIdSelector } from '../state/post.selector';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit, OnDestroy{
constructor(
  private currentRoute : ActivatedRoute,
  private store : Store<AppState>,
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

  this.postSubscription = this.store
  .select(getPostStateByIdSelector)
  .subscribe((data)=>{
    this.postDetails = data;
    if(data){
      this.postFormGroup.patchValue({
        title : data.title,
        description : data.description
      })
    }    
  });
  
  //old way without using route state
  // this.postSubscription = this.currentRoute.paramMap.subscribe((params)=>{
  //   const id =  params.get('id');
  //   this.store.select(getPostStateById, {id}).subscribe(data=>{
  //     this.postDetails = data;
  //   })
  // });

  
}
ngOnDestroy(): void {
  if(this.postSubscription){
    this.postSubscription.unsubscribe();
  }
}

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
    id: this.postDetails.id,
    title : this.postFormGroup.value.title,
    description : this.postFormGroup.value.description
  };

  this.store.dispatch(UpdatePostAction({post: updatedPostData}))
  this.router.navigate(['/post'])
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

