document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('version');
    const platform = urlParams.get('platform');
    const notificationType = urlParams.get('notification');

    // Обновляем информацию о версии на странице
    const versionInfo = document.getElementById('version-info');
    if (version && platform) {
        versionInfo.textContent = `Для скачивания Detox ${version} (${platform}) необходим доступ`;
    } else if (notificationType) {
        versionInfo.textContent = `Чтобы получать уведомления о выходе новой версии для ${notificationType === 'mac' ? 'macOS' : 'Android'}, пожалуйста, авторизуйтесь или оставьте заявку`;
    }

    // Обработчик формы входа
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginError = document.getElementById('login-error');
        
        // Проверяем учетные данные администратора
        // В реальности здесь должна быть проверка через безопасное API
        if (checkAdminCredentials(email, password)) {
            // Показываем секцию скачивания
            loginForm.style.display = 'none';
            document.getElementById('download-section').classList.remove('hidden');
            
            // Формируем ссылку на скачивание
            const downloadLink = document.getElementById('download-link');
            if (version && platform) {
                downloadLink.href = `downloads/detox-${version}-${platform.toLowerCase()}.exe`;
                downloadLink.textContent = `Скачать Detox ${version} для ${platform}`;
            } else if (notificationType) {
                // Подписка на уведомления
                downloadLink.href = 'index.html';
                downloadLink.innerHTML = '<i class="fas fa-home mr-2"></i> Вернуться на главную';
                alert('Вы успешно подписались на уведомления о выходе новой версии!');
            }
        } else {
            // Показываем ошибку
            loginError.textContent = 'Неверный email или пароль. Попробуйте еще раз или подайте заявку на доступ.';
            loginError.classList.remove('hidden');
        }
    });

    // Обработчик формы листа ожидания
    const waitlistForm = document.getElementById('waitlist-form');
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('waitlist-email').value,
            reason: document.getElementById('reason').value,
            date: new Date().toISOString(),
            type: version ? 'download' : 'notification',
            version: version || null,
            platform: platform || notificationType || null
        };
        
        // Отправляем данные (в реальном приложении здесь будет AJAX-запрос)
        saveToWaitlist(formData)
            .then(() => {
                // Показываем сообщение об успехе
                document.getElementById('waitlist-form-container').style.display = 'none';
                document.getElementById('waitlist-success').classList.remove('hidden');
            })
            .catch(error => {
                console.error('Ошибка сохранения в лист ожидания:', error);
                alert('Произошла ошибка. Пожалуйста, попробуйте снова позже.');
            });
    });
    
    // Функция проверки учетных данных администратора
    // В реальном приложении это должно быть сделано через безопасное API с хешированием паролей
    function checkAdminCredentials(email, password) {
        // Простая проверка для демонстрации
        // В реальном приложении никогда не храните пароли в открытом виде в коде!
        
        // Используем базовое шифрование для хранения учетных данных администратора
        // В реальности должен использоваться безопасный механизм аутентификации через сервер
        const encodedAdmin = "YWRtaW5AZGVtby5jb206ZGV0b3hBZG1pbg=="; // admin@demo.com:detoxAdmin (Base64)
        const decodedAdmin = atob(encodedAdmin).split(':');
        
        return email === decodedAdmin[0] && password === decodedAdmin[1];
    }
    
    // Функция для сохранения данных в waitlist.json
    // В реальном приложении это должно быть реализовано через API
    async function saveToWaitlist(formData) {
        // В браузере нельзя напрямую писать в файл,
        // поэтому здесь должен быть запрос к серверу
        
        // Для демонстрации просто имитируем успешное сохранение
        return new Promise((resolve) => {
            console.log('Данные для сохранения:', formData);
            setTimeout(resolve, 1000); // Имитация задержки сетевого запроса
        });
    }
});
