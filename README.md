1. **Clonar el repositorio**

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

2:  **Instalar dependencias**

```bash
npm install
```

3. **Crear .env**
```bash
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5435
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mydatabase
DB_SYNCHRONIZE=true
```

5. **Levantar la base de datos con Docker**
```bash
docker-compose up -d
```

5. **Iniciar la aplicación**
```bash
npm run start:dev
```
