import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { PostModel } from '../../models/post.model';
import { AddPostAction, LoadPostAction } from '../state/post.actions';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit{
constructor(private storeService: Store<AppState>, private router:Router){}
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
}
postAdd$: Observable<PostModel>;
postFormGroup: FormGroup;

onAddFormSubmit(){
  if(!this.postFormGroup.valid){
    return;
  }  
  const postData :PostModel= {
    id:0,
    title : this.postFormGroup.value.title,
    description : this.postFormGroup.value.description,
  };
  this.storeService.dispatch(AddPostAction({post: postData}))
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
