import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../serviceFiles/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  pswCheck:any=false

  //model for signup form
  signupForm=this.fb.group({
    acno:["",[Validators.required,Validators.pattern('[0-9]+')]],
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    psw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
    cpsw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
  })


  constructor (private rout:Router,private fb:FormBuilder,private ds:DataService) { }

  ngOnInit(): void {
    
  }
  signup(){

    // console.log(this.signupForm.value.acno);
    // console.log(this.signupForm.value.uname);
    // console.log(this.signupForm.value.psw);
    // console.log(this.signupForm.value.cpsw);

    var path=this.signupForm.value
    var acno=path.acno
    var uname=path.uname
    var psw=path.psw
    var cpsw=path.cpsw

    if(this.signupForm.valid){
      if(psw==cpsw){
        this.pswCheck=false
        // api call
        this.ds.accountCreate(acno,psw,uname).subscribe({

          // console.log(result);
          
          next:(result:any)=>{
            alert(result.message)
            this.rout.navigateByUrl("")
          },
          error:(result:any)=>{
            alert(result.error.message)

          }

        })
      }
      else{
        this.pswCheck=true
      }
      // alert("valid")
    }
    else{
      alert("invalid")
    }

    

    
    // alert("account created")
    // this.rout.navigateByUrl("")
  }


  //methods
}
