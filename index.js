const { exec } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function configurarUsuario() {
  exec(
    'git config --global user.name "BOT-commit"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al configurar el usuario: ${error}`);
        return;
      }
      console.log(`Usuario configurado con éxito: ${stdout}`);
      exec(
        'git config --global user.email "bot@commit.com"',
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              `Error al configurar el correo electrónico: ${error}`
            );
            return;
          }
          console.log(`Correo electrónico configurado con éxito: ${stdout}`);
        }
      );
    }
  );
}

async function agregarRemote(url) {
  exec(`git remote add origin ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al agregar el control remoto: ${error}`);
      return;
    }
    console.log(`Control remoto agregado con éxito: ${stdout}`);
    rl.close();
  });
}

function hacerCommit() {
  rl.question("Ingresa un mensaje para el commit: ", (mensaje) => {
    exec("git add .", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al agregar los cambios: ${error}`);
        return;
      }
      console.log(`Cambios agregados al commit: ${stdout}`);
      exec(`git commit -m "${mensaje}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al hacer el commit: ${error}`);
          return;
        }
        console.log(`Commit realizado con éxito: ${stdout}`);
        rl.close();
      });
    });
  });
}

async function ejecutar() {
  //   await configurarUsuario();
  //   await agregarRemote("https://github.com/maikCyphlock/bot-commit-experiment");
  hacerCommit();
}

ejecutar();

// Escucha el evento de "SIGINT" (Ctrl+C) para cerrar la interfaz de línea de comandos
rl.on("SIGINT", () => {
  rl.close();
});
