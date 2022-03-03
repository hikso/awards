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

    deleteCategories( id = '' ){
        this.categories = this.categories.filter(category => category.id !== id);
    }

}

module.exports = Categories;