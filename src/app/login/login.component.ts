import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
    data = "happy banking with us"
     //num:any //  whenever we need to store value
    data2="enter account number"
    acno:any=""

    constructor () {}

    ngOnInit():void {
      
    }


    login(){
      alert("button clicked")
    }

    acnoChange(event:any){
      console.log(event.target.value);
      
    }

    pswChange(event:any){
      console.log(event.target.value);
      
    }
 
}



// login(){
//   console.log(this.acno);
//   console.log(this.psw);
//   // alert(this.acno)


//   //redirection


//   //api call
  
  
// }


