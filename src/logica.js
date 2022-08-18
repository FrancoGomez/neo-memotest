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

let cartaClickeada = "";

const iniciarJuego = () => {
    generarCartas(Number(coloresCartas.length));
};

const generarCartas = (cantidad) => {
    mezclarColores();

    for (let i = 0; i < cantidad; i++) {
        const $carta = crearCarta(`carta-${i}`, i);
        $tablero.appendChild($carta);
    }
};

const crearCarta = (id, indice) => {
    const $carta = document.createElement("div");
    $carta.setAttribute("id", id);
    $carta.className = "col carta h-25";
    $carta.style.backgroundColor = coloresCartas[indice];

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

iniciarJuego();
