
export class DateHelpers{

    getDate(date:string) {
        return `${this.getDay(date)}-${this.getMonth(date)}-${this.getFullYear(date)}`
    }

    private getDay(date:string){
        let day:number = new Date(`${date}`).getDay();

        return day<10? `0${day}`:`${day}`;
    }

    private getMonth(date:string){
        let month:number = new Date(`${date}`).getMonth();

        return month<10? `0${month}`:`${month}`;
    }

    private getFullYear(date:string){
        let fullYear:number = new Date(`${date}`).getFullYear();

        return `${fullYear}`;
    }

}