import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';

export interface Deseo {
    id: number;
    status: string;
    Titulo: string;
    descripcion: string;
    imagen: string; // UUID
}

export interface Regalo {
    id: number;
    status: string;
    titulo: string;
    descripcion: string;
    precio: string;
    imagenuuid: string;
    deseo_relacionado: number; // FK to Deseo
}

interface Schema {
    deseo: Deseo[];
    regalos: Regalo[];
}

const directusUrl = process.env.DIRECTUS_URL || 'https://hoztlat-regalos.6vlrrp.easypanel.host';
const directusToken = process.env.DIRECTUS_TOKEN || '8CzN175Z3ibcoDZQRnD3v86AkZAcoaeh';

export const directus = createDirectus<Schema>(directusUrl)
    .with(staticToken(directusToken))
    .with(rest());

export const getImageUrl = (fileId: string) => {
    if (!fileId) return '/placeholder.png';
    return `${directusUrl}/assets/${fileId}`;
};
