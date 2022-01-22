import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponent } from './dashboard/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemoryGameComponent } from './dashboard/memory-game/memory-game.component';
import { MatDialogRef } from '@angular/material/dialog';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', // child route path
        component: CalendarComponent, // child route component that the router renders
      },
      {
        path: 'calendar',
        pathMatch: 'full',
        component: CalendarComponent,
      },
      {
        path: 'memory',
        pathMatch: 'full',
        component: MemoryGameComponent,
      }
    ]
  }
 
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    CalendarComponent,
    DialogComponent,
    MemoryGameComponent,
   
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
