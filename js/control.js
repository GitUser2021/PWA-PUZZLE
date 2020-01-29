// pongo todos los status en false.
// luego solo habilito los divs adyacentes al div vacio.
function update_status() {
    disable_blocks()

    // habilito los divs adyacentes al div vacio.
    if (!first_row_index.includes(emptyBlock)) {
        check_block_position(emptyBlock - 1).status = true
    }

    if (!last_row_index.includes(emptyBlock)) {
        check_block_position(emptyBlock + 1).status = true
    }
    check_block_position(emptyBlock - PUZZLE_SIZE).status = true
    check_block_position(emptyBlock + PUZZLE_SIZE).status = true

    // devuelve el bloque que se encuentra en la posision solicitada.
    function check_block_position(position) {
        objArray.forEach(item => {
            if (item.position == position) {
                obj = item
                return
            }
        })
        return obj
    }
}

// al clickear un bloque, se gestiona el cambio de posicion entre el bloque clickeado y el lugar vacio.
function move(div,check_Win = true) {
    let bloque_tocado = window['div' + div].position
    let emptyBlock = window['div' + CANT_BLOQUES].position

    if (window['div' + div].status) {
        window['div' + CANT_BLOQUES].position = bloque_tocado
        window['div' + div].position = emptyBlock

        window['div' + CANT_BLOQUES].Move()
        window['div' + div].Move()
        update_status()
        if(check_Win){checkWin()}
    }
}

function checkWin() {
    for (var i = 1; i < CANT_BLOQUES; i++) {
        if (window['div' + i].position == i) {
            if (i == (CANT_BLOQUES - 1)) {
                console.log('GAME COMPLETE!')
                checkWin.win = true
                var audio = new Audio(SOUND_WIN);
                audio.play();
                disable_blocks()
                window['div' + emptyBlock].bloque.style.display = 'block'
            } else { continue }
        } else { break }
    }
}

// reset total elimina los divs y reseteo las variables.
function reset() {
    if (ref_div_main.children.length != 0) {
        for (let i = 0; i < (CANT_BLOQUES); i++) {
            ref_div_main.children[0].remove()
        }
    }
    blocksPositions = {}
    objArray = []
    first_row_index = []
    last_row_index = []
}

function disable_blocks(){
    emptyBlock = window['div' + CANT_BLOQUES].position
    objArray.forEach(function (item, key) {
        item.status = false
    });
}