const colorForm = document.getElementById("color-form");
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("color-scheme");
const colorContainer = document.getElementById("color-container");

async function testcolor(color, scheme) {
  const res = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`
  );
  const data = await res.json();
  console.log(data);
  console.log(data.colors);
  data.colors.forEach((colorData) => {
    colorContainer.innerHTML += `
    <div>
    <img src=${colorData.image.bare}>
    <p>${colorData.hex.value}</p>
    
    </div>`;
  });
}

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const color = colorPicker.value.slice(1);
  const scheme = colorScheme.value;
  colorContainer.innerHTML = "";
  if(scheme==="random"){
    colorGenerator({h:[0,360],s:[0,100],l:[0,100]})
  }
  else if(scheme==="pastel"){
    colorGenerator({h:[0,360],s:[30,50],l:[80,90]})
  }
  else if(scheme==="neon"){
    colorGenerator({h:[0,360],s:[90,100],l:[50,60]})
  }
  else if(scheme==="earthy"){
    colorGenerator({h:[0,360],s:[20,40],l:[30,50]})
  }
  else if(scheme==="jewel"){
    colorGenerator({h:[0,360],s:[70,90],l:[30,50]})
  }
  else if(scheme==="muted"){
    colorGenerator({h:[0,360],s:[10,30],l:[40,60]})
  }
  
  else{

    testcolor(color, scheme);
  }

  
});


function getRandomInt(min,max){
  return Math.floor(Math.random() * (max-min+1))+min
}



function HSLToHex({ h, s, l }) {
  const hDecimal = l / 100;
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// generate random colors
function colorGenerator({h,s,l}){
for(let i =0;i<5;i++){
const hue = getRandomInt(h[0],h[1])
const saturation = getRandomInt(s[0],s[1])
const light = getRandomInt(l[0],l[1])

colorContainer.innerHTML += `
    <div style="width:100%;">
    <div style="height:100%;background-color:hsl(${hue},${saturation}%,${light}%)"></div>
    <p>${HSLToHex({ h:hue, s:saturation, l:light })}</p>
    </div>`;
 
}
}
