context("Memotest", () => {
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
    let mapaDePares, listadoDePares;

    it("Elige una combinacion erronea", () => {});

    it("Elige todas las combinaciones correctas", () => {});
  });
});
