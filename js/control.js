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

// slide para las imagenes de los puzzles.
function slide(direction) {
    // detecto la imagen que esta al frente.
    // if(getComputedStyle(ref_image_1).zIndex == 1)image = 1
    // if(getComputedStyle(ref_image_2).zIndex == 1)image = 2
    // if(getComputedStyle(ref_image_3).zIndex == 1)image = 3
    get_active_image()

    if (direction == 'left') { // slide left.
        switch (image) {
            case 1:
                image1()
                break

            case 2:
                image2()
                break

            case 3:
                image3()
                break
        }
    } else { // slide right.
        switch (image) {
            case 1:
                image3()
                break

            case 2:
                image1()
                break

            case 3:
                image2()
                break
        }
    }

    function image1() {
        set_image_position(ref_image_1, 1)
        set_image_position(ref_image_2, 2)
        set_image_position(ref_image_3, 3)
    }

    function image2() {
        set_image_position(ref_image_2, 1)
        set_image_position(ref_image_1, 3)
        set_image_position(ref_image_3, 2)
    }

    function image3() {
        set_image_position(ref_image_3, 1)
        set_image_position(ref_image_1, 2)
        set_image_position(ref_image_2, 3)
    }

    function set_image_position(image, position) {
        switch (position) {
            case 1:
                image.style.top = '35vw'
                image.style.left = '8vw'
                image.style.zIndex = '0'
                image.style.width = '40vw'
                break
            case 2:
                image.style.top = '35vw'
                image.style.left = '52vw'
                image.style.zIndex = '0'
                image.style.width = '40vw'
                break
            case 3:
                image.style.top = '20vw'
                image.style.left = '15vw'
                image.style.zIndex = '1'
                image.style.width = '70vw'
                break
        }
    }
}

function get_active_image() {
    // detecto la imagen que esta al frente.
    if (getComputedStyle(ref_image_1).zIndex == 1) { image = 1; return ref_image_1.src }
    if (getComputedStyle(ref_image_2).zIndex == 1) { image = 2; return ref_image_2.src }
    if (getComputedStyle(ref_image_3).zIndex == 1) { image = 3; return ref_image_3.src }
}

// oculta las imagenes de los puzzles.
function hide_puzzles(hide) {
    hide ? display = 'none' : display = 'block'
    ref_image_1.style.display = display
    ref_image_2.style.display = display
    ref_image_3.style.display = display
    ref_left_arrow.style.display = display
    ref_right_arrow.style.display = display
    ref_puzzles.style.display = display
}