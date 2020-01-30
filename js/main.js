const IMAGE = 'url(css/images/tigre.jpeg)'
const SOUND_WIN = 'css/sounds/clap.mp3'

let image_size = 360
let puzzle_size = 3
let cant_bloques = puzzle_size * puzzle_size

let blocksPositions = {} // obj para almacenar las posisiones de los bloques.
let objArray = [] // un array con todos los bloques para usar en la funcion update_status()
let last_row_index = []
let first_row_index = []

let ref_div_main = document.getElementById('main')
let ref_level_size_3 = document.getElementById('level_size_3')
let ref_level_size_4 = document.getElementById('level_size_4')
let ref_level_size_5 = document.getElementById('level_size_5')
let ref_level_size_6 = document.getElementById('level_size_6')


// el tamaño de la imagen es el tamaño de pantalla.
if (window.screen.orientation.angle == 0) {
    if (window.innerWidth >= 800) {
        image_size = 500
    } else {
        image_size = window.innerWidth
    }
    // image_size = window.screen.width
} else {
    image_size = window.innerHeight
    // image_size = window.screen.height
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
document.getElementById('btnNewGame').addEventListener('click', () => {
    pregunta(puzzle_size, true)
})

// boton Help.
document.getElementById('btnHelp').addEventListener('touchstart', () => {
    show_image(true)
})
document.getElementById('btnHelp').addEventListener('touchend', () => {
    show_image(false)
})

// boton 3x3
document.getElementById('level_size_3').addEventListener('click', () => {
    pregunta(3)
})

// boton 4x4
document.getElementById('level_size_4').addEventListener('click', () => {
    pregunta(4)
})

// boton 5x5
document.getElementById('level_size_5').addEventListener('click', () => {
    pregunta(5)
})

// boton 6x6
document.getElementById('level_size_6').addEventListener('click', () => {
    pregunta(6)
})

// juego nuevo.
function new_game() {
    reset()
    start()
    setTimeout(() => {
        scramble(500)
    }, 0);
}



// seleccion de nivel.
function level(size) {
    dim_level_item(size)
    reset()
    puzzle_size = size
    cant_bloques = puzzle_size * puzzle_size
    start('show') // show para que solo muestre la imagen, y no se creen los bloques y habiliten los movimientos.
}

// dim level option
// cambia el color de los selectores de nivel, menos el clickeado.
function dim_level_item(level) {
    switch (level) {
        case 3:
            ref_level_size_3.style.background = 'salmon'
            ref_level_size_4.style.background = 'gray'
            ref_level_size_5.style.background = 'gray'
            ref_level_size_6.style.background = 'gray'
            break
        case 4:
            ref_level_size_4.style.background = 'salmon'
            ref_level_size_3.style.background = 'gray'
            ref_level_size_5.style.background = 'gray'
            ref_level_size_6.style.background = 'gray'
            break
        case 5:
            ref_level_size_5.style.background = 'salmon'
            ref_level_size_3.style.background = 'gray'
            ref_level_size_4.style.background = 'gray'
            ref_level_size_6.style.background = 'gray'
            break
        case 6:
            ref_level_size_6.style.background = 'salmon'
            ref_level_size_3.style.background = 'gray'
            ref_level_size_4.style.background = 'gray'
            ref_level_size_5.style.background = 'gray'
            break
    }
}

// SweetAlert2 pregunta.
function pregunta(size, newGame = false) {
    // num indica si se jugo previamente, ya que se genera en scramble().
    // si se jugo previamente, realizo la pregunta.
    if (num) {
        Swal.fire({
            title: 'Cancelar juego?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                level(size)
                num = false // reset de la variable.
            }
        })
    } else {
        if (newGame) {
            new_game()
            return
        }
        level(size)
    }
}