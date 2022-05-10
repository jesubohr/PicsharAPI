# PicsharAPI

## Endpoints

- [ ] Endpoint de login con usuario y contraseña
  - Debe generar un JWT de sesión
- [ ] Endpoint de login con JWT token
- [ ] Endpoint de registro de usuario


- [ ] Endpoint de informacion de usuario
  - No debe tener información privada del usuario (contraseña, fecha de cumpleaños)
  - Debe incluir el numero de publicaciones que el usuario ha dado me gusta, calculado on-demand
  - Debe incluir el numero de publicaciones que el usuario ha subido, calculado on-demand
  - Debe incluir el numero de seguidores del usuario, calculado on-demand
  - Debe incluir el numero de seguidos del usuario, calculado on-demand
- [ ] Endpoint de publicaciones que un usuario ha subido
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo
- [ ] Endpoint de publicaciones que un usuario ha dado "me gusta"
  - Solo está permitido si el usuario permite ver sus "me gusta", a menos que sea el usuario mismo
- [ ] Endpoint de publicaciones que un usuario ha guardado
  - Solo está permitido para el usuario mismo
- [ ] Endpoint de usuarios seguidos por un usuario
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo
- [ ] Endpoint de seguidores de un usuario
  - Solo está permitido si el usuario esta siguiendo al usuario, a menos que sea el usuario mismo

- [ ] Endpoint de solicitar seguir a un usuario
  - Solo permitido si el usuario ya no está siguiendo al usuario
- [ ] Endpoint de aceptar o rechazar solicitud de seguir
  - Solo está permitido si el usuario es el que recibe la solicitud


- [ ] Get timeline de un usuario
  - Debe ser paginada


- [ ] Endpoint de crear/subir publicacion
- [ ] Endpoint de informacion de publicacion


- [ ] Endpoint de dar me gusta a una publicación
- [ ] Endpoint de guardar una publicación
- [ ] Endpoint de comentar en una publicación


## Pruebas Unitarias (Jest)

- [ ] Login
  - [ ] Informacion valida
  - [ ] Informacion invalida (usuario no existe)
  - [ ] Informacion invalida (contraseña incorrecta)
- [ ] Registro
  - [ ] Informacion completa
  - [ ] Informacion incompleta


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
