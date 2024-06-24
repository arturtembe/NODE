
export class FielsValidation{
    
    validSlug(name:string){
        //return name.replaceAll(' ','').toLowerCase().replace(/[^\\w\\s]|_/g,'');
        return `${name.replaceAll(' ','').toLowerCase()}`;
    }

}