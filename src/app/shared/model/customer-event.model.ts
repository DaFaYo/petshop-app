export class CustomerEvent {
    constructor(
        public eventType: string,
        public dateTime: Date
    ) { }

    toString(): string {
        return "Event: " + this.eventType + " DateTime: " + this.dateTime;
    }
}
