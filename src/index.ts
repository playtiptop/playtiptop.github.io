import base32Decode from "base32-decode";
import base32Encode from "base32-encode";

document.getElementById("app")!.innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>`;

function shuffle(array: number[]): number[] {
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


function main() {
  console.log("Hello!")
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
  return base32Encode(ba, 'RFC4648', {padding: false})
}

export function dec(text: string): number[] {
  let b = base32Decode(text, 'RFC4648')
  let bb = Buffer.from(b)
  let tmp = bb.readUInt32BE(0)
  let items = tmp.toString().split("").map(x => parseInt(x))
  let missing = 9 * 10 / 2;
  items.forEach((element) => {
    missing -= element;
  });
  if (missing != 0 && 0 !in items) {
    items = [0].concat(items)
  }
  items = shiftLeft(items, missing)
  console.log("missing:", missing)
  items.push(missing)
  return items
}


if (window.location.pathname === "/") {
  document.addEventListener('DOMContentLoaded', function (event) {

    let arr = [...Array(10).keys()] // .map(x => x+1)
    console.log("BEFORE", arr)
    arr = shuffle(arr)
    console.log("BEFORE", arr)
    console.log()
      
    let e = enc(arr)
    let link = window.location.origin + "/" + e
    document.getElementById("mylink")!.innerHTML = `<a href=\"${link}\">${link}</a>`
    this.getElementById("mybutton")!.onclick = function () {
      navigator.clipboard.writeText(link)
    }

  })
  
} else {
  let tmp = window.location.pathname.substring(1)
  let items = dec(tmp)
  document.getElementById("app")!.innerHTML = items.join("|")

}



document.addEventListener('DOMContentLoaded', function (event) {

  let arr = [...Array(10).keys()] // .map(x => x+1)
  console.log("BEFORE", arr)
  arr = shuffle(arr)
  console.log("BEFORE", arr)
  console.log()
    
  let e = enc(arr)

  console.log("ENCODE", "https://fdsa.fdas/" + e)

  let items = dec(e)

  console.log("DECODE", items)
})
