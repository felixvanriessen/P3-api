const axios = require('axios')
const cheerio = require('cheerio')



// const urlToScrape = "https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=10&page=3&cy=NL&priceto=20000&pricefrom=1000&atype=C&"
// const urlX = `https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=${size}&page=${page}&cy=NL&priceto=${priceto}&pricefrom=${pricefrom}&atype=C&`

//format KM correctly
function fixKM(nkm) {
   let km = 0
   let kmcopy = nkm.filter(el=>{
      if (el.match(/[0-9]/)) return true
   })
   km = kmcopy.join('')
   return Number(km)
}

//format price correctly
function fixPrice(nprice) {
   let price = nprice.filter(p=>{
      if (p.match(/[0-9]/)) return true
   })
   finalprice = Number(price.join(''))
   return finalprice
}

//scrape and return 20 cars from autoscout24.nl with 'page', 'priceto' and 'pricefrom'
function scrapeCars(page, priceto, pricefrom){
return (
   axios.get(`https://www.autoscout24.nl/lst/?sort=age&desc=1&offer=J%2CU%2CO%2CD&ustate=N%2CU&size=20&page=${page}&cy=NL&priceto=${priceto}&pricefrom=${pricefrom}&atype=C&`)
   .then(response=> {
      //site data given to cheerio
      let $ = cheerio.load(response.data)

      //get car images
      let imgs = []
      for (let n = 0; n < 20; n++){
         let c1 = $('.cldt-summary-gallery')[n]
         let c2 = $(c1).children()[0]
         let c3 = $(c2).children()[0]
         let c4 = $(c3).children().last()
         let img = $(c4).attr('data-src')
         imgs.push(img)
      }

      //get car names
      let names = $('h2.cldt-summary-makemodel').map((i,el)=>{
         return $(el).text()
      }).get()

      //get car prices
      let prices = []
      $('span.cldt-price').each((i,el)=>{
         prices.push($(el).text())
      })

      //get car year and km
      let details = []
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

      //makes car objects from collected info above
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
               image:imgs[n]
            }
            data.push(obj)
         }
         
      }
      return data
   })
   .catch(err=>console.log(err))
)
}
// let x = scrapeCars(1,500,20000)

module.exports = scrapeCars