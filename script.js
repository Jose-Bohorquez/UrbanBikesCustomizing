document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bikeCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const img = new Image();
    const maskImg = new Image();

    // Ruta de tu imagen de bicicleta
    img.src = 'ruta/a/tu/imagen-de-bicicleta.png'; // Cambia esto por la ruta de tu imagen

    // Ruta de tu máscara
    maskImg.src = 'ruta/a/tu/mascara.png'; // Cambia esto por la ruta de tu máscara

    img.onload = () => {
        maskImg.onload = () => {
            // Dibuja la imagen y la máscara en el canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
        };
    };

    // Función para aplicar color usando una máscara
    function applyColorWithMask(color) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const maskData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const mask = maskData.data;

        // Aplicar color a las áreas blancas de la máscara
        for (let i = 0; i < data.length; i += 4) {
            // Si el píxel en la máscara es blanco
            if (mask[i] > 200 && mask[i + 1] > 200 && mask[i + 2] > 200) {
                // Cambia los valores de los píxeles a la selección de color del usuario
                data[i] = parseInt(color.substr(1, 2), 16); // Rojo
                data[i + 1] = parseInt(color.substr(3, 2), 16); // Verde
                data[i + 2] = parseInt(color.substr(5, 2), 16); // Azul
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Añadir el evento al colorPicker
    colorPicker.addEventListener('input', (event) => {
        const color = event.target.value;
        applyColorWithMask(color);
    });
});
