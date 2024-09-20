const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colores para la consola
const colores = {
  reset: "\x1b[0m",
  rojo: "\x1b[31m",
  verde: "\x1b[32m",
  amarillo: "\x1b[33m",
  azul: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  blanco: "\x1b[37m",
  fondoNegro: "\x1b[40m",
  fondoBlanco: "\x1b[47m"
};

// Mensajes con estilo
const mensajes = {
  bienvenido: `${colores.azul}********** ${colores.magenta}🚀 BIENVENIDO AL PROGRAMA 🚀 ${colores.azul}**********${colores.reset}`,
  despedida: `${colores.verde}🎉 ¡Gracias por usar el programa! 🎉${colores.reset}`,
  errorNumero: `${colores.rojo}❌ Por favor, introduce solo números válidos.${colores.reset}`,
  opcionNoValida: `${colores.amarillo}⚠️ Opción no válida. Inténtalo de nuevo.${colores.reset}`
};

// Ejercicio 1: Factorial
function factorial(numero) {
  if (numero <= 1) {
    return 1;
  } else {
    return numero * factorial(numero - 1);
  }
}

// Ejercicio 2: Fibonacci
function Fibonacci(numero, fibonacciSecuencia = [0, 1]) {
  if (numero <= 0) {
    throw new Error("Por favor, ingresa un número mayor a 0.");
  }

  const siguienteNumero = fibonacciSecuencia[fibonacciSecuencia.length - 1] + fibonacciSecuencia[fibonacciSecuencia.length - 2];

  if (siguienteNumero <= numero) {
    fibonacciSecuencia.push(siguienteNumero);
    return Fibonacci(numero, fibonacciSecuencia);
  }

  return fibonacciSecuencia.join(", ");
}

// Ejercicio 3: Máximo Común Divisor (MCD)
function calcularMCD(numero1, numero2) {
  if (numero2 === 0) {
    return numero1;
  } else {
    return calcularMCD(numero2, numero1 % numero2);
  }
}

// Ejercicio 4: Cajero para calcular cambio mínimo
const denominacionesDescripcion = [
  { valor: 10000, descripcion: "100 pesos" },
  { valor: 5000, descripcion: "50 pesos" },
  { valor: 2000, descripcion: "20 pesos" },
  { valor: 1000, descripcion: "10 pesos" },
  { valor: 500, descripcion: "5 pesos" },
  { valor: 200, descripcion: "2 pesos" },
  { valor: 100, descripcion: "1 peso" },
  { valor: 50, descripcion: "50 centavos" },
  { valor: 20, descripcion: "20 centavos" },
  { valor: 10, descripcion: "10 centavos" },
  { valor: 5, descripcion: "5 centavos" },
  { valor: 1, descripcion: "1 centavo" }
];

class CajeroAutomatico {
  constructor(denominaciones) {
    this.denominaciones = denominaciones;
    this.cambio = [];

    for (const denominacion of this.denominaciones) {
      this.cambio.push({ denominacion: denominacion.descripcion, cantidad: 0 });
    }
  }

  calcularCambio(compra, pago) {
    const monto = Math.round((pago - compra) * 100); // Se maneja en centavos para precisión
    if (monto < 0) {
      return "El pago es insuficiente para cubrir la compra.";
    }

    this.calcularCambioRecursivo(monto, 0);
    return monto;
  }

  calcularCambioRecursivo(monto, indiceDenominacion) {
    if (monto === 0) {  
      return;
    }

    const denominacionActual = this.denominaciones[indiceDenominacion];

    if (monto >= denominacionActual.valor) {
      const cantidadMonedas = Math.floor(monto / denominacionActual.valor);
      this.cambio[indiceDenominacion].cantidad += cantidadMonedas;
      monto -= cantidadMonedas * denominacionActual.valor;
    }

    this.calcularCambioRecursivo(monto, indiceDenominacion + 1);
  }

