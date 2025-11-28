// Banco de preguntas por categoría
const questionBank = {
  mix: [
    {
      question: "¿Cuánto es 7 × 8?",
      options: ["48", "54", "56", "64"],
      answer: 2
    },
    {
      question: "La memoria RAM sirve para...",
      options: [
        "Almacenar datos de forma permanente",
        "Ejecutar procesos y programas en uso",
        "Conectarse a Internet",
        "Imprimir documentos"
      ],
      answer: 1
    },
    {
      question: "1 byte equivale a...",
      options: ["4 bits", "8 bits", "16 bits", "32 bits"],
      answer: 1
    }
  ],
  math: [
    {
      question: "¿Cuál es el resultado de 15 + 27?",
      options: ["32", "40", "42", "44"],
      answer: 3
    },
    {
      question: "¿Cuánto es 9 × 6?",
      options: ["42", "48", "52", "54"],
      answer: 3
    },
    {
      question: "¿Cuál es el número primo?",
      options: ["21", "33", "37", "49"],
      answer: 2
    }
  ],
  tech: [
    {
      question: "¿Cuál de estos es un sistema operativo?",
      options: ["Chrome", "Windows", "YouTube", "Facebook"],
      answer: 1
    },
    {
      question: "La sigla 'CPU' significa...",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Control Program User",
        "Core Processing Utility"
      ],
      answer: 0
    },
    {
      question: "¿Cuál de estas unidades es mayor?",
      options: ["Kilobyte", "Megabyte", "Gigabyte", "Byte"],
      answer: 2
    }
  ]
};

let activeCategory = null;
let questions = [];
let currentIndex = 0;
let score = 0;
let selectedOptionIndex = null;

// Elementos de la interfaz
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const categoryButtons = document.querySelectorAll(".cat-btn");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

const configBtn = document.getElementById("config-btn");
const configModal = document.getElementById("config-modal");
const closeConfigBtn = document.getElementById("close-config-btn");

// --- Selección de categoría ---
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    activeCategory = btn.dataset.category;
    startBtn.disabled = false;
  });
});

// --- Inicio del juego ---
startBtn.addEventListener("click", () => {
  if (!activeCategory) return;
  questions = [...questionBank[activeCategory]]; // copia
  currentIndex = 0;
  score = 0;

  startScreen.classList.add("hidden");
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  renderQuestion();
});

// --- Renderizar pregunta ---
function renderQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;

  optionsEl.innerHTML = "";
  selectedOptionIndex = null;
  nextBtn.disabled = true;

  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleSelect(index, btn));
    optionsEl.appendChild(btn);
  });

  progressEl.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
  scoreEl.textContent = `Puntaje: ${score} / ${questions.length}`;
}

// --- Seleccionar opción ---
function handleSelect(index, button) {
  document.querySelectorAll(".option-btn").forEach((b) =>
    b.classList.remove("selected")
  );

  button.classList.add("selected");
  selectedOptionIndex = index;
  nextBtn.disabled = false;
}

// --- Botón siguiente ---
nextBtn.addEventListener("click", () => {
  if (selectedOptionIndex === null) return;

  const q = questions[currentIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, i) => {
    if (i === q.answer) {
      btn.classList.add("correct");
    } else if (i === selectedOptionIndex && selectedOptionIndex !== q.answer) {
      btn.classList.add("incorrect");
    }
    btn.disabled = true;
  });

  if (selectedOptionIndex === q.answer) {
    score++;
    scoreEl.textContent = `Puntaje: ${score} / ${questions.length}`;
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 650);
});

// --- Mostrar resultado ---
function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const categoryLabel =
    activeCategory === "math"
      ? "Matemáticas"
      : activeCategory === "tech"
      ? "Tecnología"
      : "Mezcla general";

  finalScoreEl.textContent = `Categoría: ${categoryLabel}. Obtuviste ${score} de ${questions.length} respuestas correctas.`;
}

// --- Volver al menú ---
restartBtn.addEventListener("click", () => {
  activeCategory = null;
  categoryButtons.forEach((b) => b.classList.remove("selected"));
  startBtn.disabled = true;

  resultContainer.classList.add("hidden");
  quizContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

// --- Modal de configuración ---
configBtn.addEventListener("click", () => {
  configModal.classList.remove("hidden");
});

closeConfigBtn.addEventListener("click", () => {
  configModal.classList.add("hidden");
});

configModal.addEventListener("click", (e) => {
  if (e.target === configModal) {
    configModal.classList.add("hidden");
  }
});
