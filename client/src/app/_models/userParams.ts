import { User } from "./user";
//created this model in order to store our params and not passing them all the time
export class UserParams{
    gender:string;
    minAge = 18;
    maxAge=99;
    pageNumber =1;
    pageSize=5;
    orderBy = 'lastActive';
    


    constructor(user: User){
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}