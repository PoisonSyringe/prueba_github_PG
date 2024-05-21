const autosImportados = require("./autos.js");

let concesionaria = {
   autos: autosImportados,
   buscarAuto: function (patente) {
      return this.autos.find(auto => auto.patente === patente) || null;
   },
   venderAuto: function (patente) {
      this.buscarAuto(patente).vendido = true;
   },
   autosParaLaVenta: function () {
      let disponibles = this.autos.filter(auto => auto.vendido === false)
      return disponibles;
   },
   autosNuevos: function () {
      let chalitos = this.autosParaLaVenta().filter(auto => auto.km < 100)
      return chalitos;
   },
   listaDeVentas: function () {
      let precioVendidos = this.autos.filter(auto => auto.vendido === true).map(auto => auto.precio)
      return precioVendidos;
   },
   totalDeVentas: function () {
      const sumatoria = this.listaDeVentas().reduce((accu, valor) => {
         return accu + valor;
      }, 0);
      return sumatoria;
   },
   puedeComprar: function (auto, persona) {
         if (auto.precio <= persona.capacidadDePagoTotal && auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas) {
            return true;
         } else {
            return false;
         }
   },
   autosQuePuedeComprar: function (persona){
      let catalogo = this.autosParaLaVenta().filter(auto => this.puedeComprar(auto, persona) ? auto : null)
      return catalogo;
   }
};

let juan = [{
   nombre: "Juan",
   capacidadDePagoEnCuotas: 30000,
   capacidadDePagoTotal: 100000000
}]

console.log(concesionaria.buscarAuto("APL123"));
concesionaria.venderAuto("APL123");
console.log(concesionaria.buscarAuto("APL123"));
console.log(`--------aca----------------------`);
console.log(concesionaria.autosParaLaVenta());
console.log(`------------------------------`);
console.log(concesionaria.autosNuevos());
console.log(`------------------------------`);
console.log(concesionaria.listaDeVentas());
console.log(`------------------------------`);
console.log(concesionaria.totalDeVentas());
console.log(`------------------------------`);
console.log(concesionaria.autos);
console.log(`------------------------------`);
concesionaria.puedeComprar(concesionaria.autosNuevos(), juan);
console.log(concesionaria.autos);
console.log(`------------------------------`);
console.log(concesionaria.autosQuePuedeComprar(juan));