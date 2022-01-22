import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dates: number[] = [];
  month: number[] = [];
  year:number[] = [];
  win: any;  
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  ngOnInit(): void {
    if(this.data != null) {
      if(this.data.time != null) {
        this.win = 1;
      }
      else {
        this.win = 2;
      }
     
      console.log(this.data.time);
    }
    for(let j=1; j<=31; j++) {
      this.dates.push(j);
    }

    for(let j=1; j<=12; j++) {
      this.month.push(j);
    }

    for(let j=1950; j<=2050; j++) {
      this.year.push(j);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchEvents(): void {
    const date:HTMLInputElement = <HTMLInputElement>document.getElementById('date');
    const months:HTMLInputElement = <HTMLInputElement>document.getElementById('month');
    const years:HTMLInputElement = <HTMLInputElement>document.getElementById('year');
    let value = '';
    let events:HTMLInputElement = <HTMLInputElement>document.getElementById('events');
    if((date != null)&&(months != null)&& (years != null)) {
      value = <string>window.localStorage.getItem(`${date.value}/${months.value}/${years.value}`);
    } 
    if(events) {
      events.value = value;
    }
    console.log(value, `${date.value}/${months.value}/${years.value}`);
  }

  onSuccess(): void {
    const date:HTMLInputElement = <HTMLInputElement>document.getElementById('date');
    const months:HTMLInputElement = <HTMLInputElement>document.getElementById('month');
    const years:HTMLInputElement = <HTMLInputElement>document.getElementById('year');
    let events:HTMLInputElement = <HTMLInputElement>document.getElementById('events');
    let date1 = `${date.value}/${months.value}/${years.value}`;
    if(events.value === '') {
      this.dialogRef.close();
    }
    window.localStorage.setItem(date1, events.value);
    this.dialogRef.close({date: date1, value: events.value});
  }
}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

