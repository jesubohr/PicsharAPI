# Picshar
Backend para un clon de Twitter + Instagram.

## Endpoints

- [x] Endpoint de login con usuario y contraseña
  - Debe generar un JWT de sesión
  - Metodo: POST
  - Ruta: '/users/login'
  - Body: { username, password }
  - Response: { token }
- [x] Endpoint de login con JWT token
  - Metodo: POST
  - Ruta: '/users/login'
  - Body: { token }
  - Response: {}
- [x] Endpoint de registro de usuario
  - Debe generar un JWT de sesión
  - Metodo: POST
  - Ruta: '/users/'
  - Body: { username, password, email, birthdate, bio }
  - Response: { token }


- [ ] Endpoint de informacion de usuario
  - No debe tener información privada del usuario (contraseña, fecha de cumpleaños)
  - Debe incluir el numero de publicaciones que el usuario ha dado me gusta, calculado on-demand
  - Debe incluir el numero de publicaciones que el usuario ha subido, calculado on-demand
  - Debe incluir el numero de seguidores del usuario, calculado on-demand
  - Debe incluir el numero de seguidos del usuario, calculado on-demand
  - Metodo: GET
  - Ruta: '/users/'
  - Query: { user_id }
  - Response: { username, email, bio, liked_count, posts_count, followers_count, followed_count }
- [ ] Endpoint de publicaciones que un usuario ha subido
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo
  - Metodo: GET
  - Ruta: '/posts/'
  - Query: { author }
  - Response: { posts }
- [ ] Endpoint de publicaciones que un usuario ha dado "me gusta"
  - Solo está permitido si el usuario permite ver sus "me gusta", a menos que sea el usuario mismo
  - Metodo: GET
  - Ruta: '/posts/liked-by'
  - Query: { user_id }
  - Response: { posts }
- [ ] Endpoint de publicaciones que un usuario ha guardado
  - Solo está permitido para el usuario mismo
  - Metodo: GET
  - Ruta: '/posts/saved-by'
  - Query: { user_id }
  - Response: { posts }
- [ ] Endpoint de usuarios seguidos por un usuario
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo
  - Metodo: GET
  - Ruta: '/follows/following'
  - Query: { user_id }
  - Response: { users }
- [ ] Endpoint de seguidores de un usuario
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo
  - Metodo: GET
  - Ruta: '/follows/followers'
  - Query: { user_id }
  - Response: { users }

- [ ] Endpoint de solicitar seguir a un usuario
  - Solo permitido si el usuario ya no está siguiendo al usuario
  - Metodo: POST
  - Ruta: '/follows/request'
  - Body: { user_id }
  - Response: {}
- [ ] Endpoint de aceptar o rechazar solicitud de seguir
  - Solo está permitido si el usuario es el que recibe la solicitud
  - Metodo: POST
  - Ruta: '/follows/response'
  - Body: { request_id, action }
  - Response: {}
  - El campo 'action' corresponde a la string 'accept' o 'reject'.


- [ ] Get timeline de un usuario
  - Debe ser paginada
  - Metodo: GET
  - Ruta: '/posts/timeline'
  - Body: { user_id }
  - Response: { posts }


- [ ] Endpoint de crear/subir publicacion
  - Metodo: POST
  - Ruta: '/posts/'
  - Body: { img_url, bio, author }
  - Response: {  }
- [ ] Endpoint de informacion de publicacion
  - Debe incluir el numero de likes de la publicacion, calculado on-demand
  - Debe incluir los comentarios de la publicacion, calculado on-demand
  - Metodo: GET
  - Ruta: '/posts/'
  - Body: { post_id }
  - Response: { img_url, bio, author, likes, comments }


- [ ] Endpoint de dar me gusta a una publicación
  - Metodo: POST
  - Ruta: '/posts/like'
  - Body: { post_id }
  - Response: {  }
- [ ] Endpoint de guardar una publicación
  - Metodo: POST
  - Ruta: '/posts/save'
  - Body: { post_id }
  - Response: {  }
- [ ] Endpoint de comentar en una publicación
  - Metodo: POST
  - Ruta: '/posts/'
  - Body: { post_id, comment }
  - Response: {  }


## Pruebas Unitarias (Jest)

- [x] Login
  - [x] Informacion valida
  - [x] Informacion invalida (usuario no existe)
  - [x] Informacion invalida (contraseña incorrecta)
- [x] Registro
  - [x] Informacion completa
  - [x] Informacion incompleta


- [ ] Informacion de Usuario
  - [ ] Contraseña y fecha de cumpleaños no incluida en el response
  - [ ] Numero de publicaciones del usuario refleja el numero correcto
  - [ ] Numero de publicaciones que le gustan al usuario refleja el numero correcto
  - [ ] Numero de seguidores refleja el numero correcto
  - [ ] Numero de seguidos refleja el numero correcto


- [ ] Lista de seguidores de un usuario
- [ ] Lista de seguidos de un usuario
- [ ] Solicitar seguir
- [ ] Aceptar solicitud
  - [ ] Aceptar solicitud previamente aceptada o rechazada
- [ ] Rechazar solicitud
  - [ ] Rechazar solicitud previamente aceptada o rechazada


- [ ] Dar me gusta a publicacion
- [ ] Publicaciones "gustadas" por un usuario
- [ ] Guardar publicacion
- [ ] Publicaciones guardadas por un usuario
- [ ] Comentar publicacion
- [ ] Comentarios de una publicacion
