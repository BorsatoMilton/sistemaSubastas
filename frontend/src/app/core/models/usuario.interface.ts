export interface Usuario {
    id: string;
    usuario: string;
    clave: string;
    nombre: string;
    apellido: string;
    mail: string;
    direccion: string;
    tarjeta?: string;
    calificacion?: string;
    pedido?: string;
}