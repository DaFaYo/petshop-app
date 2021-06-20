import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../shared/model/item.model';
import { Pet } from '../shared/model/pet.model';
import { ShopService } from '../shared/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

	currentPet: Pet | undefined;
  currentAmount: number = 1;
	pets: Pet[];
  addingNewItem: boolean = false;

  constructor(private shopService: ShopService) { 
    this.pets = [];
  }

  ngOnInit(): void {

    this.shopService.getPets()
    .subscribe(petData => {
        this.pets = petData;
      },
      err => console.log('FOUT: ', err),
      () => console.log('Getting pets complete'));
  }

  addOrSubtractPet(num: number) {
   this.currentAmount = this.currentAmount + num;
  }

  getPet(pet: Pet) {
    if (this.currentPet !== undefined && this.currentPet.id != pet.id) {
      this.currentAmount = 1;
    }
    this.currentPet = pet;
	}

  addItem(pet: Pet) {
    this.shopService.addItem(pet, this.currentAmount);
    this.addingNewItem = true;
    setTimeout(()=>{                         
      this.addingNewItem = false;
 }, 3000);

  }

}
