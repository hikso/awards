const Nominee = require("./nominee");
const { v4: uuidv4 } = require('uuid');

class Category {
    constructor(name = '', nominees = []) {
        this.id = uuidv4();
        this.nominees = nominees;
        this.name = name;
    }

    addNominee(nominee = new Nominee()) {
        this.nominees.push(nominee);
    }

    deleteNominee( id = '' ){
        this.nominees = this.nominees.filter(nominee => nominee.id !== id);
    }
    
    voteNominee(id = ''){
        this.nominees = this.nominees.filter(nominee => {
            if(nominee.id === id){
                nominee.votes++;
            }
            return nominee;
        });
    }

}

module.exports = Category;