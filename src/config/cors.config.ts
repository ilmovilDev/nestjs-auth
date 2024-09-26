export function corsConfig() {
  return {
    origin: ['https://my-site.com', 'https://another-site.com'], // Lista de orígenes permitidos
    methods: 'GET,POST,PUT,PATCH,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Headers permitidos
    credentials: true, // Permitir envío de cookies
  };
}

