import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CustomerEvent } from '../model/customer-event.model';
import { Item } from '../model/item.model';
import { Pet } from '../model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  private shoppingCart: Item[] = [];
  private events: CustomerEvent[] = [];

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>('assets/data/pets.json')
      .pipe(
        tap(
          (result => console.log('Shop service get pets: ', result))
        )
      );
  }


  addItem(pet: Pet, amount: number) {
   
    let newItem = true;
    this.shoppingCart.forEach((item: Item) => {
      if (item.pet.id == pet.id) {
        item.amount = item.amount + amount;
        newItem = false;
      }
    });
    if (newItem) {
      this.shoppingCart.push(new Item(pet, amount));
    }

    this.newEvent("Adding " + amount + " " + pet.displayName + "(s) to shopping cart");
  }

  getItems(): Item[] {
    return this.shoppingCart;
  }

  cancelOrders() {
    this.shoppingCart = [];
    this.newEvent("Order cancelled!");
  }

  removeCheckedItems(items: Item[]): Item[] {
    this.shoppingCart = [];
    items.forEach((item: Item) => {
    
      if (item.checked === undefined || !item.checked) {

         this.shoppingCart.push(item);
      } else {
        this.newEvent(item.amount + " " + item.pet.displayName + " removed." );
      }
    });
    return this.shoppingCart;
  }

  newEvent(eventType: string) {
    this.events.push(new CustomerEvent(eventType, new Date()));

  }

  showAllEventsInLog() {
    console.log("All Customer Events:");
    console.log("********************");
    this.events.forEach((ev => console.log(ev.toString())));
    console.log("********************");
  }

}
