export class Usuario {
    _id: string;
    name: string;
    lastnames: string;
    email: string;
    birth: Date;
    createUser: Date;
    phone: number;
    rut: string;
    urlImage: string;

    constructor(
        p_id = '',
        pName = '',
        pLastnames = '',
        pEmail = '',
        pBirth = new Date(),
        pCreateUser = new Date(),
        pPhone = 912345678,
        pRut = '',
        pUrlImage = ''
    ){
        this._id = p_id;
        this.name = pName;
        this.lastnames = pLastnames;
        this.email = pEmail;
        this.birth = pBirth;
        this.createUser = pCreateUser;
        this.phone = pPhone;
        this.rut = pRut;
        this.urlImage = pUrlImage;
    }
}