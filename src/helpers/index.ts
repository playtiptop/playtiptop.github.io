const RFC4648 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

export function base32Encode(data: ArrayBuffer): string {

    const view = new DataView(data)

    let bits = 0
    let value = 0
    let output = ''

    for (let i = 0; i < view.byteLength; i++) {
        value = (value << 8) | view.getUint8(i)
        bits += 8

        while (bits >= 5) {
            output += RFC4648[(value >>> (bits - 5)) & 31]
            bits -= 5
        }
    }

    if (bits > 0) {
        output += RFC4648[(value << (5 - bits)) & 31]
    }

    return output
}

export function base32Decode(input: string): ArrayBuffer {

    var length = input.length

    var bits = 0
    var value = 0

    var index = 0
    var output = new Uint8Array((length * 5 / 8) | 0)

    for (var i = 0; i < length; i++) {
        value = (value << 5) | RFC4648.indexOf(input[i])
        bits += 5

        if (bits >= 8) {
            output[index++] = (value >>> (bits - 8)) & 255
            bits -= 8
        }
    }

    return output.buffer
}

export function shuffle(array: number[]): number[] {
    let currentIndex = array.length;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }
    return array
}

function shiftRight(array: number[], pos: number): number[] {
    let tmp = array.concat(array)
    return tmp.slice(pos, pos + array.length)
}

function shiftLeft(array: number[], pos: number): number[] {
    let tmp = array.concat(array)
    return tmp.slice(array.length - pos, 2 * array.length - pos)
}

export function enc(arr: number[]): string {
    console.log(arr)
    let missing = arr.pop()!
    let st3 = shiftRight(arr, missing)
    let x = parseInt(st3.join(""))
    console.log("int:", x)
    let ba = Buffer.alloc(4)
    ba.writeUInt32BE(x)
    return base32Encode(ba.buffer)
}

export function dec(text: string): number[] {
    let b = base32Decode(text)
    let bb = Buffer.from(b)
    let tmp = bb.readUInt32BE(0)
    let items = tmp.toString().split("").map(x => parseInt(x))
    let missing = items.length * (items.length + 1) / 2
    items.forEach((element) => {
        missing -= element
    })
    if (missing != 0 && !(0 in items)) {
        items = [0].concat(items)
    }
    items = shiftLeft(items, missing)
    console.log("missing:", missing)
    items.push(missing)
    return items
}
