
export interface dataEditedProjectoDTO{
    titulo:string;
    slug:string;
    github:string;
    live:string;
    estado:string;
    destaque:boolean;
    desc:string;
}

export interface editedProjectoDTO{
    id: string,
    titulo:string;
    slug:string;
    github:string;
    live:string;
    logotipo:string;
    estado:string;
    destaque:boolean;
    desc:string;
    created_at: Date,
    updated_at: Date
}