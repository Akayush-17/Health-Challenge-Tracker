import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersComponent } from './components/users/users.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ProgressChartComponent } from './components/progress-chart/progress-chart.component';
import { initialData } from './app.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTabsModule,
    AddUserComponent,
    UsersComponent,
    ProgressChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'health-hustle';

  @ViewChild('usersComponent') usersComponent!: UsersComponent;
  @ViewChild('progressChartComponent')
  progressChartComponent!: ProgressChartComponent;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify(initialData));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.usersComponent) this.usersComponent.loadUsers();
        if (this.progressChartComponent)
          this.progressChartComponent.loadUsers();
      }
    });
  }

  onUserAdded() {
    if (this.progressChartComponent) {
      this.progressChartComponent.onUserAdded();
    }
  }
}
