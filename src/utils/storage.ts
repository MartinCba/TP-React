// Este es el objeto storage que va a contener los métodos para guardar, obtener y eliminar datos del localStorage
export const storage = {
  // Método para obtener un valor almacenado, parseado como tipo genérico T
    get<T>(key: string): T | null {
      // Obtenemos el valor desde localStorage usando la clave
      const item = localStorage.getItem(key);
      // Si existe, lo convierte de JSON a objeto y lo retorna, si no, devuelve null
      return item ? JSON.parse(item) : null;
    },
  
    // Método para guardar un valor en localStorage
    set<T>(key: string, value: T): void {
      // Convierte el valor a JSON y lo guarda con la clave proporcionada
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    // Método para eliminar un ítem específico de localStorage por clave
    remove(key: string): void {
      localStorage.removeItem(key);
    },
  
    // Método para limpiar por completo el localStorage
    clear(): void {
      localStorage.clear();
    },
  };
  