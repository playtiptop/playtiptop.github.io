import { base32Decode, base32Encode, shuffle, enc, dec } from "./helpers";

document.getElementById("app")!.innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>`;



if (!window.location.search.startsWith("?q=")) {
  document.addEventListener('DOMContentLoaded', function (event) {

    let arr = [...Array(10).keys()] // .map(x => x+1)
    console.log("BEFORE", arr)
    arr = shuffle(arr)
    console.log("BEFORE", arr)
    console.log()
      
    let e = enc(arr)
    let link = window.location.origin + "?q=" + e
    document.getElementById("mylink")!.innerHTML = `<a href=\"${link}\">${link}</a>`
    this.getElementById("mybutton")!.onclick = function () {
      navigator.clipboard.writeText(link)
    }

  })
  
} else {
  let tmp = window.location.search.substring(3)
  let items = dec(tmp)
  document.getElementById("app")!.innerHTML = items.join(" | ")

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
