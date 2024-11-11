# Sistema de Carga y Validación de Datos con Autenticación

Sistema backend que permite a usuarios autenticados con rol de administrador cargar y validar datos desde archivos CSV a una base de datos PostgreSQL.

## 🚀 Demo

- API URL: [https://your-api-url.com](https://your-api-url.com)
- Documentación API: [https://your-api-url.com/docs](https://your-api-url.com/docs)

## 🛠️ Tecnologías Utilizadas

- **Backend**: Express.js
- **Base de Datos**: PostgreSQL
- **Autenticación**: JSON Web Tokens (JWT)
- **Testing**: Vitest

## 📋 Prerequisitos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
```

4. Configurar la base de datos
```bash
# Crear la base de datos
npx sequelize-cli db:create

# Ejecutar migraciones
npx sequelize-cli db:migrate

# Ejecutar seeds (crear usuario admin)
npx sequelize-cli db:seed:all
```

## 🚀 Ejecutar el Proyecto

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Tests
```bash
npm run test
```

## 📝 Documentación API

### Autenticación

#### POST /login
Autenticación de usuarios mediante email y password.

```json
{
  "email": "admin@example.com",
  "password": "adminpass"
}
```

Respuesta exitosa:
```json
{
  "ok": true,
  "token": "jwt-token"
}
```

### Carga de Datos

#### POST /upload
Endpoint protegido para la carga de archivos CSV. Requiere autenticación con rol de admin.

Headers requeridos:
```
Authorization: Bearer <jwt-token>
```

Body: Form-data con archivo CSV
- Key: `file`
- Value: archivo CSV

Formato esperado del CSV:
```csv
name,email,age
Juan Perez,juan.perez@example.com,28
Maria Garcia,maria.garcia@example.com,35
```

Respuesta exitosa:
```json
{
  "ok": true,
  "data": {
    "success": [
      {
        "id": 1,
        "name": "Juan Perez",
        "email": "juan.perez@example.com",
        "age": 28
      }
    ],
    "errors": [
      {
        "row": 2,
        "details": {
          "email": "El formato del campo 'email' es inválido"
        }
      }
    ]
  }
}
```

## 📊 Estructura de la Base de Datos

### Tabla: users
- `id`: SERIAL PRIMARY KEY
- `name`: VARCHAR(255) NOT NULL
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `age`: INTEGER
- `role`: VARCHAR(10) DEFAULT 'user'

## 🧪 Testing

El proyecto incluye tests unitarios y de integración. Para ejecutar los tests:

```bash
# Ejecutar todos los tests
npm run test

# Ver cobertura de tests
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── config/         # Configuración de la aplicación
│   ├── controllers/    # Controladores
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Modelos de base de datos
│   ├── routes/         # Definición de rutas
│   ├── services/       # Lógica de negocio
│   ├── utils/          # Utilidades y helpers
│   └── app.js          # Punto de entrada de la aplicación
├── tests/              # Tests
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 👥 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
