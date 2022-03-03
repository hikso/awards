const Category = require("./category");

class Categories {
    constructor() {
        this.categories = [];
    }

    addCategory(category = new Category()) {
        this.categories.push(category);
    }

    getCategories() {
        // sort nominees by votes
        this.categories.forEach(category => {
            category.nominees.sort((a, b) => {
                return b.votes - a.votes;
            });
        });
        return this.categories;
    }

    getCategory(id) {
        return this.categories.find(category => category.id === id);
    }

    deleteCategories( id = '' ){
        this.categories = this.categories.filter(category => category.id !== id);
    }

}

module.exports = Categories;