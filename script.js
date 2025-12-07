// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        // Update active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Typing animation
const typingText = document.getElementById('typingText');
const texts = [
    "Создайте свой первый сайт за 15 минут",
    "Изучите HTML, CSS и JavaScript",
    "Разместите сайт на GitHub бесплатно",
    "Станьте веб-разработчиком"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Start typing after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// File download
function downloadFile(type) {
    let content = '';
    let filename = '';
    
    switch(type) {
        case 'html':
            content = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый сайт</title>
    <style>
        :root {
            --primary: #3b82f6;
            --dark: #0a0a0a;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            background: var(--dark);
            color: white;
            padding: 2rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: var(--primary);
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Привет, мир!</h1>
        <p>Это мой первый сайт, созданный с помощью CodeLab.</p>
    </div>
</body>
</html>`;
            filename = 'index.html';
            break;
            
        case 'css':
            content = `/* Основные стили для проекта */
:root {
    --primary: #3b82f6;
    --primary-dark: #1d4ed8;
    --dark: #0a0a0a;
    --light: #f8f9fa;
    --gray: #6c757d;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--light);
    background: var(--dark);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
}

.btn:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

/* Адаптивность */
@media (max-width: 768px) {
    .container {
        padding: 0 0.5rem;
    }
}`;
            filename = 'style.css';
            break;
            
        case 'checklist':
            content = `ЧЕК-ЛИСТ СОЗДАНИЯ САЙТА
=======================

✅ 1. ПОДГОТОВКА
   [ ] Установить VS Code
   [ ] Установить расширения
   [ ] Создать папку проекта

✅ 2. HTML
   [ ] Создать базовую структуру
   [ ] Добавить мета-теги
   [ ] Создать семантическую разметку
   [ ] Подключить CSS и JS

✅ 3. CSS
   [ ] Сбросить стандартные стили
   [ ] Настроить базовые стили
   [ ] Создать адаптивную верстку
   [ ] Добавить анимации

✅ 4. ДЕПЛОЙ
   [ ] Создать GitHub репозиторий
   [ ] Загрузить файлы
   [ ] Включить GitHub Pages
   [ ] Проверить работу сайта

📌 СОВЕТЫ:
• Сохраняйтесь часто (Ctrl+S)
• Используйте комментарии
• Тестируйте на разных устройствах
• Изучайте консоль разработчика

Удачи в разработке! 🚀`;
            filename = 'чек-лист.txt';
            break;
    }
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show notification
    showNotification(`Файл "${filename}" скачан`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .install-step, .timeline-item, .resource-card').forEach(el => {
        observer.observe(el);
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});
