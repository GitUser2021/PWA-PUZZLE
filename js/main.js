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

// calcula la cant. de bloques totales.
function cant_bloques() {
    return CANT_BLOQUES = PUZZLE_SIZE * PUZZLE_SIZE
}

// mostrar imagen como ayuda.
function show_image(show) {
    if (show) {
        ref_div_main.style.backgroundImage = IMAGE
        ref_div_main.style.backgroundSize = 'cover'
        objArray.forEach(bloque => {
            bloque.bloque.style.display = 'none'
        })
    } else {
        ref_div_main.style.backgroundImage = ''
        objArray.forEach((bloque, key) => {
            if (key == CANT_BLOQUES - 1) {
                bloque.bloque.style.display = 'none'
                return
            }
            bloque.bloque.style.display = 'block'
        }
        )
    }
}

// boton New Game.
document.getElementById('btnNewGame').addEventListener('touchstart', () => {
    reset()
    start()
    setTimeout(() => {
        scramble(500)
    }, 0);
})

// boton Help.
document.getElementById('btnHelp').addEventListener('touchstart', () => {
    show_image(true)
})
document.getElementById('btnHelp').addEventListener('touchend', () => {
    show_image(false)
})



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

