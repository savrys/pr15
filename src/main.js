// Получаем элементы со страницы
const dialog = document.getElementById('contact-dialog');
const openButton = document.getElementById('open-dialog');
const closeButton = document.getElementById('close-dialog');
const form = document.getElementById('contact-form');
let lastActiveElement = null;

// Функция для открытия модального окна
function openDialog() {
  lastActiveElement = document.activeElement; // Запоминаем, какой элемент был в фокусе
  dialog.showModal(); // Показываем модальное окно
  // Переносим фокус на первое поле ввода внутри модалки
  dialog.querySelector('input, select, textarea, button').focus();
}

// Функция для закрытия модального окна
function closeDialog() {
  dialog.close('cancel'); // Закрываем модальное окно
  lastActiveElement?.focus(); // Возвращаем фокус на кнопку, которая открывала модалку
}

// Обработчик события отправки формы
function handleFormSubmit(event) {
  event.preventDefault(); // Отменяем стандартную отправку формы

  // 1. Сбрасываем кастомные сообщения об ошибках
  Array.from(form.elements).forEach(element => {
    if (element.setCustomValidity) {
      element.setCustomValidity('');
    }
  });

  // 2. Проверяем валидность всей формы
  if (!form.checkValidity()) {
    // Если форма невалидна, показываем ошибки
    form.reportValidity();

    // Помечаем невалидные поля для доступности
    Array.from(form.elements).forEach(element => {
      if (element.willValidate) {
        element.toggleAttribute('aria-invalid', !element.checkValidity());
      }
    });
    return; // Прерываем выполнение функции
  }

  // 3. Если форма валидна, "отправляем" её (закрываем модалку)
  alert('Форма успешно отправлена! (Это демо, данные никуда не отправляются)');
  dialog.close('success');
  form.reset(); // Очищаем форму
}

// Навешиваем обработчики событий
openButton.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
form.addEventListener('submit', handleFormSubmit);

// Обработчик события закрытия модального окна
dialog.addEventListener('close', () => {
  lastActiveElement?.focus(); // Всегда возвращаем фокус при закрытии
});
