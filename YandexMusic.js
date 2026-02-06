class YandexMusic {
    static counter = 0;
    #liked;
    #allMusics = [];
    #PlaylistColor;
    #started = false;
    #prevSelected = null;
    constructor() {
        this.#liked = [];
        this.previous = null;
        this.#PlaylistColor = 'unknown';
    }

    async #checkLikedTypes() {
        const map = new Map();
        for(let i = 0;i < this.#liked.length;i++){
            if(map.has(this.#liked[i].type)){
                map.set(this.#liked[i].type, map.get(this.#liked[i].type) + 1);
            }
            map.set(this.#liked[i].type, 1);
        }
        let max = map.entries(this.#liked[0].type);
        console.log(map);
    }
    async play(str) {
        switch (str){
            case 'my wave':
                this.#prevSelected = 'wave';
                break;
            case 'liekd':
                this.#prevSelected = 'liked';
                break;
            default:
                throw new Error('Unknown playlist');
            
        }
    }
    async next(){
        if(!this.#started) {
            this.#started = true;
            this.play()
        }
        console.log(`Playing ${this.#allMusics[++YandexMusic.counter].name}`);
    }
    async like(song){
        this.#liked.push(song);
        this.#checkLikedTypes(song);
    }

    async addMusic(song){
        this.#allMusics.push(song);
    }
}

class Music {
    constructor(name,type){
        this.name = name;
        this.type = type;
        switch (type) {
            case 'bass':
                this.color = 'blue';
                break
            case 'rock':
                this.color = 'orange';
                break;
            case 'sad':
                this.color = 'blue';
                break;
            default:
                this.color = 'green';
                break;
        }
    }
}

const server = new YandexMusic();
