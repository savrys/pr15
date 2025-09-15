// Модальное окно
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

openBtn?.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

closeBtn?.addEventListener('click', () => dlg.close('cancel'));

// Валидация формы
form?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Кастомные сообщения об ошибках
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        const phone = form.elements.phone;
        if (phone?.validity.patternMismatch) {
            phone.setCustomValidity('Введите телефон в формате: +7 (900) 000-00-00');
        }
        
        form.reportValidity();
        
        // Подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }
    
    // Успешная отправка
    e.preventDefault();
    alert('Сообщение отправлено успешно!');
    dlg.close('success');
    form.reset();
});

// Закрытие модалки при клике на бэкдроп
dlg?.addEventListener('click', (e) => {
    if (e.target === dlg) {
        dlg.close('cancel');
    }
});

// Возврат фокуса после закрытия модалки
dlg?.addEventListener('close', () => {
    lastActive?.focus();
});

// Маска для телефона (дополнительно)
const phoneInput = document.getElementById('phone');
phoneInput?.addEventListener('input', (e) => {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }
    
    if (value.startsWith('7')) {
        value = value.slice(1);
    }
    
    let formattedValue = '+7';
    if (value.length > 0) {
        formattedValue += ' (' + value.slice(0, 3);
    }
    if (value.length >= 4) {
        formattedValue += ') ' + value.slice(3, 6);
    }
    if (value.length >= 7) {
        formattedValue += '-' + value.slice(6, 8);
    }
    if (value.length >= 9) {
        formattedValue += '-' + value.slice(8, 10);
    }
    
    input.value = formattedValue;
});
