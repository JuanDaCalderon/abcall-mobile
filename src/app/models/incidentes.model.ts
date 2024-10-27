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
    public canal: string
  ) {}
}
