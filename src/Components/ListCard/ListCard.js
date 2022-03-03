import React from 'react';
import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:3000";

const ListCard = () => {
  var socket = io(ENDPOINT);

  socket.on('connected', () =>   {
      console.log('Connected to server');
  });
  
  socket.on('categories', (data) => {
      console.clear();
      console.table(data);
  });

  return (
    <div className='listCard'>
      <div className='listCard__header'>
        <h1 className='listCard__header__title'>
          Awards 2021
        </h1>
      </div>
      <div className='listCard__list'>
        <div className='listCard__list__item'>
          <h1 className='listCard__list__item__ranking'>
            1
          </h1>
          <h2 className='listCard__list__item__category'>
            Category  
          </h2>
          <h3 className='listCard__list__item__categoryName'>
            Best Actor
          </h3>
          <div className='listCard__list__item__photo'>
            <img src='https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg' alt='Nomadland' />
          </div>
          <div className='listCard__list__item__title'>
            Nomadland
          </div>
        </div>
      </div>
      <div className='listCard__footer'>
        </div>
    </div>
  );
}

export default ListCard;