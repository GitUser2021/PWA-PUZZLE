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
    check_block_position(emptyBlock - puzzle_size).status = true
    check_block_position(emptyBlock + puzzle_size).status = true

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
function move(div, check_Win = true) {
    let bloque_tocado = window['div' + div].position
    let emptyBlock = window['div' + cant_bloques].position

    if (window['div' + div].status) {
        window['div' + cant_bloques].position = bloque_tocado
        window['div' + div].position = emptyBlock

        window['div' + cant_bloques].Move()
        window['div' + div].Move()
        update_status()
        if (check_Win) { checkWin() }
    }
}

function checkWin() {
    for (var i = 1; i < cant_bloques; i++) {
        if (window['div' + i].position == i) {
            if (i == (cant_bloques - 1)) {
                console.log('GAME COMPLETE!')
                checkWin.win = true
                var audio = new Audio(SOUND_WIN);
                audio.play();
                disable_blocks()
                num = false // reset de la variable.
                document.getElementById('btnHelp').style.display = 'none' // oculto el boton HELP.
                window['div' + emptyBlock].bloque.style.display = 'block'
            } else { continue }
        } else { break }
    }
}

// reset total elimina los divs y reseteo las variables.
function reset() {
    if (ref_div_main.children.length != 0) {
        for (let i = 0; i < (cant_bloques); i++) {
            ref_div_main.children[0].remove()
        }
    }
    blocksPositions = {}
    objArray = []
    first_row_index = []
    last_row_index = []
}

function disable_blocks() {
    emptyBlock = window['div' + cant_bloques].position
    objArray.forEach(function (item, key) {
        item.status = false
    });
}