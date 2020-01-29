function start(show) {

    // guardo los indices de las columnas.
    for (let i = 1, x = 1; i < (PUZZLE_SIZE * 2); i++ , x += PUZZLE_SIZE) {
        if (i <= PUZZLE_SIZE) {
            last_row_index.push(PUZZLE_SIZE * i)
        }
        if (x <= CANT_BLOQUES) {
            first_row_index.push(x)
        }
    }

    // creo los divs (bloques)
    for (let i = 1; i < (CANT_BLOQUES + 1); i++) {
        window['div_' + i] = document.createElement('div')
        window['div_' + i].id = i
        window['div_' + i].style.width = IMAGE_SIZE / PUZZLE_SIZE + 'px'
        window['div_' + i].style.height = IMAGE_SIZE / PUZZLE_SIZE + 'px'
        window['div_' + i].style.backgroundImage = IMAGE
        window['div_' + i].style.backgroundSize = IMAGE_SIZE + 'px'
        ref_div_main.appendChild(window['div_' + i])
    }
    //-----------------------------------------
    // posisiono los divs en orden
    for (let a = 0, b = 1; a < PUZZLE_SIZE; a++ , b++) {
        for (let i = (PUZZLE_SIZE * a), x = 0; i < (PUZZLE_SIZE * b); i++ , x++) {
            let top = IMAGE_SIZE / PUZZLE_SIZE * a * 1
            let left = IMAGE_SIZE / PUZZLE_SIZE * x * 1
            push_into_object(top, left)
        }
    }
    //-----------------------------------------

    // agrego y posisiono la imagen a los divs
    for (let a = 0, b = 1; a < PUZZLE_SIZE; a++ , b++) {
        for (let i = (PUZZLE_SIZE * a), x = 0; i < (PUZZLE_SIZE * b); i++ , x++) {
            ref_div_main.children[i].style.backgroundPositionX = IMAGE_SIZE / PUZZLE_SIZE * x * -1 + 'px'
            ref_div_main.children[i].style.backgroundPositionY = IMAGE_SIZE / PUZZLE_SIZE * a * -1 + 'px'
        }
    }
    //-----------------------------------------
    function push_into_object(top, left) {
        if (typeof (i) === 'undefined') { i = 1 }
        blocksPositions[i] = { top: top, left: left }
        i++
    }

    // constructor de bloque.
    function Bloque() {
        this.bloque = null,        // referencia al objeto.
            this.status = false,   // status true habilita el movimiento.
            this.position = null,  // indica la posicion de los bloques.
            // posiciona el bloque en el lugar correspondiente a position.
            this.Move = () => {
                this.bloque.style.top = blocksPositions[this.position].top + 'px'
                this.bloque.style.left = blocksPositions[this.position].left + 'px'
            }
    }


    // creo los bloques.
    for (var i = 1; i < (CANT_BLOQUES + 1); i++) {
        window['div' + i] = new Bloque
        window['div' + i].bloque = document.getElementById(i)   // aplico un div a cada nuevo bloque.
        window['div' + i].position = i // aplico las posiciones por orden del primero al ultimo.
        objArray.push(window['div' + i])
    }

    ref_div_main.children[CANT_BLOQUES - 1].style.display = 'none'

    // agrego los addEventListener a los todos los bloques MENOS AL bloque vacio.
    for (var i = 1; i < CANT_BLOQUES; i++) {
        document.getElementById(i).addEventListener('touchstart', function (e) {
            move(e.target.id)
        })
    }

    // coloca los bloques en sus posiciones iniciales.
    function init() {
        for (var i = 1; i < (CANT_BLOQUES + 1); i++) {
            window['div' + i].Move()
        }
        // actualizar los status
        update_status(window['div' + objArray.length].position)
    }

    init()
    if(show){
        disable_blocks()
        window['div' + CANT_BLOQUES].bloque.style.display = 'block'
    }
}
// inicializa todos los bloques (imagen completa),
// pero dejando todos deshabilitados para que no se puedan mover.
start('show')
