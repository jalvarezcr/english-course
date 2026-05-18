// Script para index.html - Carga temas agrupados por nivel MCER

document.addEventListener('DOMContentLoaded', () => {
    loadTopics();
});

async function loadTopics() {
    try {
        const response = await fetch('topics.json');
        const topics = await response.json();
        displayTopicsByLevel(topics);
    } catch (error) {
        console.error('Error al cargar los temas:', error);
        document.getElementById('topics-container').innerHTML =
            '<p class="text-red-600 text-center">Error al cargar el temario. Por favor, recarga la página.</p>';
    }
}

// Clases pre-definidas para evitar problemas con Tailwind JIT
const LEVEL_META = {
    'A1': {
        name: 'Beginner', emoji: '🌱',
        desc: 'Primer contacto con el idioma',
        bg: 'bg-green-100', border: 'border-green-500',
        titleColor: 'text-green-900', textColor: 'text-green-700',
        badgeColor: 'text-green-800', badgeBorder: 'border-green-300'
    },
    'A2': {
        name: 'Elementary', emoji: '🌿',
        desc: 'Comunicación básica diaria',
        bg: 'bg-blue-100', border: 'border-blue-500',
        titleColor: 'text-blue-900', textColor: 'text-blue-700',
        badgeColor: 'text-blue-800', badgeBorder: 'border-blue-300'
    },
    'B1': {
        name: 'Intermediate', emoji: '🌳',
        desc: 'Independencia para viajar y trabajar',
        bg: 'bg-yellow-100', border: 'border-yellow-500',
        titleColor: 'text-yellow-900', textColor: 'text-yellow-700',
        badgeColor: 'text-yellow-800', badgeBorder: 'border-yellow-300'
    },
    'B2': {
        name: 'Upper-Intermediate', emoji: '🌲',
        desc: 'Conversación fluida y compleja',
        bg: 'bg-orange-100', border: 'border-orange-500',
        titleColor: 'text-orange-900', textColor: 'text-orange-700',
        badgeColor: 'text-orange-800', badgeBorder: 'border-orange-300'
    },
    'C1': {
        name: 'Advanced', emoji: '⭐',
        desc: 'Uso flexible y eficaz del idioma',
        bg: 'bg-purple-100', border: 'border-purple-500',
        titleColor: 'text-purple-900', textColor: 'text-purple-700',
        badgeColor: 'text-purple-800', badgeBorder: 'border-purple-300'
    },
    'C2': {
        name: 'Mastery', emoji: '🏆',
        desc: 'Dominio casi nativo del inglés',
        bg: 'bg-yellow-200', border: 'border-yellow-600',
        titleColor: 'text-yellow-900', textColor: 'text-yellow-800',
        badgeColor: 'text-yellow-900', badgeBorder: 'border-yellow-400'
    }
};

function displayTopicsByLevel(topics) {
    const container = document.getElementById('topics-container');
    container.innerHTML = '';

    // Agrupar por nivel
    const groups = {};
    topics.forEach(topic => {
        const level = topic.level || 'A1';
        if (!groups[level]) groups[level] = [];
        groups[level].push(topic);
    });

    // Renderizar en orden MCER
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    levelOrder.forEach(level => {
        if (!groups[level]) return;
        const meta = LEVEL_META[level];

        const section = document.createElement('div');
        section.id = `nivel-${level.toLowerCase()}`;
        section.className = 'mb-10 scroll-mt-24';

        section.innerHTML = `
            <div class="${meta.bg} border-l-4 ${meta.border} p-4 rounded-lg mb-5 flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h3 class="text-2xl font-bold ${meta.titleColor}">${meta.emoji} Nivel ${level} — ${meta.name}</h3>
                    <p class="text-sm ${meta.textColor}">${meta.desc}</p>
                </div>
                <span class="bg-white ${meta.badgeColor} px-3 py-1 rounded-full text-sm font-bold border ${meta.badgeBorder}">${groups[level].length} temas</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${groups[level].map(t => topicCardHTML(t, level)).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

function topicCardHTML(topic, level) {
    return `
        <div class="topic-card p-6">
            <div class="flex justify-between items-start mb-2">
                <span class="level-badge level-${level.toLowerCase()}">${level}</span>
                <span class="text-xs text-gray-400">#${topic.id}</span>
            </div>
            <h3 class="text-lg font-bold mb-2 mt-2 text-gray-800">${topic.title.replace(/^\d+\.\s*/, '')}</h3>
            <p class="text-gray-600 text-sm mb-4 min-h-[40px]">${topic.description || 'Haz clic para ver el contenido completo.'}</p>
            <a href="topics/topic-${topic.id}.html" class="btn-primary inline-flex items-center gap-2">
                Ver tema <span aria-hidden="true">→</span>
            </a>
        </div>
    `;
}
