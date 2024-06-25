# pruebaTecnica

Este es un proyecto que contiene dos partes principales: `back` y `front`.

## Backend (`back`)

### Configuración

1. Renombra el archivo `env.local` a `.env` en la carpeta `back` y 'front':

  ```sh
   mv back/env.local back/.env
  ```
  
  ```sh
  #front/.env
   VITE_BACKEND=http://localhost:3000
  ```
  ```sh
  #back/.emv
    DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_DATABASE=mydatabase 

  ```
  ```sh
#back/docker-compose.yml
   version: '3.8'

services:
  postgresql:
    image: postgres:latest
    restart: always
    ports:
      - '5432:5432'
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
  ```

2. Ejecuta docker en el back 
```bash
   docker-compose up --build -d 
```
3. Ejecuta en el front 
```bash
   npm i 
   npm run dev
```
4. Ejecuta en el back 
```bash
   npm i 
   npm run start:dev
```


