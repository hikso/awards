const { v4: uuidv4 } = require('uuid');

class Nominee {
    constructor(photoUrL = '', title = 'without name', votes = 0) {
        this.id = uuidv4();
        this.photoUrL = photoUrL;
        this.title = title;
        this.votes = votes;
    }
}

module.exports = Nominee;