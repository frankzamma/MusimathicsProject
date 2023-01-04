class Cellula{
    constructor() {
        this.viva = false;
    }

    isViva(){
        return this.viva;
    }

    nascita(){
        this.viva = true;
    }

    morte(){
        this.viva = false;
    }

}

export {Cellula};