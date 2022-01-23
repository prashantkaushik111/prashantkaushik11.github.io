import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {
 

  icons: string[] = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
  divBlock: any;
  divIconBlock: any;
  divIcon: any;
  matchedCount = 0;
  moveCount = 0;
  first = -1;
  currentCheck = 0;
  timerId:any;
  startTime: any;
  time = 0;
  constructor(public dialog: MatDialog) {
      this.divBlock = [];
      this.divIconBlock = [];
      this.divIcon = [];
   }
  
  ngOnInit(): void {
    this.shuffleArray();
    this.initializeGame();
  }

  shuffleArray() {
    let currentIndex = this.icons.length;

    while(currentIndex > 0) 
    {
      let randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex--;
      [this.icons[randomIndex], this.icons[currentIndex]] = [this.icons[currentIndex], this.icons[randomIndex]];
    }
  }
  handleClick = (event: any) => {
    const index = parseInt(event.currentTarget.id);
    if((this.currentCheck === 0)){
      if(this.first === -1) {
        this.first = index;
        this.divIconBlock[index].style.visibility = 'visible';
        if(this.moveCount === 0) {
          this.setTimer();
        }
      }
      else if(this.first !== index){
        this.currentCheck = 1;
        this.divIconBlock[index].style.visibility = 'visible';
        this.moveCount += 1;
        (document.getElementById('moves') as HTMLElement).innerHTML = 'Moves :'+this.moveCount; 
        if(this.icons[index] === this.icons[this.first]) {
          this.divBlock[this.first].style.backgroundColor = '#02ccba';
          this.divBlock[index].style.backgroundColor = '#02ccba';
          this.divBlock[this.first].classList.toggle('success');
          this.divBlock[index].classList.toggle('success');
        }
        else {
          this.divBlock[this.first].classList.toggle('failure');
          this.divBlock[index].classList.toggle('failure');
        }
        setTimeout(()=> {
          if(this.icons[index] === this.icons[this.first]) {
            this.matchedCount += 2;
            this.divBlock[index].removeEventListener('click', this.handleClick);
            this.divBlock[this.first].removeEventListener('click', this.handleClick);
            this.divBlock[this.first].classList.toggle('success');
            this.divBlock[index].classList.toggle('success');
            this.first = -1;
            if(this.matchedCount === 16) {
              this.playerWon();
            }
          }
          else {
            this.divIconBlock[this.first].style.visibility = 'hidden';
            this.divIconBlock[index].style.visibility = 'hidden';
            this.divBlock[this.first].classList.toggle('failure');
          this.divBlock[index].classList.toggle('failure');
            this.first = -1;
          }
        this.currentCheck = 0;
        }, 500);
      }
    }
  }
  initializeGame() {
    const gameBlocks = document.getElementById('game-blocks');
    const fragment = document.createDocumentFragment();
    this.icons.forEach((icon, index) => {
        const block = document.createElement('div');
        block.classList.add('blocks');
        const iconBlock = document.createElement('div');
        iconBlock.classList.add('game-icon');
        const icons = document.createElement('i');
        icons.classList.add("fa",icon,"fa-2x");
        icons.setAttribute('aria-hidden', 'true');
        block.setAttribute('id', ''+index);
        iconBlock.setAttribute('id', ''+index);
        iconBlock.appendChild(icons);
        block.appendChild(iconBlock);
        fragment.appendChild(block);
        this.divBlock.push(block as HTMLElement);
        this.divIconBlock.push(iconBlock  as HTMLElement);
        this.divIcon.push(icons as HTMLElement);
        block.addEventListener('click', this.handleClick);
    });
    gameBlocks?.appendChild(fragment);
  }


  refreshTable() {
  this.matchedCount = 0;
  this.moveCount = 0;
  this.first = -1;
  this.divBlock = [];
  this.divIconBlock = [];
  this.divIcon = [];
  this.currentCheck = 0;
  cancelAnimationFrame(this.timerId);
  this.timerId = -1;
  this.time = 0;
  (document.getElementById('time') as HTMLElement).innerHTML = 'Time ' + '0:S';
  (document.getElementById('game-blocks') as HTMLElement).innerHTML = '';
  this.shuffleArray();
    this.initializeGame();
    (document.getElementById('moves') as HTMLElement).innerHTML = 'Moves :'+this.moveCount;
    
  }

  incrementTimer = ()=> {
    const currentTime = new Date().getTime();
    const seconds = Math.floor((currentTime - this.startTime)/1000);
    this.time = seconds;
    (document.getElementById('time') as HTMLElement).innerHTML = 'Time ' + seconds + ':S';
    this.timerId = requestAnimationFrame(this.incrementTimer);
  }
  setTimer() {
    this.startTime = new Date().getTime();
    this.timerId = requestAnimationFrame(this.incrementTimer);
  }

  playerWon() {
    cancelAnimationFrame(this.timerId);
    this.timerId = -1;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '300px',
      data: {
        move: this.moveCount,
        time: this.time
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openInstructions() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        move: this.moveCount
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
