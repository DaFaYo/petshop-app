import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/model/item.model';
import { ShopService } from '../shared/services/shop.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Item[] ;
  totalPrice: number = 0;


  constructor(private shopService: ShopService) {
    this.shoppingCart = [];
   }

  ngOnInit(): void {

    this.shoppingCart = this.shopService.getItems();

  }

  removeCheckedItems() {
    this.shoppingCart = this.shopService.removeCheckedItems(this.shoppingCart);
  }


  cancel() {
    this.shopService.cancelOrders();
    this.shoppingCart = this.shopService.getItems();
  }

  confirm() {
    alert('Your items will be send to you as soon as possible!');
  }

  checkAllCheckBoxes(event: any) {
    this.shoppingCart.forEach((item: Item) => item.checked = event.target.checked)
  }
  
  isAllItemsChecked(): boolean {
    return this.shoppingCart.every((item: Item) => item.checked);
  }

}
