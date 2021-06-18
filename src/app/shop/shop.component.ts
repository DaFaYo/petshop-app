import { Component, OnInit } from '@angular/core';
import { Pet } from '../shared/model/pet.model';
import { ShopService } from '../shared/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

	currentPet: Pet | undefined;
	pets: Pet[];

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


  getPet(pet: Pet) {
		this.currentPet = pet;
	}

  addItem(pet: Pet, amount: number = 1) {
    //console.log("Adding " + amount + " " + pet.displayName +  "(s) to shopping cart");
    this.shopService.addItem(pet, amount);
  }


}
