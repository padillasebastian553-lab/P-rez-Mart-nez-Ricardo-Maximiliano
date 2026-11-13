document.addEventListener("DOMContentLoaded", () => {

    const rocket = document.getElementById("rocket");

    // Evita ejecutar el juego en otras paginas.
    if (!rocket) return;

    const questions = [

        {
            question: "¿Cuál es el planeta más cercano al Sol?",
            answers: ["Venus", "Mercurio", "Marte", "Júpiter"],
            correct: 1,
            explanation: "¡Correcto! Mercurio es el planeta más cercano al Sol."
        },

        {
            question: "¿Cómo se llama nuestra galaxia?",
            answers: ["Andrómeda", "Vía Láctea", "Triángulo", "Sombrero"],
            correct: 1,
            explanation: "¡Excelente! Nuestro sistema solar se encuentra en la Vía Láctea."
        },

        {
            question: "¿Qué planeta es conocido como el planeta rojo?",
            answers: ["Marte", "Saturno", "Venus", "Neptuno"],
            correct: 0,
            explanation: "¡Muy bien! Marte tiene un aspecto rojizo por los minerales de hierro oxidados."
        },

        {
            question: "¿Qué instrumento permite observar objetos lejanos del universo?",
            answers: ["Microscopio", "Telescopio", "Brújula", "Termómetro"],
            correct: 1,
            explanation: "¡Correcto! Los telescopios permiten observar objetos astronómicos."
        },

        {
            question: "¿Qué vehículo permite transportar satélites al espacio?",
            answers: ["Submarino", "Automóvil", "Cohete", "Tren"],
            correct: 2,
            explanation: "¡Misión cumplida! Los cohetes transportan satélites y sondas al espacio."
        }

    ];

    let current = 0;
    let answered = false;

    const question = document.getElementById("question");
    const answers = document.getElementById("answers");
    const feedback = document.getElementById("feedback");
    const next = document.getElementById("nextQuestion");

    const stage = document.getElementById("stage");
    const progress = document.getElementById("progress");
    const percentage = document.getElementById("percentage");
    const status = document.getElementById("gameStatus");
    const questionStage = document.getElementById("questionStage");

    const panel = document.getElementById("questionPanel");
    const victory = document.getElementById("victory");

    function loadQuestion() {

        const data = questions[current];

        answered = false;

        question.textContent = data.question;

        questionStage.textContent =
            "ETAPA " + (current + 1) + " · EXPLORACIÓN";

        answers.innerHTML = "";

        feedback.textContent =
            "ESPERANDO RESPUESTA DEL COMANDANTE...";

        feedback.className = "feedback";

        next.disabled = true;

        data.answers.forEach((answer, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer";
            button.textContent = answer;

            button.addEventListener("click", () => {
                checkAnswer(index, button);
            });

            answers.appendChild(button);

        });

    }

    function checkAnswer(selected, selectedButton) {

        if (answered) return;

        const data = questions[current];

        if (selected === data.correct) {

            answered = true;

            selectedButton.classList.add("correct");

            feedback.textContent = data.explanation;
            feedback.classList.add("good");

            answers.querySelectorAll("button").forEach(button => {
                button.disabled = true;
            });

            const completed = current + 1;
            const percent = completed * 20;

            stage.textContent =
                String(completed).padStart(2, "0") + " / 05";

            percentage.textContent = percent + "%";

            progress.style.width = percent + "%";

            status.textContent = "ETAPA COMPLETADA";

            next.disabled = false;

        } else {

            selectedButton.classList.add("wrong");
            selectedButton.disabled = true;

            feedback.textContent =
                "RESPUESTA INCORRECTA. INTÉNTALO NUEVAMENTE, COMANDANTE.";

            feedback.classList.add("bad");

        }

    }

    next.addEventListener("click", () => {

        if (!answered) return;

        current++;

        // El cohete avanza un tramo por cada respuesta correcta.
        rocket.style.left = (current / questions.length * 100) + "%";

        if (current < questions.length) {

            status.textContent = "NUEVA ETAPA DESBLOQUEADA";

            loadQuestion();

        } else {

            status.textContent = "MISIÓN COMPLETADA";

            panel.classList.add("hidden");
            victory.classList.remove("hidden");

        }

    });

    // REINICIAR MISION
    document.getElementById("restart").addEventListener("click", () => {

        current = 0;
        answered = false;

        rocket.style.left = "0%";
        progress.style.width = "0%";

        percentage.textContent = "0%";
        stage.textContent = "00 / 05";

        status.textContent = "SISTEMA PREPARADO";

        victory.classList.add("hidden");
        panel.classList.remove("hidden");

        loadQuestion();

    });

    loadQuestion();

});
