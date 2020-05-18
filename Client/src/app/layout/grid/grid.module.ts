import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, GridRoutingModule, NgbModule, PageHeaderModule, FormsModule],
    declarations: [GridComponent]
})
export class GridModule {}
