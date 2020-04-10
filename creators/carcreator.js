
const genCar = (userList, carList) => {
   let cars = carList.map(car => {
      let i = Math.floor(Math.random()*userList.length)
      let user = userList[i]
      let mycar = {...car}
      mycar.owner = user._id
      return mycar
   })
   return cars
}

module.exports = genCar