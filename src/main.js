// Простые глобальные функции для работы с модальным окном
function openModal() {
    console.log('Открываем модальное окно...');
    const dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.showModal();
        console.log('Модальное окно открыто');
    } else {
        console.error('Не найден элемент с id="myDialog"');
    }
}

function closeModal() {
    console.log('Закрываем модальное окно...');
    const dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.close();
        console.log('Модальное окно закрыто');
        
        // Очищаем форму
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
    }
}

// Обработчик отправки формы
function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Форма отправляется...');
    
    // Простая валидация
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    
    if (!nameInput.value.trim()) {
        alert('Пожалуйста, введите ваше имя');
        nameInput.focus();
        return;
    }
    
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        alert('Пожалуйста, введите корректный email');
        emailInput.focus();
        return;
    }
    
    if (!messageInput.value.trim()) {
        alert('Пожалуйста, введите сообщение');
        messageInput.focus();
        return;
    }
    
    alert('Сообщение отправлено! Спасибо за обратную связь.');
    closeModal();
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Находим форму и добавляем обработчик
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        console.log('Обработчик формы добавлен');
    } else {
        console.error('Форма не найдена');
    }
    
    // Обработчик для закрытия по клику на фон
    const dialog = document.getElementById('myDialog');
    if (dialog) {
        dialog.addEventListener('click', function(event) {
            if (event.target === dialog) {
                closeModal();
            }
        });
    }
    
    // Обработчик для закрытия по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('Все обработчики установлены');
});

// Простая проверка для отладки
console.log('main.js загружен');
