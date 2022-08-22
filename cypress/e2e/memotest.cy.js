context("Memotest", () => {
  const NUMERO_DE_CUADROS = 16;

  describe("Juega al memotest", () => {
    it("Se asegura de que haya un tablero con cartas", () => {
      cy.visit("/");
      cy.get("#comenzar").click();
      cy.get("#tablero .carta");
    });

    it("Se asegura de que las cartas sean aleatorias", () => {
      let coloresCartasPrimerJuego;
      cy.window().then((win) => {
        coloresCartasPrimerJuego = win.coloresRepetidosParaCypress;
      });

      cy.visit("/");
      cy.get("#comenzar").click();

      let coloresCartasSegundoJuego;
      cy.window().then((win) => {
        coloresCartasSegundoJuego = win.coloresRepetidosParaCypress;

        expect(coloresCartasPrimerJuego).to.not.equal(
          coloresCartasSegundoJuego
        );
      });
    });
  });

  describe("Resuelve el juego", () => {
    let mapaDePares, listaDePares;

    it("Elige una combinacion erronea", () => {
      cy.window()
        .then(async (win) => {
          const pares = {};
          let index = 0;

          for await (let color of win.coloresRepetidosParaCypress) {
            if (pares[color]) {
              pares[color].push(`#carta-${index}`);
            } else {
              pares[color] = [`#carta-${index}`];
            }

            index++;
          }

          mapaDePares = pares;
        })
        .then(() => {
          listaDePares = Object.values(mapaDePares);
        })
        .then(() => {
          cy.get(listaDePares[0][0]).click();
          cy.get(listaDePares[1][0]).click();
        });
    });

    it("Elige todas las combinaciones correctas", () => {
      const NUMERO_DE_PARES = NUMERO_DE_CUADROS / 2;
      cy.get(".carta").should("have.length", NUMERO_DE_CUADROS);

      listaDePares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });

      // El "1" equivale al primer intento erroneo.
      // Si bien el texto de la alerta es mas extenso, con esto compruebo que el juego finalizo.
      cy.get("#alerta").contains(`Ganaste! Intentos: ${NUMERO_DE_PARES + 1}`);
    });
  });
});
