export type Content = {
  id: string; 
  titulo: string;
  director: string;
  anio: number;
  genero: string;
  rating: number;
  tipo: 'pelicula' | 'serie';
  imagen?: string;
};
