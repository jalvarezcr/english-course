// Script para index.html - Carga temas y enlaza a páginas individuales

document.addEventListener('DOMContentLoaded', () => {
    loadTopics();
});

async function loadTopics() {
    try {
        const response = await fetch('topics.json');
        const topics = await response.json();
        displayTopics(topics);
    } catch (error) {
        console.error('Error al cargar los temas:', error);
        document.getElementById('topics-container').innerHTML = 
            '<p class="text-red-600 col-span-full text-center">Error al cargar el temario. Por favor, recarga la página.</p>';
    }
}

function displayTopics(topics) {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';

    topics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'topic-card p-6';
        card.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${topic.title}</h3>
            <span class="small-badge">${topic.level || 'A1-B2'}</span>
            <p class="mt-3 text-gray-600 text-sm">${topic.description || 'Haz clic para ver el contenido completo.'}</p>
            <a href="topics/topic-${topic.id}.html" class="btn-primary inline-block mt-4">Ver tema completo →</a>
        `;
        container.appendChild(card);
    });
}
