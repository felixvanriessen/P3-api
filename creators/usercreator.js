//40 names
let fnames = ['Daan', 'Sem', 'Milan', 'Luuk', 'Lucas', 'Thomas', 'Jesse', 'Finn', 'Ruben', 'Tim', 'Thijs', 'Lars', 'Bram', 'Julian', 'Liam', 'Sven', 'Max', 'Sam', 'Jan', 'Nick', 'Emma', 'Esmee', 'Julia', 'Sophie', 'Lotte', 'Lisa', 'Saar', 'Eva', 'Anna', 'Sanne', 'Sara', 'Tess', 'Roos', 'Anna', 'Femke', 'Noor', 'Naomi', 'Iris', 'Lana', 'Elise']

//32 last names
let lnames = ['De Jong', 'Jansen', 'De Vries', 'Van Dijk', 'Bakker', 'Visser', 'Smit', 'Meijer', 'Klok', 'Gerritsen', 'Verkerk', 'Bouwhuis', 'Zandbergen', 'Verheul', 'Veldkamp', 'Vogels', 'Akkerman', 'Veltman', 'De Groot', 'Bos', 'Peters', 'Hendriks', 'Van Leeuwen', 'Brouwer', 'Dekker', 'Rietveld', 'Schenk', 'Van Buren', 'Van Dalen', 'Verhoeven', 'Waterman', 'Langbroek']


//generate a random phone number
function makeTel(){
   let num = '06'
   let x = Math.floor(Math.random()*100000000).toString()
   return num + x
}

//generate random user obj
function genUser(){
   let f = Math.floor(Math.random()*fnames.length)
   let l = Math.floor(Math.random()*lnames.length)
   let n = makeTel()
   let name = fnames[f] + ' ' + lnames[l]
   let mails = ['@gmail.com', '@yahoomail.com', '@outlook.com', '@ironhack.com', '@hotmail.com', '@protonmail.com']
   let m = Math.floor(Math.random()*mails.length)
   let ln
   if (lnames[l].split(' ').length > 1){
      ln = lnames[l].split(' ')[0][0] + lnames[l].split(' ')[1][0]
   } else {
      ln = lnames[l][0]
   }
   let email = fnames[f] + '_' + ln + mails[m]
   let user = {
      username:name,
      password:'nopassword',
      email: email,
      tel:n
   }
   return user
}

module.exports = genUser



