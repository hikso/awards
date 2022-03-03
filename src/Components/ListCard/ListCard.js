import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import './ListCard.css';
import ListCardCategories from '../ListCardCategories/ListCardCategories';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    zIndex: '2',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ENDPOINT = "http://127.0.0.1:3000";

const ListCard = () => {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  let socket = io(ENDPOINT);

  const [categories, setCategories] = useState([]);
  const [nomineesSelected, setNomineesSelected] = useState({});


  socket.on('connected', () =>   {
      console.log('Connected to server');
  });
  

  useEffect(() => {
    socket.on('categories', (data) => {
      setNomineesSelected({});
      setCategories(data);
    });
  }, []);
  
  const onSelectNominee = (_nominee, categoryId) => {
    //rest 1 vote if it was a different nominee
    if (nomineesSelected[categoryId] && nomineesSelected[categoryId].id !== _nominee.id) {
      const category = categories.find(category => category.id === categoryId);
      const nomineeIndex = category.nominees.findIndex(nominee => nominee.id === nomineesSelected[categoryId].id );
      category.nominees[nomineeIndex].votes--;
    }
    if (nomineesSelected[categoryId] && nomineesSelected[categoryId].id === _nominee.id) {
      return;
    }

    nomineesSelected[categoryId] = _nominee;
    setNomineesSelected({...nomineesSelected});

    //find nominee in categories and update votes
    const category = categories.find(category => category.id === categoryId);
    const nomineeIndex = category.nominees.findIndex(nominee => nominee.id === _nominee.id);
    category.nominees[nomineeIndex].votes++;



    setCategories([...categories]);
  }

  const submitSelection = () => {
    socket.emit('submitSelection', nomineesSelected);
    openModal();
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


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
          <h1 className='modal__success'>
            Success!
          </h1>
      </Modal>
    </div>
  );
}

export default ListCard;