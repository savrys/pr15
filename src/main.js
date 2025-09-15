// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен и разобран');

    // Получаем элементы
    const openButton = document.getElementById('openDialog');
    const closeButton = document.getElementById('closeDialog');
    const dialog = document.getElementById('myDialog');
    const form = document.getElementById('contactForm');

    // Проверяем, что все элементы существуют
    if (!openButton  !closeButton  !dialog || !form) {
        console.error('Не удалось найти все необходимые элементы:');
        console.error('openButton:', openButton);
        console.error('closeButton:', closeButton);
        console.error('dialog:', dialog);
        console.error('form:', form);
        return;
    }

    console.log('Все элементы найдены успешно');

    // Переменная для хранения последнего активного элемента
    let lastActiveElement = null;

    // Функция открытия модального окна
    function openModal() {
        console.log('Открываем модальное окно');
        
        // Сохраняем текущий активный элемент
        lastActiveElement = document.activeElement;
        
        // Показываем модальное окно
        dialog.showModal();
        
        // Фокусируемся на первом поле ввода
        const firstInput = dialog.querySelector('input, textarea, button');
        if (firstInput) {
            firstInput.focus();
        }
        
        // Добавляем класс для анимации
        dialog.classList.add('dialog--open');
    }

    // Функция закрытия модального окна
    function closeModal() {
        console.log('Закрываем модальное окно');
        
        // Закрываем модальное окно
        dialog.close();
        
        // Убираем класс анимации
        dialog.classList.remove('dialog--open');
        
        // Возвращаем фокус на элемент, который был активен до открытия
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
        
        // Сбрасываем форму
        form.reset();
    }

    // Функция обработки отправки формы
    function handleSubmit(event) {
        // Предотвращаем стандартную отправку формы
        event.preventDefault();
        console.log('Обработка отправки формы');

        // Проверяем валидность формы
        if (!form.checkValidity()) {
            // Если форма невалидна, показываем сообщения об ошибках
            form.reportValidity();
            console.log('Форма содержит ошибки');
            return;
        }

        // Получаем данные формы
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        console.log('Данные формы:', formObject);
        
        // Здесь обычно отправляем данные на сервер
        // Для демонстрации просто показываем сообщение
        alert('Форма успешно отправлена! Спасибо за ваше сообщение.');
        
        // Закрываем модальное окно
        closeModal();
    }

    // Функция для закрытия по клику на фон
    function handleBackdropClick(event) {
        // Если клик был на backdrop (площадь вокруг диалога)
        if (event.target === dialog) {
            closeModal();
        }
    }

    // Функция для закрытия по Escape
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Навешиваем обработчики событий
    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    form.addEventListener('submit', handleSubmit);
    dialog.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleEscapeKey);

    // Дополнительные обработчики для улучшения UX
    dialog.addEventListener('close', function() {
        console.log('Модальное окно закрыто');
    });

    // Валидация в реальном времени
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            this.checkValidity();
        });
    });
    console.log('Все обработчики событий установлены');
});

// Обработка ошибок
window.addEventListener('error', function(event) {
    console.error('Произошла ошибка:', event.error);
});

// Сообщение о успешной загрузке скрипта
console.log('Скрипт main.js загружен и выполняется');