  // Imprimir tabla de cambio con colores
  imprimirTablaCambio() {
    let tabla = `\n${colores.cyan}╔═════════════════════╦═══════════════╗${colores.reset}\n`;
    tabla += `${colores.cyan}║${colores.reset} ${colores.magenta}Denominación        ${colores.reset}${colores.cyan}║${colores.reset} ${colores.magenta}Cantidad      ${colores.reset}${colores.cyan}║${colores.reset}\n`;
    tabla += `${colores.cyan}╠═════════════════════╬═══════════════╣${colores.reset}\n`;

    this.cambio.forEach(item => {
      if (item.cantidad > 0) {
        tabla += `${colores.cyan}║${colores.reset} ${colores.verde}${item.denominacion.padEnd(19)}${colores.reset} ${colores.cyan}║${colores.reset} ${colores.amarillo}${item.cantidad.toString().padStart(12)}${colores.reset} ${colores.cyan}║${colores.reset}\n`;
      }
    });

    tabla += `${colores.cyan}╚═════════════════════╩═══════════════╝${colores.reset}\n`;
    return tabla;
  }

  mostrarCambioTexto(montoCentavos) {
    const pesos = Math.floor(montoCentavos / 100);
    const centavos = montoCentavos % 100;
    if (centavos === 0) {
      return `${pesos} pesos exactos`;
    } else {
      return `${pesos} pesos con ${centavos} centavos`;
    }
  }
}

// Ejercicio 5: Torre de Hanoi
let movimientosTorreHanoi = 0;

function torreHanoi(numDiscos, origen, auxiliar, destino) {
  if (numDiscos > 8) {
    console.log(`${colores.rojo}⚠️ El número máximo de discos es 8. Por favor, ingresa un número válido de discos.${colores.reset}`);
    return;
  }

  if (numDiscos === 1) {
    console.log(`Mover disco 1 de ${origen} a ${destino}`);
    movimientosTorreHanoi++;
    return;
  }

  torreHanoi(numDiscos - 1, origen, destino, auxiliar);
  console.log(`Mover disco ${numDiscos} de ${origen} a ${destino}`);
  movimientosTorreHanoi++;
  torreHanoi(numDiscos - 1, auxiliar, origen, destino);
}

// Ejercicio 6: Dibujar árbol de Navidad con recursividad
function dibujarArbolConNiveles(nivelActual, totalNiveles) {
  if (nivelActual > totalNiveles) {
    return;
  }

  // Espacios en blanco antes de las estrellas para centrar el árbol
  const espacio = " ".repeat(totalNiveles - nivelActual);
  const estrellas = "⭐".repeat(nivelActual); // Exactamente "nivelActual" estrellas por nivel

  // Mostrar el nivel actual y las estrellas correspondientes
  console.log(`${espacio}${colores.amarillo}${estrellas}${colores.reset}`);

  // Llamada recursiva al siguiente nivel
  dibujarArbolConNiveles(nivelActual + 1, totalNiveles);
}

function dibujarBaseArbol(niveles) {
  // Espacios en blanco para centrar la base del árbol
  const espacioBase = " ".repeat(niveles - 1);
  const base = `${espacioBase}${colores.cyan}|||${colores.reset}`;
  console.log(base);
  console.log(base); // Imprimir dos veces para hacer la base más visible
}

