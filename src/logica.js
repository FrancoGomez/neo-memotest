const $tablero = document.querySelector("#tablero");

let coloresCartas = [
    "#7308a5",
    "#0000ff",
    "#ff7f00",
    "#007900",
    "#ffff00",
    "#00ff00",
    "#ba00ff",
    "#feb300",
    "#7308a5",
    "#0000ff",
    "#ff7f00",
    "#007900",
    "#ffff00",
    "#00ff00",
    "#ba00ff",
    "#feb300",
];
let $cartaGuardada = "";
let pares = coloresCartas.length / 2;
let intentos = 0;

const iniciarJuego = () => {
    generarCartas(Number(coloresCartas.length));
    desbloquearInput();
};

const manejarClick = (e) => {
    const $cartaClickeada = e.target;

    if ($cartaClickeada.style.backgroundColor === "") {
        return;
    }

    revelarColorCarta($cartaClickeada, obtenerColorCarta($cartaClickeada.id));
    bloquearInput();

    setTimeout(() => {
        if ($cartaGuardada === "") {
            $cartaGuardada = $cartaClickeada;
        } else {
            manejarCartasElegidas($cartaClickeada);
            chequearEstadoJuego();
        }
        desbloquearInput();
    }, 400);
};

const revelarColorCarta = ($carta, color) => {
    $carta.style.backgroundColor = color;
};

const bloquearInput = () => {
    $tablero.onclick = () => {};
};

const desbloquearInput = () => {
    $tablero.onclick = (e) => manejarClick(e);
};

const manejarCartasElegidas = ($cartaClickeada) => {
    if ($cartaGuardada.id !== $cartaClickeada.id) {
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
    }
};

const chequearEstadoJuego = () => {
    if (pares === 0) {
        console.log("Ganaste");
    }
};

const actualizarIntentos = () => {
    intentos++;
    console.log("Intentos: ", intentos);
};

const generarCartas = (cantidad) => {
    mezclarColores();

    for (let i = 0; i < cantidad; i++) {
        const $carta = crearCarta(`carta-${i}`, i);
        $tablero.appendChild($carta);
    }
};

const crearCarta = (id) => {
    const $carta = document.createElement("div");
    $carta.setAttribute("id", id);
    $carta.className = "col carta";
    $carta.style.backgroundColor = "brown";

    return $carta;
};

const mezclarColores = () => {
    const arrayAuxiliar = [];

    while (coloresCartas.length !== 0) {
        const numeroRandom = obtenerNumeroRandom(coloresCartas.length);
        const colorRandom = coloresCartas.splice(numeroRandom, 1);
        arrayAuxiliar.push(colorRandom[0]);
    }

    coloresCartas = [...arrayAuxiliar];
};

const obtenerNumeroRandom = (maximo) => {
    return Math.floor(Math.random() * maximo);
};

const obtenerColorCarta = (id) => {
    const numeroId = Number(id.replace("carta-", ""));
    return coloresCartas[numeroId];
};

iniciarJuego();
