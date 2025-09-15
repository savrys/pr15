// ЖДЕМ, ПОКА ВЕСЬ HTML-ДОКУМЕНТ ПОЛНОСТЬЮ ЗАГРУЗИТСЯ
document.addEventListener('DOMContentLoaded', function() {

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

    // ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА
    function handleOpenDialog() {
        console.log('Кнопка "Написать нам" нажата!');
        dialog.showModal(); // Команда браузеру: "Открой диалог!"
    }

    // ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
    function handleCloseDialog() {
        console.log('Кнопка "Закрыть" нажата!');
        dialog.close(); // Команда браузеру: "Закрой диалог!"
        form.reset(); // Очищаем форму при закрытии
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
            dialog.close();
            form.reset(); // Очищаем форму после отправки
        } else {
            // Если есть ошибки, показываем стандартные сообщения браузера
            form.reportValidity();
        }
    }

    // ВЕШАЕМ ОБРАБОТЧИКИ СОБЫТИЙ НА КНОПКИ И ФОРМУ
    // "Когда на эту кнопку кликнут, выполни функцию handleOpenDialog"
    openButton.addEventListener('click', handleOpenDialog);

    // "Когда на эту кнопку кликнут, выполни функцию handleCloseDialog"
    closeButton.addEventListener('click', handleCloseDialog);

    // "Когда форму попытаются отправить, выполни функцию handleFormSubmit"
    form.addEventListener('submit', handleFormSubmit);

    // Сообщение в консоль, что всё готово к работе
    console.log('Скрипт инициализирован, всё готово к работе!');
});
