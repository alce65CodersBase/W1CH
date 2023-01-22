# Week 1 - Challenge 1

## Git & GitHub

En este ejercicio vas a crear un nuevo proyecto que albergará uno de tus ejercicios del pre-curso (elige el que quieras, a poder ser alguno que tenga más de un archivo)

- Crea una nueva carpeta para el nuevo proyecto, y abre esta carpeta en el Code.
- Inicializa un proyecto con npm
- En la nueva carpeta, inicializa un **repositorio Git**.
- En la carpeta con el package.json, crea los **archivos iniciales** necesarios: .editorconfig, .gitignore y un readme.md inicial.
- Crea un **commit** con estos archivos (`Initial commit`) en la rama main.

- Crea un repositorio en tu cuenta de **GitHub**. El repo debe llamarse `202205-W1CH1-tunombre-tuapellido` (p.e., `202205-W1CH1-pepe-perez`), Si quieres puedes hacer que la carpeta local tenga este mismo nombre, pero no es necesario.
- **Vincula** el repositorio local con el repositorio remoto de GitHub tal como te indican allí. De esta forma subes la rama master al repositorio remoto.

- Crea un nuevo site en **Netlify** y añádele un vínculo con el repo que has creado en GitHub para que se despliegue (deploy) automáticamente. Éste será tu entorno de producción.

Como aun **no se conocen las PR**, aprendemos a mergear una rama directamente a la master

- Añade al menos uno de los **ejercicios del pre-curso**, a ser posible de los que incluyen HTML
- En tu repo local, crea una **rama** auxiliar llamada feature/exercise-files y vete a ella.
- Añade los archivos de tu ejercicio.
- Crea un commit con todos los archivos.
- **Mergea** el trabajo de la rama auxiliar en la rama principal y borra la auxiliar.
- Sube los cambios de master al repo y comprueba que se han desplegado los cambios a producción. Comprueba también si la web se ve bien en ese entorno.
