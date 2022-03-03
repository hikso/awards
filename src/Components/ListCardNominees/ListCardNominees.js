import React from 'react';
import PropTypes from 'prop-types';
import './ListCardNominees.css';

const ListCardNominees = ({nominees, onSelectNominee, categoryId, nomineesSelected}) => {
    
    const {id} = nomineesSelected[categoryId] ?? 0;

    return (
        <div className='listCard__list'>
            { nominees &&  nominees.map((nominee, i) => {
                return (
                    <div className={`listCard__list__item ${id === nominee.id ? 'listCard__list__item--selected':''}`} key={nominee.id}>
                        <h1 className='listCard__list__item__ranking'>
                            {i + 1}
                        </h1>
                        <div className='listCard__list__item__body'>
                            <span className='listCard__list__item__label'>
                                Nominee:
                            </span>
                            <span className='listCard__list__item__title'>
                                {nominee.title}
                            </span>
                            <div className='listCard__list__item__votes'>
                                {nominee.votes}
                            </div>
                            <div className='listCard__list__item__photo'>
                                <img src={nominee.photoUrL} alt='Nomadland' />
                            </div>
                        </div>
                        <div className='listCard_list_item_hover_button'>
                            <div className='listCard__list__item__hover_button__upvote'>
                                <button className='listCard__list__item__button' onClick={()=>{onSelectNominee(nominee, categoryId)}}>
                                    Select
                                </button>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}

ListCardNominees.propTypes = {
    nominees: PropTypes.array.isRequired,
    onSelectNominee: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    nomineesSelected: PropTypes.object.isRequired
};

export default ListCardNominees;