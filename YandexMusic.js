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
        let max = map.get(this.#allMusics[0].name)
        for(let i = 0;i < this.#allMusics.length; ++i){
            if(max < this.#allMusics[i]){
                max = map.get(this.#allMusics[i].name);
            }
        }
        console.log(max)
    }
    async play(str) {
        switch (str){
            case 'my wave':
                this.#prevSelected = 'wave';
                let id = setInterval(() => {
                    console.log(`${this.next()}`)
                }, 1000);
                return id;
            case 'liked':
                this.#prevSelected = 'liked';
                break;
            default:
                throw new Error('Unknown playlist');
            
        }
    }
    async next(){
        if(!this.#started) {
            this.#started = true;
        }
        console.log(`Playing ${this.#allMusics[YandexMusic.counter++].name}`);
    }
    async like(song){
        if(!(song instanceof Music)){
            if(typeof song === 'string'){
                for(let i of this.#allMusics){
                    if(i.name.includes(song)){
                        this.#liked.push(i);
                        this.#checkLikedTypes(song);
                        return true;
                    }
                }
            }
            return false
        }
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
        switch (type.toLowerCase()) {
            case 'bass':
                this.color = 'blue';
                break
            case 'rock':
                this.color = 'orange';
                break;
            case 'sad':
                this.color = 'blue';
                break;
            case 'armenian':
                this.color = 'red';
            default:
                this.color = 'green';
                break;
        }
    }
}

const server = new YandexMusic();
server.addMusic(new Music('Illusion','sad'));
server.addMusic(new Music('Gam Gam','Armenian'))
server.like('Gam Gam')
server.like('Illusion');
server.like('Illusion')
