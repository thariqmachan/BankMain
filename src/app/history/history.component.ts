import { Component , OnInit } from '@angular/core';
import { DataService } from '../serviceFiles/data.service';
import { Router } from '@angular/router';

import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  acno:any
  transactionArray:any=[]
  spinner:any=true
  date:any=true
  searchTerm:any=""

  constructor(private ds:DataService,private rout:Router)  {

  }

  ngOnInit():void{
    // acno in localstorage
    if(localStorage.getItem("currentAcno")){
      this.acno=JSON.parse(localStorage.getItem("currentAcno")||"")
      // console.log(this.acno);
      this.ds.accountStatementApi(this.acno).subscribe({
        next:(result:any)=>{
          this.transactionArray=result.message
          // console.log(this.transactionArray);
          
        }

        
      })
      
    }

    setTimeout(()=>{
      this.spinner=false
    },2000)

     // date()

  this.date=new Date()
  }


 

  backtoHome(){
    this.rout.navigateByUrl("home")
  }

  filterData(search:any){
    this.searchTerm=search
  }

  pdfExport(){
    // create a object for class class jspdf
    var pdf=new jsPDF()


    // set columns
    let col=['Type','Amount','Accoun number','Date']

    // set row
    let row=[]

    // style
    pdf.setFontSize(16)
    pdf.text("Account Statement",15,10)
    pdf.setFontSize(12)
    pdf.setTextColor('blue')


    // array of arrays - nested array
    var allDataArray=this.transactionArray
    for(let i of allDataArray){
      let rowData=[i.type,i.amount,i.tacno,i.date]
      row.push(rowData)
    }

    // converted to pdf as table
    (pdf as any).autoTable(col,row,{startY:15})

    // open converted pdf in new tab
    pdf.output('dataurlnewwindow')

    // download and save
    pdf.save('accountStatement.pdf')
  }

}
