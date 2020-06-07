import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatListModule, RouterModule],
  declarations: [SideNavComponent],
  exports: [SideNavComponent],
})
export class AdminUINavigationModule {}
