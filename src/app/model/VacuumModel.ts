export class VacuumModel{
    id : number;
    status : string;
    addedBy : number;
    active : boolean;
    name : string;
    dateCreate : string;

    constructor(data : any){
        this.id = data.id;
        this.status = data.status;
        this.addedBy = data.addedBy;
        this.active = data.active;
        this.name = data.name;
        this.dateCreate = data.dateCreate;
    }
}