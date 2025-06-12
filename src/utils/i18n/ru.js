export const ru = {
    header_component: {
        settings: 'Настройки',
        logout: 'Выйти из системы',
        do_you_want_to_log_out: 'Вы хотите выйти из системы?',
        yes: 'Да',
        no: 'Нет',
        language: 'Язык'
    },
    pagination_component: {
        show_by: 'Показать по'
    },
    translate_component: {
        active: 'Активный',
        latin: 'Узбек',
        cyrillic: 'Ўзбек',
        russian: 'Русский',
        english: 'Английский'
    },
    notification_component: {
        error: 'Ошибка!',
        internal_server_error: 'Ошибка сервера',
        success: 'Успешно',
        warning:'Предупреждения'
    },
    badge_component: {
        default: 'Стандарт',
        created: 'Созданный',
        sent: 'Отправил',
        rejected: 'Отклоненный',
        error: 'Ошибка'
    },
    otp_component: {
        a_6_dig_code_has_ben_send_your_phone_number:
            '6-значный код был отправлен на ваш номер {phone_number}',
        enter_a_code: 'Введите код',
        send: 'Отправить',
        resend_code: 'Отправить повторно',
        resended_message: "Отправлен новый код",
    },
    validations: {
        required_field: 'Обязательное поле',
        the_phone_number_was_not_entered_completely:
            'Введите правильный номер телефона',
        invalid_phone_number_code: 'Неверный код телефона. Допустимые коды: '
    },
    menu: {
        AuthView: 'Вход',
        DashboardNotFound: 'Страница не найдена',
        DashboardTransactionsView: 'Кредиты',
        TransactionsView: 'Кредиты',
        ClientsTransactionsView: 'Кредиты клиентов',
        DashboardClientsView: 'Клиенты',
        ClientsView: 'Клиенты',
        DashboardSettingsView: 'Настройки'
    },
    error_page: {
        page_not_found: 'Страница не найдена (404)!',
        go_home: 'На главную'
    },
    auth_view: {
        banner_title1:'Добро пожаловать в ваш личный кабинет PayPlan!',
        banner_title: 'Здесь вы можете легко управлять своими платежами, создавать отчеты и управлять всеми финансовыми транзакциями вашего бизнеса в режиме реального времени. Спасибо, что выбрали PayPlan — мы работаем для вашего удобства!',
        title: 'Вход',
        login: 'Войти',
        username: 'Имя пользователя',
        password: 'Пароль',
        password_confirm: "Подтвердите пароль",
        register: "Зарегистрироваться",
        code: 'Код',
        phone_number: 'Номер телефона',
        reset_password: 'Сбросить пароль',
        sign_in: 'Вход в систему'
    },
    transactions_page: {
        user_full_name: 'Ф.И.О',
        phone_number: 'Номер телефона',
        description: 'Описание',
        status: 'Статус',
        amount: 'Сумма (UZS)',
        loan_type: 'Тип кредита',
        please_try_again_after: 'Попробуйте еще раз через {timer}',
        the_value_has_exceeded_the_given_limit:
            'Значение превышает установленный лимит. Лимит',
        the_minimum_limit_that_can_be_taken: 'Минимальный допустимый лимит',
        sum: 'сум',
        annual_interest_rate: 'Годовая процентная ставка',
        loan_period: 'Срок кредита',
        minimum_value: 'Минимальное значение',
        maximum_value: 'Максимальное значение',
        your_limit: 'Ваш лимит',
        monthly_payment: 'Ежемесячный платеж',
        amount_value: 'Значение суммы',
        save: 'Сохранить',
        credit_processing: 'Оформление кредита',
        qr_code_for_scanning: 'QR-код для сканирования',
        scan_the_qrcode_in_davr_mobile_app:
            'Сканируйте QR-код в приложении Davr Mobile',
        close: 'Закрыть',
        qr_download:'Скачать QR код',
        passport_series_and_number: 'Серия и номер паспорта',
        pinfl: 'ПИНФЛ',
        workplace: 'Место работы',
        average_salary: 'Средняя зарплата (UZS)',
        customer_information: 'Информация о клиенте',
        organization_information: 'Информация об организации',
        name: 'Название',
        account_number: 'Номер счета',
        secondary_account_number: 'Дополнительный номер счета',
        bank_branch: 'Отделение банка (МФО)',
        inn: 'ИНН',
        secondary_bank_branch: 'Дополнительное отделение банка (МФО)',
        credit_information: 'Информация о кредите',
        month: 'месяц',
        approve: 'Подтвердить',
        workplace_inn: 'ИНН места работы',
        add: 'Добавлять',
        edit: "Редактирование",
        delete: "Удалить",
        are_you_sure_you_want_to_delete: "Вы уверены, что хотите удалить?",
        filter_of_status: 'Фильтровать по статусу',
        credit_created_successfully: 'Кредит успешно создан!',
        credit_updated_successfully: 'Кредит успешно изменен!',
        credit_deleted_successfully: 'Кредит успешно удален!',
        verification_was_successful: 'Проверка успешно завершена!'
    },
    clients_page: {
        full_name: 'Ф.И.О',
        pinfl: 'ПИНФЛ',
        phone_number: 'Номер телефона',
        description: 'Описание',
        status: 'Статус',
        workplace: 'Место работы',
        workplace_inn: 'ИНН места работы'
    },
    accounts_page: {
        add: "Добавить счет",
        edit: "Редактировать счет",
        account_delete_confirm: "Вы уверены, что хотите удалить счет?",
        account_deleted_successfully: "Счет успешно удален!",
        created_successfully: "Счет успешно создан",
        account_updated_successfully: "Счет успешно обновлен",
        mfo_rule: "MFO банка должен состоять из 5 цифр",
        account_rule: "Номер счета должен  состоять не больше из 27 цифр",
        primary: 'Основной счет',
        made_primary: "Сделать основный счетем",
        made_primary_done: "Основной счет установлен",
    },
    eri_component: {
        eri_expired: "Срок действия E-Imzo",
        eri_not_found: "E-Imzo не найден",
        you_do_not_have_electronic_signature_keys_with_signing_authority:
            "У вас нет ключей электронной подписи с правом подписи",
        reopen_issue:'Введите пароль E-Imzo',
        eri_password_entry_canceled:'Вход через E-Imzo был отменён'
    },
    telegram_unlink: "Выйти из Телеграм бота",
    // global
    ERROR: "Ошибка",
    MFO: "Банк МФО",
    Account: "Номер счета",
    gateway_view: {
        qr_code_for_log: "QR-код для входа через E-IMZO",
        use_the_application: "Используйте приложение E-IMZO для сканирования QR-кода",
        hash_for_scanning: "Хеш для сканирования QR-кода",
        close: "Закрыть"
    }

}
export default ru
