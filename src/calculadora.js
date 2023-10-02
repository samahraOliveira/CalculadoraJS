'use strict'

//Variável display sendo chamada pelo ID lá do HTML
const display = document.getElementById('display')

//QUery select pra chamar os elementos
// *= para ver se pelo menor parte do id tem o nome "tecla"
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

let novoNumero = true
let operador
let numeroAnterior

//-------------ativando teclado---------------
const mapaTeclado = {
    '0'                : 'tecla0',
    '1'                : 'tecla1',
    '2'                : 'tecla2',
    '3'                : 'tecla3',
    '4'                : 'tecla4',
    '5'                : 'tecla5',
    '6'                : 'tecla6',
    '7'                : 'tecla7',
    '8'                : 'tecla8',
    '9'                : 'tecla9',
    'c'                : 'limparDisplay',
    'Enter'            : 'igual',
    '='                : 'igual',
    'Backspace'        : 'backspace',
    'Escape'           : 'limparCalculo',
    ','                : 'decimal',
    '/'                : 'operadorDividir',
    '*'                : 'operadorMultiplicar',
    '+'                : 'operadorAdicionar',
    '-'                : 'operadorMultiplicar'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
}
document.addEventListener('keydown', mapearTeclado)

//--------------------------------------------

const operacaoPendente = () => operador != undefined

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))
        novoNumero = true
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR')
        novoNumero = false
    } else {
        display.textContent += texto.toLocaleString('BR')
    }
}

// ------------------- ATIVANDO BOTÕES -----------------------------------

//inserir numeros ----------------------------------------------------
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

//selecionar operadores-------------------------------------------------
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        numeroAnterior= parseFloat(display.textContent.replace(',','.'))
        console.log (operador)
    }
}
//ativando o igual--------------------------------------------------------
const ativarIgual = () => {
    calcular()
    operador = undefined
}

//limpando o display----------------------------------------------------
const limparDisplay = () => display.textContent = ''

//limpando o calculo-----------------------------------------------------
const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}

//chamando o backspace---------------------------------------------------
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)

// inverter-------------------------------------------------------------
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent * -1)
}

// chamando decimal------------------------------------------------------------
const existeDecimal = () => display.textContent.indexOf(',') != -1
const existeValor = () => display.textContent.length > 0
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor()) {
            atualizarDisplay(',')
        } else {
            atualizarDisplay('0,')
        }

    }
}

// ------------- CHAMANDO OS BOTÕES ---------

//criando evento para cada numero----------------------------------------
numeros.forEach(numero => numero.addEventListener ('click', inserirNumero))

//criando evento para operadores----------------------------------------
operadores.forEach(operador => operador.addEventListener ('click', selecionarOperador))

// operando o igual------------------------------------------------------
document.getElementById('igual').addEventListener('click', ativarIgual)

//apagar o display (ce)-------------------------------------------------
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

//limpar calculo (c)---------------------------------------------------
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

// backspace <<--------------------------------------------------------
document.getElementById('backspace').addEventListener('click', removerUltimoNumero)

// chamando o +- ---------------------------------------------------
document.getElementById('inverter').addEventListener('click', inverterSinal)

// vírgula--------------------------------------------------------------------
document.getElementById('decimal').addEventListener('click', inserirDecimal)

