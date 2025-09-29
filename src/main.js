const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Закрытие по клику на backdrop
dlg.addEventListener('click', (e) => {
    if (e.target === dlg) {
        dlg.close('cancel');
    }
});

// Валидация формы
form?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => {
        if (el.setCustomValidity) {
            el.setCustomValidity('');
        }
    });
    
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
            if (el.willValidate && el.checkValidity) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }
    
    // Успешная "отправка"
    e.preventDefault();
    alert('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
    dlg.close('success');
    form.reset();
    
    // Сброс состояния ошибок
    [...form.elements].forEach(el => {
        el.removeAttribute('aria-invalid');
    });
});

// Возврат фокуса после закрытия
dlg.addEventListener('close', () => { 
    lastActive?.focus(); 
});

// Маска для телефона (дополнительная функция)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('7') || value.startsWith('8')) {
            value = '7' + value.slice(1);
        }
        
        if (value.length > 0) {
            let formattedValue = '+7 (';
            if (value.length > 1) {
                formattedValue += value.slice(1, 4);
            }
            if (value.length >= 4) {
                formattedValue += ') ' + value.slice(4, 7);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.slice(7, 9);
            }
            if (value.length >= 9) {
                formattedValue += '-' + value.slice(9, 11);
            }
            e.target.value = formattedValue;
        }
    });
}
