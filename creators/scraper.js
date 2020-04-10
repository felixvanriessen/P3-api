const axios = require('axios')
const cheerio = require('cheerio')



// const urlToScrape = "https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=10&page=3&cy=NL&priceto=20000&pricefrom=1000&atype=C&"
// const urlX = `https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=${size}&page=${page}&cy=NL&priceto=${priceto}&pricefrom=${pricefrom}&atype=C&`


function fixKM(nkm) {
   let km = 0
   let kmcopy = nkm.filter(el=>{
      if (el.match(/[0-9]/)) return true
   })
   km = kmcopy.join('')
   return Number(km)
}

function fixPrice(nprice) {
   let price = nprice.filter(p=>{
      if (p.match(/[0-9]/)) return true
   })
   finalprice = Number(price.join(''))
   return finalprice
}


function scrapeCars(page, priceto, pricefrom){
return (
   axios.get(`https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=20&page=${page}&cy=NL&priceto=${priceto}&pricefrom=${pricefrom}&atype=C&`)
   .then(response=> {
      let $ = cheerio.load(response.data)

      let details = []

      let names = $('h2.cldt-summary-makemodel').map((i,el)=>{
         return $(el).text()
      }).get()

      let prices = []
      $('span.cldt-price').each((i,el)=>{
         prices.push($(el).text())
      })

      $('div.cldt-summary-vehicle-data ul').each((i,el)=>{
         let $km = $(el).children()[0]
         let $yr = $(el).children()[1]
         let km = $($km).text()
         let yr = $($yr).text()
         
         km = km.split('').splice(1,7).join('')

         details.push([
            km,
            yr.split('').splice(4,4).join('')
         ])
      })

      let data = []
      if (names.length > 0){
         for (let n = 0; n < 20; n++){
            let nprice = fixPrice(prices[n].split(''))
            let nkm = [...details[n][0].split('')]
            let nkm2 = fixKM(nkm)
            let nyr = Number(details[n][1])
            let obj = {
               name:names[n],
               price:nprice,
               km:nkm2,
               year:nyr,
               image:''
            }
            data.push(obj)
         }
         
      }
      return data
   })
   .catch(err=>console.log(err))
)
}

console.log(scrapeCars(1,500,2000))




// const fs = require('fs'),jsondata=JSON.stringify(details)
// fs.writeFile('../cardata.json', jsondata, function(err){
//    if (err) console.log(err)
// })

module.exports = scrapeCars