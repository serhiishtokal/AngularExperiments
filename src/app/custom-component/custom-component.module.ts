import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponentComponent } from './custom-component.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponentHttpService } from './shared/custom-component-http.service';

const routes: Routes = [
  {
      path: '',
      component: CustomComponentComponent,
      pathMatch: 'full'
  },]

@NgModule({
  declarations: [
    
    CustomComponentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [CustomComponentHttpService]
})
export class CustomComponentModule { }
