export const customSchemes = {
    random: {h:[0,360], s:[0,100],  l:[0,100]},
    pastel: {h:[0,360], s:[30,50],  l:[80,90]},
    neon:   {h:[0,360], s:[90,100], l:[50,60]},
    earthy: {h:[0,60],  s:[20,40],  l:[30,50]},
    jewel:  {h:[0,360], s:[70,90],  l:[30,50]},
    muted:  {h:[0,360], s:[10,30],  l:[40,60]},
}


function getRandomInt(min,max){
  return Math.floor(Math.random() * (max-min+1))+min
}

export function colorGenerator({h,s,l},count){
  let colorArray = []
for(let i =0;i<count;i++){
const hue = getRandomInt(h[0],h[1])
const saturation = getRandomInt(s[0],s[1])
const light = getRandomInt(l[0],l[1]) 
colorArray.push(`${hue},${saturation}%,${light}%`)
}
return colorArray
}