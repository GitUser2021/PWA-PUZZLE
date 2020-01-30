const IMAGE = 'url(css/images/tigre.jpeg)'
const SOUND_WIN = 'css/sounds/clap.mp3'
let image_size = 360
let puzzle_size = 3
let cant_bloques = puzzle_size * puzzle_size
let blocksPositions = {} // obj para almacenar las posisiones de los bloques.
let objArray = [] // un array con todos los bloques para usar en la funcion update_status()
let ref_div_main = document.getElementById('main')
let last_row_index = []
let first_row_index = []


// el tamaño de la imagen es el tamaño de pantalla.
if (window.screen.orientation.angle == 0) {
    image_size = window.screen.width
} else {
    image_size = window.screen.height
}

// calcula la cant. de bloques totales.
function cant_bloques() {
    return cant_bloques = puzzle_size * puzzle_size
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
            if (key == cant_bloques - 1) {
                bloque.bloque.style.display = 'none'
                return
            }
            bloque.bloque.style.display = 'block'
        })
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

// boton 3x3
document.getElementById('level_size_3').addEventListener('touchstart', () => {
    reset()
    puzzle_size = 3
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

// boton 4x4
document.getElementById('level_size_4').addEventListener('touchstart', () => {
    reset()
    puzzle_size = 4
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

// boton 5x5
document.getElementById('level_size_5').addEventListener('touchstart', () => {
    reset()
    puzzle_size = 5
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

// boton 6x6
document.getElementById('level_size_6').addEventListener('touchstart', () => {
    reset()
    puzzle_size = 6
    cant_bloques()
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
})

