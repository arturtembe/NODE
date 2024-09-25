//import { Projecto } from "@prisma/client";
import { viewHabilidadeDTO } from "../habilidade/view.habilidade.models";

export interface viewProjectoDTO{
    id:string;
    titulo:string;
    slug:string;
    github:string;
    live:string;
    logotipo:string;
    estado:estadoDTO;
    destaque:boolean;
    desc:string;
    images:string;
    //tecnologia:any;
}

interface estadoDTO{
    em_andamento:boolean;
    concluido:boolean;
    pendente:boolean;
}

export class ProjectoReleaseModel{
    private id!:string;
    private titulo!:string;
    private slug!:string;
    private github!:string;
    private live!:string;
    private logotipo!:string;
    private estado!:estadoDTO;
    private tecnologia!:any;
    private destaque!:boolean;
    private desc!:string;
    private images!:string;

    constructor(data:any){
        this.setID(data?.id);
        this.setTitulo(data?.titulo);
        this.setSlug(data?.slug);
        this.setGithub(data?.github);
        this.setLive(data?.live);
        this.setLogotipo(data?.logotipo);
        this.setEstado(data?.estado);
        this.setTecnologia(data?.projecto_habilidade)
        this.setDestaque(data?.destaque)
        this.setDesc(data?.desc)
        this.setImages(data?.images)
    }

    getAll():viewProjectoDTO{
        return {
            id:this.id,
            titulo: this.titulo,
            slug: this.slug,
            github: this.github,
            live: this.live,
            logotipo: this.logotipo,
            estado: this.estado,
            destaque: this.destaque,
            desc: this.desc,
            images: this.images,
            //tecnologia: this.tecnologia
        }
    }

    getTecnologia(){
        return this.tecnologia;
    }

    // SETs
    private setID(id:string){
        this.id = id;
    }
    private setTitulo(titulo:string){
        this.titulo = titulo;
    }
    private setSlug(slug:string){
        this.slug = slug;
    }
    private setGithub(github:string){
        this.github = github;
    }
    private setLive(live:string){
        this.live = live;
    }
    private setLogotipo(logotipo:string){
        this.logotipo = logotipo;
    }
    private setEstado(estado:string){
        this.estado = {
            em_andamento: estado == "em andamento",
            concluido: estado == "concluido",
            pendente: estado == "pendente"
        };
    }
    private setTecnologia(tecnologia:any){
        this.tecnologia = tecnologia;
    }
    private setDestaque(destaque:boolean){
        this.destaque = destaque;
    }
    private setDesc(desc:string){
        this.desc = desc;
    }
    private setImages(images:string){
        this.images = images;
    }
}