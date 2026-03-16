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
      {
        country: 'Russia',
        cities: [
          'Moscow',
          'Saint Petersburg',
          'Novosibirsk',
          'Yekaterinburg',
          'Nizhny Novgorod',
          'Kazan',
          'Chelyabinsk',
          'Omsk',
          'Samara',
          'Rostov-on-Don',
          'Ufa',
          'Volgograd',
          'Perm',
          'Krasnoyarsk',
          'Voronezh',
          'Saratov',
          'Krasnodar',
          'Tolyatti',
          'Izhevsk',
          'Barnaul'
        ]
      },
      {
        country: 'Kazakhstan',
        cities: [
          'Almaty',
          'Nur-Sultan',
          'Shymkent',
          'Karaganda',
          'Aktobe',
          'Taraz',
          'Pavlodar',
          'Ust-Kamenogorsk',
          'Semey',
          'Atyrau',
          'Kostanay',
          'Kyzylorda',
          'Petropavlovsk',
          'Temirtau',
          'Turkestan',
          'Kokshetau',
          'Taldykorgan',
          'Aktau',
          'Aksay',
          'Atyrau'
        ]
      },
      {
        country: 'USA',
        cities: [
          'New York',
          'Los Angeles',
          'Chicago',
          'Houston',
          'Philadelphia',
          'Phoenix',
          'San Antonio',
          'San Diego',
          'Dallas',
          'San Jose',
          'Austin',
          'Jacksonville',
          'San Francisco',
          'Indianapolis',
          'Columbus',
          'Fort Worth',
          'Charlotte',
          'Denver',
          'El Paso',
          'Detroit'
        ]
      },
      {
        country: 'Poland',
        cities: [
          'Warsaw',
          'Krakow',
          'Lodz',
          'Wroclaw',
          'Poznan',
          'Gdansk',
          'Sosnowiec',
          'Torun',
          'Bydgoszcz',
          'Katowice',
          'Bialystok',
          'Kielce',
          'Czestochowa',
          'Gliwice',
          'Zabrze',
          'Sosnowiec',
          'Radom',
          'Olsztyn',
          'Tarnobrzeg',
          'Walbrzych'
        ]
      },
      {
        country: 'Georgia',
        cities: [
          'Tbilisi',
          'Kutaisi',
          'Batumi',
          'Rustavi',
          'Zugdidi',
          'Poti',
          'Gori',
          'Telavi',
          'Ozurgeti',
          'Samtredia',
          'Kobuleti',
          'Akhaltsikhe',
          'Marneuli',
          'Abasha',
          'Sagarejo',
          'Tetri Tskaro',
          'Telavi',
          'Kaspi',
          'Bolduma',
          'Sighnaghi'
        ]
      },
      {
        country: 'Egypt',
        cities: [
          'Cairo',
          'Alexandria',
          'Giza',
          'Sharm El Sheikh',
          'Luxor',
          'Aswan',
          'Tana',
          'Suez',
          'Hurghada',
          'Port Said',
          'Ismailia',
          'Mansoura',
          'Asyut',
          'Minya',
          'Sohag',
          'Kiffa',
          'Banha',
          'Tim',
          'Luxor',
          'Aswan'
        ]
      },
      {
        country: 'Germany',
        cities: [
          'Berlin',
          'Hamburg',
          'Munich',
          'Cologne',
          'Frankfurt am Main',
          'Stuttgart',
          'Dusseldorf',
          'Dortmund',
          'Essen',
          'Leipzig',
          'Dresden',
          'Hanover',
          'Nuremberg',
          'Duisburg',
          'Bremen',
          'Lubeck',
          'Kiel',
          'Straubing',
          'Potsdam',
          'Regensburg'
        ]
      },
      {
        country: 'Brazil',
        cities: [
          'Sao Paulo',
          'Rio de Janeiro',
          'Salvador',
          'Fortaleza',
          'Belem',
          'Manaus',
          'Brasilia',
          'Florianopolis',
          'Curitiba',
          'Belo Horizonte',
          'Recife',
          'Porto Alegre',
          'Belo Horizonte',
          'Maceio',
          'Sao Luis',
          'Teresina',
          'Fortaleza',
          'Macapa',
          'Manaus',
          'Aracaju'
        ]
      },
      {
        country: 'France',
        cities: [
          'Paris',
          'Marseille',
          'Lyon',
          'Toulouse',
          'Nice',
          'Nantes',
          'Strasbourg',
          'Montpellier',
          'Bordeaux',
          'Lille',
          'Rennes',
          'Reims',
          'Saint-Etienne',
          'Toulon',
          'Levallois-Perret',
          'Grenoble',
          'Dijon',
          'Angers',
          'Besancon',
          'Limoges'
        ]
      },
      {
        country: 'Italy',
        cities: [
          'Rome',
          'Milan',
          'Naples',
          'Turin',
          'Palermo',
          'Genoa',
          'Bologna',
          'Florence',
          'Bari',
          'Catania',
          'Venice',
          'Verona',
          'Messina',
          'Padua',
          'Taranto',
          'Brescia',
          'Parma',
          'Ravenna',
          'Livorno',
          'Cagliari'
        ]
      }
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