const IMAGE = 'url(css/images/tigre.jpeg)'
const SOUND_WIN = 'css/sounds/clap.mp3'
const IMAGE_SIZE = 360
let PUZZLE_SIZE = 3
let CANT_BLOQUES = PUZZLE_SIZE * PUZZLE_SIZE
let blocksPositions = {} // obj para almacenar las posisiones de los bloques.
let objArray = [] // un array con todos los bloques para usar en la funcion update_status()
let ref_div_main = document.getElementById('main')
let last_row_index = []
let first_row_index = []



// funcion para boton New Game.
document.getElementById('btnNewGame').addEventListener('touchstart', () => {
    reset()
    start() 
    setTimeout(() => {
        scramble(500)
    },0);
})

// calcula la cant. de bloques totales.
function cant_bloques(){
     return CANT_BLOQUES = PUZZLE_SIZE * PUZZLE_SIZE
}

document.getElementById('level_size_3').addEventListener('touchstart', () => {
    reset()
    PUZZLE_SIZE = 3
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

document.getElementById('level_size_4').addEventListener('touchstart', () => {
    reset()
    PUZZLE_SIZE = 4
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

document.getElementById('level_size_5').addEventListener('touchstart', () => {
    reset()
    PUZZLE_SIZE = 5
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

document.getElementById('level_size_6').addEventListener('touchstart', () => {
    reset()
    PUZZLE_SIZE = 6
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

