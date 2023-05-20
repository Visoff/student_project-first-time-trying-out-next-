# Калинин Илья тестовое задание student labs
## Технологии
- Next js (framework), тк запросы похожи на express, но можно и страницы на React'е писать
- Docker для диплоя проекта на сервер
- Бд: postgres, тк легко в docker контейнере запусить
- Docker Compose (хотя нет, не успел)

## Сервак с production успешно лёг

Изза этого пришлось добавлять postgres в основной репозиторий, и запускается это дело через docker-compose
``` bash
    docker-compose up
```

# Ниже уже не актуально

## ip
http://176.119.159.214:3000

### Для прохождения теста
http://176.119.159.214:3000/{id}

### Для справки
http://176.119.159.214:3000/{id}/{code}

## Swagger
[swagger](https://app.swaggerhub.com/apis-docs/IKALININ01/student_labs_app/1.0#/default/post_api_form__form__submit)