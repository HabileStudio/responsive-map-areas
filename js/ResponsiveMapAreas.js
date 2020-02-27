let mapsOriginalCoords = []

const makeResponsive = (mapName) => {
  // take the map
  const map = document.getElementById(mapName)

  const imgMapped = getImage(mapName)
  // original width and height
  const width  = imgMapped.naturalWidth
  const height = imgMapped.naturalHeight


  const dimensions = getDimensions(mapName, width, height)

  const originalImageArea = width * height
  // foreach map we take the areas
  const areas = getAreas(mapName)

  const originalCoords = getAreaCoords(mapName)
  mapsOriginalCoords[mapName] = originalCoords

  let areaCoords = originalCoords

  resizeAreas(originalCoords, areas, dimensions, originalImageArea)

  window.addEventListener('resize', (e) => {
    const dimensions = getDimensions(mapName, width, height)
    resizeAreas(mapsOriginalCoords[mapName], areas, dimensions, originalImageArea)
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

const resizeAreas = (originalCoords, areas, dimensions, originalImageArea) => {
  let areaCoords = []
  originalCoords.forEach( (array, index) => {
    areaCoords[index] = []
    // if shape is a circle, it will have only 3 elements (x,y,radius)
    if(originalCoords[index].length == 3){
      areaCoords[index][0] = originalCoords[index][0] * dimensions.xRatio
      areaCoords[index][1] = originalCoords[index][1] * dimensions.yRatio
      // calculate the original areas
      let circleArea = Math.PI * Math.pow(originalCoords[index][2], 2)
      let photoArea  = originalImageArea
      let newPhotoArea = dimensions.W * dimensions.H
      let photoChangeAreaRatio = newPhotoArea / photoArea
      let newCircleArea = circleArea * photoChangeAreaRatio
      let newCircleRadius = Math.sqrt(newCircleArea / Math.PI)
      areaCoords[index][2] = newCircleRadius
    }
    // else shape is a default | rect | polygon (x,y,x,y,...x,y)
    else {
      array.forEach( (a, i) => {
        // even indexes mean x coordinates (0,1,2,3 <=> x,y,x,y)
        areaCoords[index][i] = (i%2 == 0)
                             ? originalCoords[index][i] * dimensions.xRatio
                             : originalCoords[index][i] * dimensions.yRatio
      })
    }
  })
  areas.forEach( (a, i) => {
    a.coords = areaCoords[i].toString()
  })
}
