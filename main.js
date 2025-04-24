const colorChoice = document.getElementById("color-choice");
const schemeChoice = document.getElementById("scheme-choice");
const generateButton = document.getElementById("input-button");


function updateColorBlock(elementIdPrefix, colorName, hexCode) {
    
    const block = document.getElementById(elementIdPrefix);
    console.log("Element to update:", block);

    if (block) {
        block.style.backgroundColor = hexCode;

        const nameText = document.getElementById(`${elementIdPrefix}-text`);
        nameText.textContent = colorName;

        const hexText = document.getElementById(`${elementIdPrefix}-hex`);
        hexText.textContent = hexCode;
    } else {
        console.error(`Element with id ${elementIdPrefix} not found.`);
    }
}


generateButton.addEventListener("click", () => {
    const hex = colorChoice.value.substring(1);
    const scheme = schemeChoice.value;

    const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${scheme}&count=4`;

    fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log("API Response:", data);

        if (data.colors && data.colors.length > 0) {
            const mainColorName = data.seed.name.value;
            updateColorBlock("selected-color", mainColorName, `#${hex}`);

            const colors = data.colors;

            for (let i = 0; i < 4; i++) {
                const color = colors[i];
                updateColorBlock(
                    `output-color${i + 1}`,
                    color.name.value,
                    color.hex.value
                );
            }
        } else {
            console.error("No colors in the response:", data);
            alert("Something went wrong, please try again.");
        }
    })
    .catch(error => {
        console.error("Error fetching color scheme:", error);
        alert("There was an issue fetching the color scheme. Please try again.");
    });
});
