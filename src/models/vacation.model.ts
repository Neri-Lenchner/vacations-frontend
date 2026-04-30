export class Vacation {

    constructor(
        public destination: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public cost : number,
        public imageName?: string,
        public id?: number
        ) { }
}