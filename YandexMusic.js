class YandexMusic {
    static counter = 0;
    #liked;
    #allMusics = new Set();
    #PlaylistColor;
    #started = false;
    #prevSelected = null;
    constructor() {
        this.#liked = new Set();
        this.previous = null;
        this.#PlaylistColor = 'unknown';
    }

    async #checkLikedTypes() {
        const map = new Map();

        for(let i = 0;i < this.#liked.length;i++){
            if(map.has([...this.#liked][i].type)){
                map.set([...this.#liked][i].type, map.get([...this.#liked][i].type) + 1);
            }
            map.set([...this.#liked][i].type, 1);
        }
        let max  = [[...this.#liked][0].type,map.get([...this.#liked][0].type)];
        for(let i = 0;i < this.#liked.length; ++i){
            if(max[1] < map.get([...this.#liked][i].type)){
                max = [[...this.#liked][i].type,map.get([...this.#liked][i].type)];
            }
        }
        console.log(max)
    }
    async play(str) {
        switch (str){
            case 'my wave':
                this.#prevSelected = 'wave';
                let my_wave = setInterval(() => {
                    this.next(this.#allMusics,0);
                }, 1000);
                return my_wave;
            case 'liked':
                this.#prevSelected = 'liked';
                let liked = setInterval(() => {
                    this.next(this.#liked,0)
                })
                return liked;
            default:
                throw new Error('Unknown playlist');
            
        }
    }
    async next(playList,i = 0){
        if(!this.#started) {
            this.#started = true;
        }
        console.log(`Playing ${this.playList[i++].name}`);
    }
    async like(song){
        if(!(song instanceof Music)) throw new TypeError('Invalid music type');
        if(this.#liked.has(song)) return true;;
        this.#liked.add(song);
        this.#checkLikedTypes(song);
    }

    async addMusic(song){
        if(this.#allMusics.has(song)) return;
        this.#allMusics.add(song);
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
let illusia = new Music('Illusion','sad')
server.addMusic(new Music('Gam Gam','Armenian'))
server.like(illusia)
