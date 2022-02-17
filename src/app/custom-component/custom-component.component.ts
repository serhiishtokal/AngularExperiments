import { Component, OnInit } from '@angular/core';
import { mergeMap, Observable, take } from 'rxjs';
import { CustomComponentHttpService, IDto } from './shared/custom-component-http.service';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss']
})
export class CustomComponentComponent implements OnInit {
  items: IDto[] = [];
  constructor(private customComponentHttpService: CustomComponentHttpService) { }

  ngOnInit(): void {
    this.customComponentHttpService.getItemsWithAsyncAwait(10).pipe(take(1)).subscribe(items=>this.items = items);
    //this.customComponentHttpService.getItemsParallel(10).pipe(take(1)).subscribe(items=>this.items = items);
  }

}
