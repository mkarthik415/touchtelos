export class Car {
    id: string;
    clientName: string;

    constructor(options: any) {
        this.id = options.id;
        this.clientName = options.clientName;
    }
}
