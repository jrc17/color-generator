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
  testcolor(color, scheme);
});
