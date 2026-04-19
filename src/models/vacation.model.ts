export class Vacation {

    constructor(
        public destination: string,
        public description: string,
        public startDate: string,
        public endDate: string,
        public cost : number,
        public followers: number = 0,
        public imageName?: string,
        public id?: number
        ) { }
}