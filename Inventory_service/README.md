Inventory Service
=================

Сервис управления товарами и остатками в магазинах.

Описание
--------

Inventory Service --- сервис для управления товарами и их остатками в различных магазинах. Предоставляет API для создания и получения информации о товарах, а также управления остатками товаров.

Функциональность
----------------

-   **Товары:**

    -   Создание товара с PLU и названием.
    -   Получение списка товаров с фильтрацией по имени и PLU.
-   **Остатки:**

    -   Создание остатка товара в магазине.
    -   Увеличение и уменьшение остатков товара.
    -   Получение остатков с фильтрацией по PLU, идентификатору магазина, количеству на полке и в заказе.
-   **Логирование действий:**

    -   Отправка событий в History Service при создании и обновлении товаров и остатков.

Технологии
----------

-   **Node.js** и **Express** для создания сервера.
-   **PostgreSQL** для хранения данных.
-   **Sequelize** в качестве ORM.
-   **JavaScript** для написания кода сервиса.
-   **Winston** для логирования.
-   **Axios** и **axios-retry** для отправки событий в History Service.

Требования
----------

-   **Node.js** версии 14 или выше.
-   **npm** или **yarn**.
-   **PostgreSQL** установленный и настроенный.

Установка
---------

1.  **Клонируйте репозиторий:**

    ```bash
    git clone https://github.com/yourusername/inventory-service.git
    cd inventory-service
    ```

2.  **Установите зависимости:**

    ```bash
    npm install
    ```
    или

    ```bash
    yarn install
    ```

Конфигурация
------------

1.  **Создайте файл `.env` в корневой директории:**

    ```dotenv
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=shop_inventory
    DB_HOST=127.0.0.1
    PORT=3000
    HISTORY_SERVICE_URL=http://localhost:4000/api/history
    ```

    Замените `your_db_username` и `your_db_password` на ваши данные для подключения к базе данных PostgreSQL.

2.  **Настройте подключение к базе данных в `src/config/database.js`**, если необходимо.

Запуск
------

1.  **Создайте базу данных PostgreSQL:**

    ```bash
    createdb shop_inventory
    ```

2.  **Запустите миграции для создания таблиц:**

    ```bash
    npx sequelize-cli db:migrate
    ```

3.  **(Опционально) Запустите сидеры для начального заполнения базы данных:**

    ```bash
    npx sequelize-cli db:seed:all
    ```

4.  **Запустите сервис:**

    ```bash
    node src/app.js
    ```

    Сервис будет доступен по адресу `http://localhost:3000` или по порту, указанному в файле `.env`.

API Эндпоинты
-------------

### Товары (Products)

-   **Создание товара**

    -   **URL:** `POST /api/products`

    -   **Тело запроса:**

        ```json
        {
          "plu": "12345",
          "name": "Товар A"
        }
        ```

-   **Получение товаров с фильтрацией**

    -   **URL:** `GET /api/products`

    -   **Параметры запроса (Query Params):**

        -   `name` (опционально): Фильтр по названию товара (частичное совпадение)
        -   `plu` (опционально): Фильтр по точному PLU
    -   **Пример запроса:**

        ```bash
        GET /api/products?name=Товар&plu=12345
        ```

### Остатки (Stocks)

-   **Создание остатка**

    -   **URL:** `POST /api/stocks`

    -   **Тело запроса:**

        ```json
        {
          "productId": 1,
          "shopId": 1,
          "quantityOnShelf": 50,
          "quantityInOrder": 10
        }
        ```

-   **Увеличение остатка**

    -   **URL:** `PUT /api/stocks/increase`

    -   **Тело запроса:**

        ```json
        {
          "productId": 1,
          "shopId": 1,
          "quantity": 20
        }
        ```

-   **Уменьшение остатка**

    -   **URL:** `PUT /api/stocks/decrease`

    -   **Тело запроса:**

        ```json
        {
          "productId": 1,
          "shopId": 1,
          "quantity": 5
        }
        ```

-   **Получение остатков с фильтрацией**

    -   **URL:** `GET /api/stocks`

    -   **Параметры запроса (Query Params):**

        -   `plu` (опционально): Фильтр по PLU товара
        -   `shop_id` (опционально): Фильтр по ID магазина
        -   `quantityOnShelfMin` и `quantityOnShelfMax` (опционально): Диапазон количества на полке
        -   `quantityInOrderMin` и `quantityInOrderMax` (опционально): Диапазон количества в заказе
    -   **Пример запроса:**

        ```bash
        GET /api/stocks?plu=12345&shop_id=1&quantityOnShelfMin=10&quantityOnShelfMax=100
        ```

Примеры запросов
----------------

Используйте инструменты вроде **Postman** или **cURL** для тестирования API.

-   **Создание товара:**

    ```bash
    curl -X POST http://localhost:3000/api/products\
    -H 'Content-Type: application/json'\
    -d '{
      "plu": "12345",
      "name": "Товар A"
    }'
    ```

-   **Увеличение остатка:**

    ```bash
    curl -X PUT http://localhost:3000/api/stocks/increase\
    -H 'Content-Type: application/json'\
    -d '{
      "productId": 1,
      "shopId": 1,
      "quantity": 20
    }'
    ```