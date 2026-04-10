export class Vacation {

    constructor(
        public destination: string,
        public description: string,
        public startDate: string,
        public endDate: string,
        public cost : number,
        public imageName?: string,
        public id?: number
        ) { }
    // public destination: string;
    // public description: string;
    // public startDate: string;
    // public endDate: string;
    // public cost: number;
    // public image?: string;
    // public id?: number;
    // constructor(vacation: Vacation) {
    //     this.destination = vacation.destination;
    //     this.description = vacation.description;
    //     this.startDate = vacation.startDate;
    //     this.endDate = vacation.endDate;
    //     this.cost = vacation.cost;
    //     this.image = vacation.image;
    //     this.id = vacation.id;
    // }
}