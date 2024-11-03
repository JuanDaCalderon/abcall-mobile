import {Usuario} from './usuario.model';

export class Incidente {
  constructor(
    public cliente: Usuario,
    public comentarios: string,
    public correo: string,
    public descripcion: string,
    public direccion: string,
    public estado: string,
    public fechacreacion: string,
    public id: string,
    public prioridad: string,
    public telefono: string,
    public usuario: Usuario,
    public tipo: string,
    public canal: string,
    public gestor: string
  ) {}
}

export interface IncidenteRequest {
  cliente: string;
  usuario: string;
  gestor: string;
  correo: string;
  direccion: string;
  telefono: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  tipo: string;
  comentarios: string;
  id: string;
  canal: string;
  fechacreacion: string;
}
