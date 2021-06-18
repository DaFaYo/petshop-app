import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Item } from '../model/item.model';
import { Pet } from '../model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  

  private shoppingCart: Item[] = [];

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
    console.log("Adding " + amount + " " + pet.displayName +  "(s) to shopping cart");
    this.shoppingCart.push(new Item(pet, amount));  
  }

  getItems(): Item[] {
    this.shoppingCart.forEach((item:Item) => {
      console.log(item.pet.displayName);
    })
    return this.shoppingCart;
  }

  cancelOrders() {
    this.shoppingCart = [];
    }

}
