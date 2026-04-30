export class Vacation {

    constructor(
        public destination: string,
        public description: string,
        public startDate: Date,
        public endDate: Date,
        public cost : number,
        public followers: number = 0,
        public imageName?: string,
        public id?: number
        ) { }
}