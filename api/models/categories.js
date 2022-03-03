const Category = require("./category");

class Categories {
    constructor() {
        this.categories = [];
    }

    addCategory(category = new Category()) {
        this.categories.push(category);
    }

    getCategories() {
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