// ЖДЕМ, ПОКА ВЕСЬ HTML-ДОКУМЕНТ ПОЛНОСТЬЮ ЗАГРУЗИТСЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log("Скрипт загружен!");

    // НАХОДИМ НУЖНЫЕ ЭЛЕМЕНТЫ НА СТРАНИЦЕ ПО ИХ ID
    const openButton = document.getElementById('openDialog');
    const closeButton = document.getElementById('closeDialog');
    const dialog = document.getElementById('myDialog');
    const form = document.getElementById('contactForm');

    // ПРОВЕРЯЕМ, ЧТО ВСЕ ЭЛЕМЕНТЫ НАЙДЕНЫ
    if (!openButton  !closeButton  !dialog || !form) {
        console.error('Ошибка: Не удалось найти все необходимые элементы на странице!');
        return;
    }

    console.log("Все элементы найдены:", openButton, closeButton, dialog, form);

    let lastActiveElement = null;

    // ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
    function handleOpenDialog() {
        console.log('Кнопка "Написать нам" нажата!');
        lastActiveElement = document.activeElement;
        
        // Проверяем поддержку showModal
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            // Fallback для старых браузеров
            dialog.setAttribute('open', 'true');
            console.warn("Ваш браузер не поддерживает showModal(), использован fallback.");
        }
    }

    // ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
    function handleCloseDialog() {
        console.log('Кнопка "Закрыть" нажата!');
        
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
        
        form.reset(); // Очищаем форму при закрытии
        
        // Безопасный возврат фокуса (исправленная строка!)
        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
    }

    // ФУНКЦИЯ, КОТОРАЯ СРАБОТАЕТ ПРИ ОТПРАВКЕ ФОРМЫ
    function handleFormSubmit(event) {
        // Предотвращаем настоящую отправку формы на сервер
        event.preventDefault();
        console.log('Форма отправлена!');

        // Проверяем, что все поля формы заполнены правильно
        if (form.checkValidity()) {
            // Если всё OK, показываем сообщение и закрываем окно
            alert('Сообщение отправлено! Спасибо за вашу обратную связь.');
            
            if (typeof dialog.close === 'function') {
                dialog.close();
            } else {
                dialog.removeAttribute('open');
            }
            
            form.reset(); // Очищаем форму после отправки
        } else {
            // Если есть ошибки, показываем стандартные сообщения браузера
            form.reportValidity();
        }
    }

    // ВЕШАЕМ ОБРАБОТЧИКИ СОБЫТИЙ НА КНОПКИ И ФОРМУ
    openButton.addEventListener('click', handleOpenDialog);
    closeButton.addEventListener('click', handleCloseDialog);
    form.addEventListener('submit', handleFormSubmit);

    // Сообщение в консоль, что всё готово к работе
    console.log('Скрипт инициализирован, всё готово к работе!');
});
