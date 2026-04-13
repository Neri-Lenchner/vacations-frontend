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
}