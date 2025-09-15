<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Форма обратной связи</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Кнопка открытия модалки -->
    <button id="openDialog" type="button" class="open-btn">Написать нам</button>

    <!-- Модалка с формой -->
    <dialog id="contactDialog" aria-labelledby="dialogTitle">
        <h2 id="dialogTitle">Обратная связь</h2>

        <form id="contactForm" method="dialog" novalidate>
            <div class="form-group">
                <label for="name">Имя *</label>
                <input id="name" name="name" type="text" required minlength="2" 
                       autocomplete="given-name" aria-required="true">
            </div>

            <div class="form-group">
                <label for="email">E-mail *</label>
                <input id="email" name="email" type="email" required 
                       autocomplete="email" aria-required="true">
            </div>

            <div class="form-group">
                <label for="phone">Телефон *</label>
                <input id="phone" name="phone" type="tel" inputmode="tel" 
                       autocomplete="tel" aria-describedby="phoneHelp" 
                       placeholder="+7 (_) _--" required 
                       pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
                       aria-required="true">
                <small id="phoneHelp">Формат: +7 (900) 000-00-00</small>
            </div>

            <div class="form-group">
                <label for="date">Дата</label>
                <input id="date" name="date" type="date">
            </div>

            <div class="form-group">
                <label for="topic">Тема *</label>
                <select id="topic" name="topic" required aria-required="true">
                    <option value="">Выберите тему</option>
                    <option value="question">Вопрос</option>
                    <option value="order">Заказ</option>
                    <option value="other">Другое</option>
                </select>
            </div>

            <div class="form-group">
                <label for="message">Сообщение *</label>
                <textarea id="message" name="message" rows="4" required 
                          aria-required="true"></textarea>
            </div>

            <div class="form-actions">
                <button type="button" id="closeDialog">Закрыть</button>
                <button type="submit">Отправить</button>
            </div>
        </form>
    </dialog>

    <script src="main.js"></script>
</body>
</html>
