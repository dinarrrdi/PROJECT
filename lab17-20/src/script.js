// ВИДЕО
const videoOverlay = document.getElementById('videoOverlay');
const myVideo = document.getElementById('myVideo');
const skipButton = document.getElementById('skipButton');
const content = document.querySelector('.content');

console.log("videoOverlay:", videoOverlay);
console.log("myVideo:", myVideo);
console.log("skipButton:", skipButton);
console.log("content:", content);

function hideVideoAndShowContent() {
    videoOverlay.style.display = 'none';
    content.style.display = 'block';
}

// Обработчик события окончания видео
if (myVideo) {
    myVideo.addEventListener('ended', hideVideoAndShowContent);
} else {
    console.error("Элемент myVideo не найден!");
}

// Обработчик события нажатия кнопки "Пропустить"
if (skipButton) {
    skipButton.addEventListener('click', () => {
        myVideo.muted = true; // Выключение звука при нажатии "Пропустить"
        hideVideoAndShowContent();
    });
} else {
    console.error("Элемент skipButton не найден!");
}

// Звук включен по умолчанию
myVideo.muted = false;

//Автоматическое воспроизведение и включение звука.
myVideo.play();


// ДВУХЭТААНЫЙ ВЫБОР
document.addEventListener('DOMContentLoaded', function() {
    const characterChoices = document.getElementById('character-choices');
    const phraseChoices = document.getElementById('phrase-choices');
    const resultDiv = document.getElementById('result');

    // Скрывается выбор фраз при загрузке страницы
    phraseChoices.style.display = 'none';

    characterChoices.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target;
        let selectedCharacter;
        let linkElement;

        if (target.tagName === 'P') {
            selectedCharacter = target.parentNode.dataset.character;
            linkElement = target.parentNode;
        } else if (target.tagName === 'A'){
            selectedCharacter = target.dataset.character;
            linkElement = target;
        } else {
            return;
        }

        if (selectedCharacter === 'character2') {
            // Скрывается выбор персонажей
            characterChoices.style.display = 'none';
            // Показывается выбор вариантов
            phraseChoices.style.display = 'flex';
        } else {
            window.location.href = linkElement.getAttribute('href'); // Переход при неправильном выборе
        }
    });

    phraseChoices.addEventListener('click', function(event) {
        event.preventDefault();
        const target = event.target;
        let selectedPhrase;
        let linkElement;

        if (target.tagName === 'P') {
            selectedPhrase = target.parentNode.dataset.phrase;
            linkElement = target.parentNode;
        } else if (target.tagName === 'A'){
            selectedPhrase = target.dataset.phrase;
            linkElement = target;
        } else {
            return;
        }

        if (selectedPhrase === 'choice4') {
            resultDiv.textContent = 'Правильный выбор!';
            window.location.href = linkElement.getAttribute('href');
        } else {
            window.location.href = linkElement.getAttribute('href');
        }
    });
});



// ЧЕКБОКСЫ
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Функция для проверки, правильные ли ответы выбраны
function checkCorrectAnswers() {
    return option2.checked && option3.checked;
}

// Функция для обработки изменения состояния чекбоксов
function handleCheckboxChange() {
    let checkedCount = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    // Проверка, выбрано ли больше двух вариантов
    if (checkedCount > 2) {
        // Отмена выбора последнего чекбокса
        this.checked = false;
        checkedCount--; // Обновляем счетчик
    }


    // Если выбрано ровно 2 варианта
    if (checkedCount === 2) {
        // Проверка, правильные ли ответы
        if (checkCorrectAnswers()) {
            window.location.href = 'start.html';
        } else {
            window.location.href = 'false.html';
        }
    }
}

// Обработчик события change для каждого чекбокса
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange.bind(checkbox)); // Привязываем this
});