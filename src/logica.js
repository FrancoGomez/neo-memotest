const $tablero = document.querySelector("#tablero");
const $alerta = document.querySelector("#alerta");
const $contador = document.querySelector("#contador");
const $comenzar = document.querySelector("#comenzar");

let coloresCartas = [
  "#7308a5",
  "#0000ff",
  "#ff7f00",
  "#007900",
  "#ffff00",
  "#00ff00",
  "#ba00ff",
  "#feb300",
];
let coloresRepetidos;
let $cartaGuardada = "";
let pares, intentos, tiempoJugando, intervalo;

// Variable definida para testear el juego con cypress
window.coloresRepetidosParaCypress

$comenzar.onclick = () => iniciarJuego();

const iniciarJuego = () => {
  reiniciarEstado();
  manejarRonda();
};

const reiniciarEstado = () => {
  borrarCartas();
  actualizarAlerta('Presiona "Comenzar" para jugar');
  clearInterval(intervalo);
  pares = coloresCartas.length;
  intentos = 0;
  tiempoJugando = 0;
  intervalo = "";
};

const manejarRonda = () => {
  coloresRepetidos = [...devolverColoresMezcaldos(coloresCartas)];
  coloresRepetidosParaCypress = [...coloresRepetidos]
  generarCartas(Number(coloresRepetidos.length));
  iniciarTemporizador();
  desbloquearInput();
};

const borrarCartas = () => {
  const $cartas = document.querySelectorAll("#tablero .carta");
  if ($cartas.length !== 0) {
    $cartas.forEach((carta) => {
      carta.remove();
    });
  }
};

const generarCartas = (cantidad) => {
  for (let i = 0; i < cantidad; i++) {
    const $carta = crearCarta(`carta-${i}`, i);
    $tablero.appendChild($carta);
  }
};

const iniciarTemporizador = () => {
  intervalo = setInterval(() => {
    tiempoJugando++;
    actualizarAlerta(`Tiempo: ${tiempoJugando} segundos`);
  }, 1000);
};

const bloquearInput = () => {
  $tablero.onclick = () => {};
};

const desbloquearInput = () => {
  $tablero.onclick = (e) => manejarClick(e);
};

const actualizarAlerta = (texto) => {
  $alerta.textContent = texto;
};

const devolverColoresMezcaldos = (colores) => {
  coloresRepetidos = colores.concat(colores);
  const arrayAuxiliar = [];

  while (coloresRepetidos.length !== 0) {
    const numeroRandom = obtenerNumeroRandom(coloresRepetidos.length);
    const colorRandom = coloresRepetidos.splice(numeroRandom, 1);
    arrayAuxiliar.push(colorRandom[0]);
  }

  return arrayAuxiliar;
};

const obtenerNumeroRandom = (maximo) => {
  return Math.floor(Math.random() * maximo);
};

const manejarClick = (e) => {
  const $cartaClickeada = e.target;

  if (
    $cartaClickeada.style.backgroundColor === "" ||
    $cartaGuardada.id === $cartaClickeada.id
  )
    return;

  revelarColorCarta($cartaClickeada, obtenerColorCarta($cartaClickeada.id));

  if ($cartaGuardada) bloquearInput();

  setTimeout(() => {
    if ($cartaGuardada === "") {
      $cartaGuardada = $cartaClickeada;
    } else {
      manejarCartasElegidas($cartaClickeada);
      chequearEstadoJuego();
    }

    desbloquearInput();
  }, 300);
};

const revelarColorCarta = ($carta, color) => {
  $carta.style.backgroundColor = color;
};

const manejarCartasElegidas = ($cartaClickeada) => {
  const color$CartaGuardada = obtenerColorCarta($cartaGuardada.id);
  const color$CartaClickeada = obtenerColorCarta($cartaClickeada.id);

  if (color$CartaGuardada === color$CartaClickeada) {
    $cartaGuardada.style.backgroundColor = "";
    $cartaClickeada.style.backgroundColor = "";
    pares--;
  } else {
    $cartaGuardada.style.backgroundColor = "brown";
    $cartaClickeada.style.backgroundColor = "brown";
  }

  $cartaGuardada = "";
  actualizarIntentos();
};

const chequearEstadoJuego = () => {
  if (pares === 0) {
    clearInterval(intervalo);
    actualizarAlerta(
      `Ganaste! Intentos: ${intentos}, tiempo: ${tiempoJugando} segundos.`
    );
  }
};

const actualizarIntentos = () => {
  intentos++;
  $contador.textContent = intentos;
};

const crearCarta = (id) => {
  const $carta = document.createElement("div");
  $carta.setAttribute("id", id);
  $carta.className = "col carta";
  $carta.style.backgroundColor = "brown";

  return $carta;
};

const obtenerColorCarta = (id) => {
  const numeroId = Number(id.replace("carta-", ""));
  return coloresRepetidos[numeroId];
};
