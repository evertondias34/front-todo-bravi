import { Comentario } from "./Comentario";

export class Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  isAtivo: boolean;
  dataPrevista?: Date;
  tempoGasto: number;
  comentarios: Comentario[] = [];

  isPraHoje: boolean;
  isAtrasada: boolean;
  isAgendada: boolean;
  data: string;
}
