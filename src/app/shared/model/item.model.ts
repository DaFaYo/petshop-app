import { Pet } from "./pet.model";

export class Item {
    constructor(
		public pet: Pet,
		public amount: number
        ) {}
}
