import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainPage() {
  const containerStyle = {
    backgroundColor: 'white',
    color: 'red',
    textAlign: 'center',
    padding: '40px',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: 'auto',
  };

  const sectionStyle = {
    margin: '20px 0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black', // Синий цвет ссылки, можно изменить
    margin: '0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <h2>Добро пожаловать на наш проект по бронированию ЖД и Авиа билетов</h2>

      <div style={sectionStyle}>
        <h3>Авиабилеты</h3>
        <p>Здесь вы можете забронировать авиабилеты на любой вкус.</p>
      </div>

      <div style={sectionStyle}>
        <h3>Железнодорожные билеты</h3>
        <p>Путешествуйте удобно и комфортно с нашими железнодорожными билетами.</p>
      </div>

      <div style={sectionStyle}>
        <h3>О нас</h3>
        <p>Мы предоставляем широкий выбор билетов для ваших путешествий.</p>
      </div>

      <div style={sectionStyle}>
        <h3>Следите за нами в социальных сетях</h3>
        <a href="https://t.me/zPrFWL" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          Наш telegram
        </a>
        <a href="https://www.instagram.com/zprfwl/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
          Наш instagram
        </a>
      </div>

      <div style={sectionStyle}>
        <h3>Поддержка</h3>
        <p>Если у вас есть вопросы, обращайтесь в нашу<a href="https://t.me/zPrFWL" target="_blank" rel="noopener noreferrer" style={linkStyle}>службу поддержки.</a></p>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
