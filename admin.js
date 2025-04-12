// Это простой пример файла для администрирования листа ожидания
// В реальном приложении это должно быть реализовано через защищенное API и админ-панель

// Закодированные данные администратора (не рекомендуется для боевых условий!)
const ADMIN_CREDENTIALS = {
    // Base64-encoded "admin@demo.com:detoxAdmin"
    encoded: "YWRtaW5AZGVtby5jb206ZGV0b3hBZG1pbg=="
};

// Функция для аутентификации администратора
function authenticateAdmin(email, password) {
    const decodedCredentials = atob(ADMIN_CREDENTIALS.encoded).split(':');
    return email === decodedCredentials[0] && password === decodedCredentials[1];
}

// Функции для управления листом ожидания
// В реальном приложении эти функции должны взаимодействовать с backend API

// Получение всех пользователей из листа ожидания
async function getWaitlistUsers() {
    // Здесь должен быть запрос к API/серверу
    // Для демонстрации возвращаем тестовые данные
    return [
        {
            id: 1,
            fullname: "Иван Иванов",
            email: "ivan@example.com",
            reason: "Для работы за компьютером в офисе",
            date: "2023-05-15T14:32:10Z",
            type: "download",
            version: "1.5",
            platform: "Windows",
            status: "pending"
        },
        {
            id: 2,
            fullname: "Мария Петрова",
            email: "maria@example.com",
            reason: "Для защиты зрения при работе дизайнером",
            date: "2023-05-16T09:21:45Z",
            type: "notification",
            version: null,
            platform: "mac",
            status: "pending"
        }
    ];
}

// Одобрение доступа для пользователя
async function approveUser(userId) {
    // Здесь должен быть запрос к API/серверу для одобрения пользователя
    console.log(`Одобрение пользователя с ID: ${userId}`);
    return { success: true, message: "Пользователь одобрен" };
}

// Отклонение заявки пользователя
async function rejectUser(userId) {
    // Здесь должен быть запрос к API/серверу для отклонения пользователя
    console.log(`Отклонение пользователя с ID: ${userId}`);
    return { success: true, message: "Заявка отклонена" };
}

// Отправка письма пользователю
async function sendEmailToUser(userId, templateName) {
    // Здесь должен быть запрос к API/серверу для отправки email
    console.log(`Отправка письма "${templateName}" пользователю с ID: ${userId}`);
    return { success: true, message: "Письмо отправлено" };
}

// Для использования в будущей админ-панели
const adminApi = {
    authenticate: authenticateAdmin,
    getUsers: getWaitlistUsers,
    approveUser: approveUser,
    rejectUser: rejectUser,
    sendEmail: sendEmailToUser
};

// Экспорт API для использования в других модулях
// В реальном приложении используйте соответствующий метод экспорта в зависимости от окружения
if (typeof module !== 'undefined' && module.exports) {
    module.exports = adminApi;
}
