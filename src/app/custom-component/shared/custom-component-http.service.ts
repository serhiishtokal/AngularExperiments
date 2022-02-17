
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, firstValueFrom, forkJoin, from, map, mergeMap, Observable, of, tap} from "rxjs";

@Injectable()
export class CustomComponentHttpService {
    private readonly baseUrl = "https://www.boredapi.com/api/activity";

    constructor(private httpClient: HttpClient) {
    }
    counter: number = 0;

    getItemsOneByOneWithRxJs(count: number): Observable<IDto[]> {
          let observable = this.getItem().pipe(map(initItem=>[initItem]));
          for (let index = 0; index < count -1; index++) {
          observable = observable.pipe(mergeMap(items=>{
              return this.getItem().pipe(map(item=>{
                  items.push(item);
                  return items;
              }))
          }));
          }
          return observable;
        }

    getItemsWithAsyncAwait(count: number): Observable<IDto[]> {
        return from(this.getItemsAsync(count));
    }
      
    private async getItemsAsync(count: number){
        const items: IDto[] =[];
        for (let index = 0; index < count; index++) {
            const item = await firstValueFrom(this.getItem());
            items.push(item);
        }
        return items;
    }

    getItemsParallel(count: number){
        const observables: Observable<IDto>[] = [];
        for (let index = 0; index < count; index++) {
            observables.push(this.getItem().pipe(delay(700),tap(console.log)));
        }
        return forkJoin(observables);
    }

    getItem(){
        return this.httpClient.get<IDto>(this.baseUrl);
    }

}

export interface IDto{
    activity: string;
}
