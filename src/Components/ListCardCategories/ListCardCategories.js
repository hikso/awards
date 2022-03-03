import React from 'react';
import PropTypes from 'prop-types';
import './ListCardCategories.css';
import ListCardNominees from '../ListCardNominees/ListCardNominees';

const ListCardCategories = ({categories, onSelectNominee, nomineesSelected}) => {
    console.log('ListCardCategories.js: categories: ', categories);
    return (
        <div className='listCard__categories'>
            { categories && categories.map((category) => {
                return (
                    <div className='listCard__categories__category' key={category.id}>
                        <h2 className='listCard__list__item__categoryName'>
                            {category.name}
                        </h2>
                        <ListCardNominees
                            nominees={category.nominees} 
                            onSelectNominee={onSelectNominee} 
                            categoryId={category.id} 
                            nomineesSelected={nomineesSelected} />
                    </div>
                
                );
            })}
        </div>
    );
}
ListCardCategories.propTypes = {
    categories: PropTypes.array.isRequired,
    onSelectNominee: PropTypes.func.isRequired,
    nomineesSelected: PropTypes.object.isRequired
};

export default ListCardCategories;