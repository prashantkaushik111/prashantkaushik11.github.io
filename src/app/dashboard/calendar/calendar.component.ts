import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',  'Friday', 'Saturday', 'Sunday'];
  nav = 0;
  localStorage: any;
  currentMonth: any;
  currentYear: any;
  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.onLoad(this.nav);
    this.localStorage = window.localStorage;
    console.log(this.localStorage)
  }
  onLoad(nav: number) {
    let date = new Date();
    console.log('ss', new Date(date.setDate(date.getDate() -  10)).getDate());
    if(this.nav !== 0) {
      date = new Date(date.setMonth(date.getMonth()+ nav));
    }
    const currentMonth = document.getElementById('currentMonth'); 
    const day = date.getDate();
    const month = date.getMonth();
    this.currentMonth = month;
    const year = date.getFullYear();
    this.currentYear = year;
    const dateString = `${day}/${month+1}/${year}`;
    const firstDayDate = new Date(`01/${month+1}/${year}`);
    (currentMonth != null) ? currentMonth.innerHTML = `${date.toLocaleString('en-US', { month: 'long' })}, ${year}`: '';
    console.log('ness', firstDayDate);
    let currentDay = firstDayDate.toLocaleDateString('en-US', {
      weekday: 'long'
    }); 
    const dayPaddingIndex = this.weekDays.indexOf(currentDay);
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const datesDiv = document.getElementById('dates');
    if(datesDiv != null) {
      datesDiv.innerHTML = '';
    } 
    for(let j=0 ; j < dayPaddingIndex; j++) {
      const element = document.createElement('div');
      element.classList.add('weekdays');
      element.classList.add('padding');
      datesDiv?.appendChild(element);
    }

    for(let j=1; j <= daysInMonth; j++) {
      const element = document.createElement('div');
      element.addEventListener('mouseover', (event) => this.mouseOver(event, j));
      element.addEventListener('mouseout', (event) => this.mouseOut(event, j));
      const para = document.createElement('p');
      const eventsDiv = document.createElement('div');
      para.setAttribute('id', j + 'para');
      para.classList.add('para');
      eventsDiv.setAttribute('id', j + 'date-div');
      eventsDiv.classList.add('eventsDiv');
      para.innerHTML = ''+ j;
      const eventValue = window.localStorage.getItem(`${j}/${month+1}/${year}`);
      //console.log('vvvv',`${j}/${month}/${year}`, eventValue);
      if(eventValue != null) {
        eventsDiv.innerHTML = eventValue;
        
      element.classList.add('eventOne');
      }
      element.appendChild(para);
      element.appendChild(eventsDiv);
      element.classList.add('weekdays');
      datesDiv?.appendChild(element);
    }
    console.log('date', day, month, year, daysInMonth, dateString, currentDay, dayPaddingIndex);
  }


  calendarClicked(event:any) {
   
    if(event.target.innerHTML !== '') {
      const dateStr = `${event.target.innerHTML}/${this.currentMonth + 1}/${this.currentYear}`;
      
    }
  }

  navigateToPreviousMonth(event: any) {
    this.nav--;
    this.onLoad(this.nav);
  }

  navigateToNextMonth(event: any) {
    this.nav++;
    this.onLoad(this.nav);
  }

  addPlan(event: any) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        height: '600px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != null) {
          window.location.reload();
        }
        console.log(`Dialog result: ${result}`);
      });
  }

  mouseOver(event:any, index: any) {
    const paraId =  index + 'para';
    const dateDivId =  index + 'date-div';
    const paraElement = document.getElementById(paraId);
    const dateElement = document.getElementById(dateDivId);
    if((dateElement != null)&&(dateElement.innerHTML === '')) {
      return;
    }
    if(paraElement != null) {
      paraElement.style.display = 'none';
    }

    if(dateElement != null) {
      dateElement.style.display = 'block';
    }
    console.log('out', event, index, paraElement, dateElement);
  }

  mouseOut(event: any, index: any) {
    const paraId =  index + 'para';
    const dateDivId =  index + 'date-div';
    const paraElement = document.getElementById(paraId);
    const dateElement = document.getElementById(dateDivId);
    if((dateElement != null)&&(dateElement.innerHTML === '')) {
      return;
    }
    if(paraElement != null) {
      paraElement.style.display = 'block';
    }

    if(dateElement != null) {
      dateElement.style.display = 'none';
    }
    console.log('out', event, index, paraElement, dateElement);
  }
}
