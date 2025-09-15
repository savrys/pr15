// Очень простой код без сложного синтаксиса
console.log('Скрипт начал работу');

// Функция открытия модального окна
function openModal() {
    console.log('Пытаемся открыть модальное окно');
    var dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.showModal();
        console.log('Модальное окно открыто успешно');
    } else {
        console.log('Элемент myDialog не найден');
    }
}

// Функция закрытия модального окна
function closeModal() {
    console.log('Закрываем модальное окно');
    var dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.close();
        
        // Очищаем форму
        var form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
    }
}

// Функция обработки формы
function handleFormSubmit(event) {
    console.log('Форма отправляется');
    event.preventDefault(); // Отменяем стандартную отправку
    
    // Простая проверка
    var nameInput = document.getElementById('userName');
    var emailInput = document.getElementById('userEmail');
    
    if (!nameInput.value) {
        alert('Введите ваше имя');
        return;
    }
    
    if (!emailInput.value || !emailInput.value.includes('@')) {
        alert('Введите корректный email');
        return;
    }
    
    alert('Сообщение отправлено! Спасибо!');
    closeModal();
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Находим форму
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        console.log('Обработчик формы добавлен');
    }
    
    // Закрытие по клику на фон
    var dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.addEventListener('click', function(event) {
            if (event.target === dialog) {
                closeModal();
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('Инициализация завершена');
});

console.log('Скрипт загружен');
