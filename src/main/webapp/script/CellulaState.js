class CellulaState{
    constructor() {
        this.state = 0;
    }

    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;
    }
}

export{CellulaState}