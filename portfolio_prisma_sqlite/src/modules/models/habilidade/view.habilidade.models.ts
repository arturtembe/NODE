
export interface viewHabilidadeDTO{
    id:string;
    tecnologia:string;
    slug:string;
    destaque:boolean;
}

export interface viewHabilidadeEDITDTO{
    id:string;
    tecnologia:string;
    slug:string;
    destaque:boolean;
    active:boolean;
}

export class HabilidadeReleaseModel{
    private id!:string;
    private tecnologia!:string;
    private slug!:string;
    private destaque!:boolean;
    private active:boolean = false;

    getAll():viewHabilidadeDTO{
        return {
            id:this.id,
            tecnologia:this.tecnologia,
            slug: this.slug,
            destaque: this.destaque
        }
    }

    getAllEDIT():viewHabilidadeEDITDTO{
        return {
            id:this.id,
            tecnologia:this.tecnologia,
            slug: this.slug,
            destaque: this.destaque,
            active: this.active
        }
    }

    // SETs
    setID(id:string){
        this.id = id;
    }
    setTecnologia(tecnologia:string){
        this.tecnologia = tecnologia;
    }
    setSlug(slug:string){
        this.slug = slug;
    }
    setDestaque(destaque:boolean){
        this.destaque = destaque;
    }
    setActive(habilidade:any){
        habilidade.forEach((el:any)=>{
            
            if(el.habilidade.id === this.id){
                this.active = true;
            }
            
        });
    }
}