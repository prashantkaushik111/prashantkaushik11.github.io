import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private element: ElementRef) { }
  collapse = false;
  ngOnInit(): void {
    console.log(document.getElementById('content'));
  }
 
  collapseSidebar() {
    this.collapse = !this.collapse;
    const sidenav = document.getElementById('sidenav');
    const routePage = document.getElementById('route-page'); 

    if(this.collapse) {
      this.closeSidebar(sidenav, routePage);
    }
    else {
      this.openSideBar(sidenav,routePage);
    }
   
  }
  openSideBar(sidenav: HTMLElement | null, routePage: HTMLElement | null) {
    const paraElements = document.querySelectorAll('.list-content');
    const rightswipe = document.getElementById('right-swipe') as HTMLElement;
    const leftswipe = document.getElementById('left-swipe') as HTMLElement;
    rightswipe.style.display = 'none';
    leftswipe.style.display = 'block';
    if(sidenav) {
      sidenav.style.width = '10%';
    }
    if(routePage) {
      routePage.style.left = '10%';
      routePage.style.width = '90%';
    }
    paraElements.forEach((element)=> {
      const paraEle = element as HTMLElement;
      paraEle.style.display='inline';
    });
  }

  closeSidebar(sidenav: HTMLElement | null, routePage: HTMLElement | null) {
    const paraElements = document.querySelectorAll('.list-content');
    const rightswipe = document.getElementById('right-swipe') as HTMLElement;
    const leftswipe = document.getElementById('left-swipe') as HTMLElement;

    rightswipe.style.display = 'block';
    leftswipe.style.display = 'none';
    if(sidenav) {
      sidenav.style.width = '3%';
    }
    if(routePage) {
      routePage.style.left = '3%';
      routePage.style.width = '97%';
    }
    paraElements.forEach((element)=> {
      const paraEle = element as HTMLElement;
      paraEle.style.display='none';
    });
  }

  

}
