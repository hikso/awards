import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import './ListCard.css';
import ListCardCategories from '../ListCardCategories/ListCardCategories';

const ENDPOINT = "http://127.0.0.1:3000";

const ListCard = () => {
  let socket = io(ENDPOINT);

  const [categories, setCategories] = useState([]);
  const [nomineesSelected, setNomineesSelected] = useState({});


  socket.on('connected', () =>   {
      console.log('Connected to server');
  });
  

  useEffect(() => {
    socket.on('categories', (data) => {

      setCategories(data);
    });
  }, []);
  
  const onSelectNominee = (_nominee, categoryId) => {
    nomineesSelected[categoryId] = _nominee;

    setNomineesSelected({...nomineesSelected});

    //reset all votes
    categories.forEach(category => {
      if(category.id === categoryId){
        category.nominees.forEach(nominee => {
          nominee.votes = 0;
        });
      }
    });

    //find nominee in categories and update votes
    const category = categories.find(category => category.id === categoryId);
    const nomineeIndex = category.nominees.findIndex(nominee => nominee.id === _nominee.id);
    category.nominees[nomineeIndex].votes++;

    setCategories([...categories]);
  }

  const submitSelection = () => {
    socket.emit('submitSelection', nomineesSelected);
  }

  return (
    <div className='listCard'>
      <button className='listCard__floatingButton' onClick={() => {submitSelection()}}>
        Submit my selection
      </button>
      <div className='listCard__header'>
        <h1 className='listCard__header__title'>
          Awards 2021
        </h1>
      </div>
      <ListCardCategories
        categories={categories} 
        onSelectNominee={onSelectNominee} 
        nomineesSelected={nomineesSelected}/>
    </div>
  );
}

export default ListCard;