<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descargar Videos o Audios de YouTube</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
        }
    </style>
</head>
<body class="bg-pink-100 min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-pink-600 mb-4 text-center">Descargar Videos o Audios de YouTube</h1>
        <form id="downloadForm" class="space-y-4">
            <div>
                <label for="inputType" class="block text-pink-600 font-semibold mb-2">Selecciona el tipo de descarga:</label>
                <select id="inputType" class="w-full p-2 border border-pink-300 rounded">
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                </select>
            </div>
            <div>
                <label for="inputLink" class="block text-pink-600 font-semibold mb-2">Enlace del video:</label>
                <input type="text" id="inputLink" class="w-full p-2 border border-pink-300 rounded" placeholder="Introduce el enlace del video">
            </div>
            <button type="submit" class="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition duration-300">Descargar</button>
        </form>
        <div id="result" class="mt-4 hidden">
            <h2 class="text-xl font-bold text-pink-600 mb-2">Resultado:</h2>
            <p id="resultMessage" class="text-pink-600"></p>
        </div>
    </div>

    <script>
        document.getElementById('downloadForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputType = document.getElementById('inputType').value;
            const inputLink = document.getElementById('inputLink').value;
            const resultDiv = document.getElementById('result');
            const resultMessage = document.getElementById('resultMessage');

            if (inputLink.trim() === '') {
                resultMessage.textContent = 'Por favor, introduce un enlace válido.';
                resultDiv.classList.remove('hidden');
                return;
            }

            // URL de tu servidor Flask en Replit o Glitch
            const serverUrl = 'https://tu-backend.com/descargar';

            fetch(`${serverUrl}?url=${encodeURIComponent(inputLink)}&tipo=${inputType}`)
                .then(response => {
                    if (!response.ok) throw new Error('Error al descargar');
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `${inputType === 'video' ? 'video.mp4' : 'audio.mp3'}`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    resultMessage.textContent = 'Descarga completada.';
                    resultDiv.classList.remove('hidden');
                })
                .catch(error => {
                    resultMessage.textContent = 'Error al descargar. Intenta de nuevo.';
                    resultDiv.classList.remove('hidden');
                });
        });
    </script>
</body>
</html>
