import { viewHabilidadeDTO, viewHabilidadeEDITDTO } from "../habilidade/view.habilidade.models";
import { viewProjectoDTO } from "../projecto/view.projecto.models";

export interface viewProjecto_HabilidadeDTO{
    projecto:viewProjectoDTO
    habilidade:viewHabilidadeEDITDTO[];
}
