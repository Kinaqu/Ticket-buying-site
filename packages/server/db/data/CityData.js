const City = require('../models/City');

const CityData = async () => {
  try {
    // Проверяем наличие хотя бы одной записи в коллекции City
    const existingCity = await City.findOne();

    // Если записи уже существуют, не делаем ничего
    if (existingCity) {
      console.log('Данные в коллекции City уже существуют.');
      return;
    }
    const countriesData = [
      { country: 'Россия', cities: ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Волгоград', 'Пермь', 'Красноярск', 'Воронеж', 'Саратов', 'Краснодар', 'Тольятти', 'Ижевск', 'Барнаул'] },
      { country: 'Казахстан', cities: ['Алматы', 'Нур-Султан', 'Шымкент', 'Караганда', 'Актобе', 'Тараз', 'Павлодар', 'Усть-Каменогорск', 'Семей', 'Атырау', 'Костанай', 'Кызылорда', 'Петропавловск', 'Темиртау', 'Туркестан', 'Кокшетау', 'Талдыкорган', 'Актау', 'Аксай', 'Атырау'] },
      { country: 'США', cities: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Хьюстон', 'Филадельфия', 'Финикс', 'Сан-Антонио', 'Сан-Диего', 'Даллас', 'Сан-Хосе', 'Остин', 'Джексонвилл', 'Сан-Франциско', 'Индианаполис', 'Колумбус', 'Форт-Уэрт', 'Шарлотт', 'Денвер', 'Эль-Пасо', 'Детройт'] },
      { country: 'Польша', cities: ['Варшава', 'Краков', 'Лодзь', 'Вроцлав', 'Познань', 'Гданьск', 'Сосновец', 'Торунь', 'Быдгощ', 'Катовице', 'Белосток', 'Кельце', 'Ченстохова', 'Гливице', 'Забже', 'Сосновец', 'Радом', 'Ольштын', 'Тарнобржег', 'Валбржег'] },
      { country: 'Грузия', cities: ['Тбилиси', 'Кутаиси', 'Батуми', 'Рустави', 'Зугдиди', 'Поти', 'Гори', 'Телави', 'Озургети', 'Самтредиа', 'Кобулети', 'Ахалцихе', 'Марнеули', 'Абаша', 'Сагареджо', 'Тетрицкаро', 'Телави', 'Каспи', 'Болдума', 'Сигнахи'] },
      { country: 'Египет', cities: ['Каир', 'Александрия', 'Гиза', 'Шарм-эль-Шейх', 'Луксор', 'Асуан', 'Тана', 'Суэц', 'Хургада', 'Порт-Саид', 'Исмаилия', 'Мансура', 'Асьют', 'Миня', 'Сохаг', 'Киффа', 'Банха', 'Тим', 'Люксор', 'Асуан'] },
      { country: 'Германия', cities: ['Берлин', 'Гамбург', 'Мюнхен', 'Кёльн', 'Франкфурт-на-Майне', 'Штутгарт', 'Дюссельдорф', 'Дортмунд', 'Эссен', 'Лейпциг', 'Дрезден', 'Ганновер', 'Нюрнберг', 'Дуйсбург', 'Бремен', 'Любек', 'Кил', 'Штраубинг', 'Потсдам', 'Регенсбург'] },
      { country: 'Бразилия', cities: ['Сан-Паулу', 'Рио-де-Жанейро', 'Сальвадор', 'Форталеза', 'Белем', 'Манаус', 'Бразилиа', 'Флорианополис', 'Куритиба', 'Белу-Оризонти', 'Ресифи', 'Порто-Алегре', 'Белу-Хоризонти', 'Масейо', 'Сан-Луис', 'Терезина', 'Форталеза', 'Макапа', 'Манаус', 'Аракажу'] },
      { country: 'Франция', cities: ['Париж', 'Марсель', 'Лион', 'Тулуза', 'Ницца', 'Нант', 'Страсбург', 'Монпелье', 'Бордо', 'Лилль', 'Ренн', 'Реймс', 'Сен-Этьен', 'Тулон', 'Левалуа-Перре', 'Гренобль', 'Дижон', 'Анже', 'Безансон', 'Лимож'] },
      { country: 'Италия', cities: ['Рим', 'Милан', 'Неаполь', 'Турин', 'Палермо', 'Генуя', 'Болонья', 'Флоренция', 'Бари', 'Катания', 'Венеция', 'Верона', 'Мессина', 'Падуя', 'Таранто', 'Брешиа', 'Парма', 'Равенна', 'Ливорно', 'Кальяри'] },
    ];
    // Заполняем схему данными
    const citiesToSave = [];

    countriesData.forEach(countryData => {
      const countryName = countryData.country;
      const cities = countryData.cities;

      cities.forEach(cityName => {
        citiesToSave.push({ Country: countryName, CityName: cityName });
      });
    });

    // Сохраняем данные в MongoDB
    await City.insertMany(citiesToSave);
    console.log('Данные успешно добавлены в базу данных');
  } catch (error) {
    console.error('Ошибка при добавлении данных:', error);
  }
};

module.exports = CityData;