import { Component , OnInit } from '@angular/core';
import { DataService } from '../serviceFiles/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  // sdata:any
  name:any=""
  acno:any=""
  balance:any=""
  messages:any=""
  msgClr:any=true
  dAcno:any=""

  // reactive fro mfor moneytransfer 
  moneyTransferForm=this.fb.group({
    rAcno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
  })

  constructor (private ds:DataService,private fb:FormBuilder,private dp:DatePipe,private rout:Router) { }

  ngOnInit():void {
    // setTimeout(()=>{
    //   this.ds.serviceMethod()
    // },3000)

    // this.sdata=this.ds.data

    // check data presnet or not in ls
    if(localStorage.getItem("currentUname")){
      this.name=localStorage.getItem("currentUname")
      // console.log(this.name);
      
    }

    // login or not
    if(!localStorage.getItem("currentAcno")){
      this.rout.navigateByUrl("")
      alert("please login first")
    }

  }

  getbalance(){
    // alert("balance")

    // acno-ls
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno") || "")
      // console.log(this.acno);
      // balance
      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result:any) =>{
          // console.log(result.message);
          this.balance=result.message
          
        },
        error:(result:any) =>{
          alert(result.error.message)
        }
      })
      
    }
  }

  getProfile(){
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
      console.log(this.acno);
      console.log(this.name);
      
      
    }
  }



  moneyTransfer(){
    if(this.moneyTransferForm.valid){
      var path=this.moneyTransferForm.value
      var rAcno=path.rAcno
      var amount=path.amount
      var psw=path.psw
      // console.log(rAcno);

      // sender acno
      if(localStorage.getItem("currentAcno")){
       this.acno= JSON.parse(localStorage.getItem("currentAcno")||"")
       console.log(this.acno);
       
      }
      
      // date
      const date=new Date()
      // console.log(date);
      var latestDate=this.dp.transform(date,'short')
      // console.log(latestDate);
      if(this.acno==rAcno){
        // alert('sender nd receiver account num same')
        this.messages="sender nd receiver account num same"
        this.msgClr=true
      }
      else{
        // api call
        this.ds.moneyTransferApi(this.acno,rAcno,amount,psw,latestDate).subscribe({
          next:(result:any)=>{
            // alert(result.message)
            this.messages=result.messages
            this.msgClr=true
          },
          error:(result:any)=>{
            // alert(result.error.message)
            this.messages=result.error.messages
            this.msgClr=false
          }
          
          

        })
      }
      
    }
    else{
      // alert("invalid")
      this.messages="Invalid form"
      this.msgClr=false
    }
  }



  logout(){
    localStorage.removeItem("currentUname")
    localStorage.removeItem("currentAcno")
    this.rout.navigateByUrl("")

  }


  deleteActive(){
    if(localStorage.getItem("currentAcno")){
      this.dAcno=JSON.parse(localStorage.getItem("currentAcno") || "")
      console.log(this.dAcno);
      
    }
  }



  cancelp(){
    this.dAcno=""
  }


  yesDelete(event:any){
    // alert("delete api calls")
    console.log(event);  // acno
    this.ds.accountDeleteApi(event).subscribe({
      next:(data:any)=>{
        alert(data.message)
        this.logout()
      }
    })
    
  }

}
