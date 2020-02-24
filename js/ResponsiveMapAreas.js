let mapsOriginalCoords = []

const makeResponsive = (mapName, width, height) => {
  // take the map
  const map = document.getElementById(mapName)

  const imgMapped = getImage(mapName)
  const dimensions = getDimensions(mapName, width, height)

  // foreach map we take the areas
  const areas = getAreas(mapName)

  const originalCoords = getAreaCoords(mapName)
  mapsOriginalCoords[mapName] = originalCoords

  let areaCoords = originalCoords

  resizeAreas(areaCoords, areas, dimensions)

  window.addEventListener('resize', (e) => {
    const dimensions = getDimensions(mapName, width, height)
    resizeAreas(mapsOriginalCoords[mapName], areas, dimensions)
  })
}

const getImage = (mapName) => Array.from(document.getElementsByTagName('img')).filter( img => img.useMap == '#'+mapName)[0]

const getDimensions = (mapName, width, height) => {
  const imgMapped = getImage(mapName)
  // get the image width
  const W = imgMapped.offsetWidth
  const H = imgMapped.offsetHeight
  const xRatio = W / width
  const yRatio = H / height
  return ({
    W: W,
    H: H,
    xRatio: xRatio,
    yRatio: yRatio,
  })
}

const getAreas = (mapName) => {
  // take the map
  const map = document.getElementById(mapName)
  // we return the areas from the map
  return Array.from(map.getElementsByTagName('area'))
}

const getAreaCoords = (mapName) => {
  let areaCoords = []
  let areas = getAreas(mapName)
  // and we put the coordinates in an array
  areas.forEach( a => {
    const coords = a.coords
    let coordsArray = coords.split(',')
    areaCoords.push(coordsArray)
  })
  return areaCoords
}

const resizeAreas = (originalCoords, areas, dimensions) => {
  let areaCoords = []
  originalCoords.forEach( (array, index) => {
    areaCoords[index] = []
    array.map( (a, i) => {
      // if even it's an x coord
      if(i%2 == 0){
        areaCoords[index][i] = originalCoords[index][i] * dimensions.xRatio
      } else {
        areaCoords[index][i] = originalCoords[index][i] * dimensions.yRatio
      }
    })
  })

  areas.forEach( (a, i) => {
    a.coords = areaCoords[i].toString()
  })
}
