// Script para ejercicios y exámenes en páginas de temas

function checkExercises() {
    const questions = document.querySelectorAll('.exercise-card .question');
    let correct = 0;
    let total = questions.length;

    questions.forEach((question, index) => {
        const correctAnswer = question.dataset.answer;
        const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
        
        if (selected && selected.value === correctAnswer) {
            correct++;
            question.classList.remove('border-red-200');
            question.classList.add('border-green-200', 'bg-green-50');
        } else {
            question.classList.remove('border-green-200', 'bg-green-50');
            question.classList.add('border-red-200', 'bg-red-50');
        }
    });

    const resultDiv = document.getElementById('exercise-result');
    const percentage = Math.round((correct / total) * 100);
    
    let resultClass = 'bg-red-100 border-red-300 text-red-800';
    let message = '¡Sigue practicando!';
    
    if (percentage >= 80) {
        resultClass = 'bg-green-100 border-green-300 text-green-800';
        message = '¡Excelente trabajo!';
    } else if (percentage >= 60) {
        resultClass = 'bg-yellow-100 border-yellow-300 text-yellow-800';
        message = '¡Buen intento!';
    }
    
    resultDiv.className = `mt-4 p-4 rounded-lg border-2 ${resultClass}`;
    resultDiv.innerHTML = `
        <p class="font-bold text-lg">${message}</p>
        <p>Respuestas correctas: ${correct} de ${total} (${percentage}%)</p>
    `;
}

function checkExam() {
    const questions = document.querySelectorAll('.exam-card .question');
    let correct = 0;
    let total = questions.length;

    questions.forEach((question, index) => {
        const correctAnswer = question.dataset.answer;
        const selected = document.querySelector(`input[name="e${index + 1}"]:checked`);
        
        if (selected && selected.value === correctAnswer) {
            correct++;
            question.classList.remove('border-red-200', 'bg-red-50');
            question.classList.add('border-green-200', 'bg-green-50');
        } else {
            question.classList.remove('border-green-200', 'bg-green-50');
            question.classList.add('border-red-200', 'bg-red-50');
        }
    });

    const resultDiv = document.getElementById('exam-result');
    const percentage = Math.round((correct / total) * 100);
    
    let resultClass = 'bg-red-100 border-red-300 text-red-800';
    let message = 'No aprobado. Revisa el material y vuelve a intentarlo.';
    let emoji = '❌';
    
    if (percentage >= 80) {
        resultClass = 'bg-green-100 border-green-300 text-green-800';
        message = '¡Aprobado! Puedes continuar al siguiente tema.';
        emoji = '✅';
    } else if (percentage >= 60) {
        resultClass = 'bg-yellow-100 border-yellow-300 text-yellow-800';
        message = 'Aprobado con calificación mínima. Te recomendamos repasar.';
        emoji = '⚠️';
    }
    
    resultDiv.className = `mt-4 p-6 rounded-lg border-2 ${resultClass}`;
    resultDiv.innerHTML = `
        <p class="font-bold text-2xl mb-2">${emoji} ${message}</p>
        <p class="text-xl">Calificación: ${correct} de ${total} (${percentage}%)</p>
    `;
}