// Menú principal con diseño visual
function menuPrincipal() {
  console.log(mensajes.bienvenido);
  console.log(`${colores.cyan}Elija una opción:${colores.reset}`);
  console.log(`${colores.amarillo}1️⃣  ${colores.reset}Calcular factorial`);
  console.log(`${colores.amarillo}2️⃣  ${colores.reset}Generar secuencia de Fibonacci`);
  console.log(`${colores.amarillo}3️⃣  ${colores.reset}Resolver Torre de Hanoi`);
  console.log(`${colores.amarillo}4️⃣  ${colores.reset}Calcular el MCD de dos números`);
  console.log(`${colores.amarillo}5️⃣  ${colores.reset}Calcular cambio mínimo (monedas)`);
  console.log(`${colores.amarillo}6️⃣  ${colores.reset}Dibujar árbol de Navidad`);
  console.log(`${colores.amarillo}7️⃣  ${colores.reset}Salir`);

  rl.question("🔢 Ingrese el número de la opción que desea (1/2/3/4/5/6/7): ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("📊 Ingrese un número para calcular su factorial: ", (numero) => {
          const num = parseInt(numero);
          if (isNaN(num) || num < 0) {
            console.log(mensajes.errorNumero);
            menuPrincipal();
          } else {
            console.log(`El factorial de ${num} es: ${factorial(num)}`);
            menuPrincipal();
          }
        });
        break;

      case "2":
        rl.question("📊 Ingrese el número límite para la secuencia Fibonacci: ", (numero) => {
          const num = parseInt(numero);
          if (isNaN(num) || num <= 0) {
            console.log(mensajes.errorNumero);
            menuPrincipal();
          } else {
            console.log(`La secuencia de Fibonacci hasta ${num} es: ${Fibonacci(num)}`);
            menuPrincipal();
          }
        });
        break;

      case "3":
        rl.question("📊 Ingrese el número de discos para la Torre de Hanoi (máximo 8): ", (numDiscos) => {
          const num = parseInt(numDiscos);
          if (isNaN(num) || num <= 0 || num > 8) {
            console.log(mensajes.errorNumero);
            menuPrincipal();
          } else {
            movimientosTorreHanoi = 0;
            torreHanoi(num, "A", "B", "C");
            console.log(`Número total de movimientos: ${movimientosTorreHanoi}`);
            menuPrincipal();
          }
        });
        break;

      case "4":
        rl.question("📊 Ingrese el primer número: ", (numero1) => {
          rl.question("📊 Ingrese el segundo número: ", (numero2) => {
            const num1 = parseInt(numero1);
            const num2 = parseInt(numero2);
            if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0) {
              console.log(mensajes.errorNumero);
              menuPrincipal();
            } else {
              console.log(`El MCD de ${num1} y ${num2} es: ${calcularMCD(num1, num2)}`);
              menuPrincipal();
            }
          });
        });
        break;

      case "5":
        rl.question("📊 Ingrese el monto de la compra: ", (compra) => {
          rl.question("📊 Ingrese el monto de pago: ", (pago) => {
            const montoCompra = parseFloat(compra);
            const montoPago = parseFloat(pago);
            if (isNaN(montoCompra) || isNaN(montoPago) || montoCompra <= 0 || montoPago <= 0) {
              console.log(mensajes.errorNumero);
              menuPrincipal();
            } else {
              const cajero = new CajeroAutomatico(denominacionesDescripcion);
              const cambio = cajero.calcularCambio(montoCompra, montoPago);
              console.log(`Cambio total: ${cajero.mostrarCambioTexto(cambio)}`);
              console.log(cajero.imprimirTablaCambio());
              menuPrincipal();
            }
          });
        });
        break;

      case "6":
        rl.question("Ingrese el número de niveles para el árbol de Navidad (solo números enteros): ", (niveles) => {
          const numNiveles = parseInt(niveles);
          if (isNaN(numNiveles) || numNiveles <= 0 || !Number.isInteger(numNiveles)) {
            console.log(mensajes.errorNumero);
            menuPrincipal();
          } else {
            console.log("Árbol de Navidad:");
            dibujarArbolConNiveles(1, numNiveles);
            dibujarBaseArbol(numNiveles);
            menuPrincipal();
          }
        });
        break;

      case "7":
        console.log(mensajes.despedida);
        rl.close();
        break;

      default:
        console.log(mensajes.opcionNoValida);
        menuPrincipal();
    }
  });
}

// Iniciar el programa
menuPrincipal();
