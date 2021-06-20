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
  discountCouponUsed: boolean = false;


  constructor(private shopService: ShopService) {
    this.shoppingCart = [];
   }

  ngOnInit(): void {

    this.shoppingCart = this.shopService.getItems();
    this.calculateNewPrice();
    this.shopService.showAllEventsInLog()

  }

  calculateNewPrice() {
    this.totalPrice = 0;
    this.shoppingCart.forEach((item: Item) => 
       this.totalPrice = this.totalPrice + (item.amount * item.pet.price)
    );
  }

  removeCheckedItems() {
    this.shoppingCart = this.shopService.removeCheckedItems(this.shoppingCart);
    this.calculateNewPrice();
  }


  cancel() {
    this.shopService.cancelOrders();
    this.shoppingCart = this.shopService.getItems();
  }

  confirm() {
    alert('Your items will be send to you as soon as possible!');
    this.shopService.showAllEventsInLog();
  }

  checkAllCheckBoxes(event: any) {
    this.shoppingCart.forEach((item: Item) => item.checked = event.target.checked)
  }
  
  isAllItemsChecked(): boolean {
    return this.shoppingCart.every((item: Item) => item.checked);
  }

  discount() {
    if (!this.discountCouponUsed) {
      this.totalPrice = this.totalPrice * 0.9;
    }
    this.discountCouponUsed = true;

  }

}
