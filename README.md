# Gazprom Test Task
## Ссылка на [gh-pages](https://esteradfi.github.io/Gazprom-Test-Task/)
При выполнении задания, помимо echarts.js и библиотеки компонентов Consta UI Kit использовались Redux ToolKit (для управлением состояния приложения), axios (для работы с API).

- Данные [**внесены**](https://65d2cf4b987977636bfca91e.mockapi.io/api/rates) на сервис mockAPI и при первом рендере [**App.tsx**](./src/App.tsx) запрашиваются оттуда.
- Написан [**store**](./src/store/store.ts) и [**reducer**](./src/store/reducers/rates.ts), в которых осуществляется управление состоянием переменных.
- Для стилизации используются CSS-модули.
- [**Шапка**](./src/components/Header/Header.tsx) приложения состоит из меняющегося в зависимости от выбора валюты заголовка и взятого из библиотеки Consta UI kit компонента [**ChoiceGroup**](./src/components/Header/ChoiceRate/ChoiceRate.tsx), с помощью которого реализуется переключение выбранной валюты.
- После переключения выбранной валюты исходные данные фильтруются по свойству indicator, сортируются по свойству date, после чего их обрабатывает функция [**calculateAverage**](./src/utils/averageValue.ts), возвращающая среднее значение курса за период. Одновременно с этим данные подставляются в отвечающий за настройку компонента echarts.js объект [**option**](./src/components/Content/Content.tsx).
- В приложении присутствует [**Preloader**](./src/components/Preloader/Preloader.tsx), появляющийся на время ожидания ответа с mockAPI.
