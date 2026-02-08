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
    getMusic(name){
        let found = [...this.#allMusics].filter(t => t.name === name);
        return found.length == 0 ? false : found[0];
    }
    async #checkLikedTypes() {
        const map = new Map();

        for(let i of this.#liked){
            if(map.has(i.type)){
                map.set(i.type, map.get(i.type) + 1);
            }
            map.set(i.type, 1);
        }
        let max  = [[...this.#liked][0].type,map.get([...this.#liked][0].type)];
        for(let i of this.#liked){
            if(max[1] < map.get(i.type)){
                max = [i.type,map.get(i.type)];
            }
        }
    }
    async play(str) {
        switch (str){
            case 'my wave':
                this.#prevSelected = 'wave';
                let i = 0;
                let gen = this.next([...this.#allMusics],i);
                let my_wave = setInterval(() => {
                    if(i === this.#allMusics.size - 1) clearInterval(my_wave)
                    console.log(`Playing ${gen.next([...this.#allMusics],i++).value?.name}`);
                }, 1000);
                return my_wave;
            case 'liked':
                this.#prevSelected = 'liked';
                let liked = setInterval(() => {
                    console.log(`Playing ${this.next([...this.#liked],0)}`);
                },1000)
                return liked;
            default:
                throw new Error('Unknown playlist');
            
        }
    }
   *next(playList,i = 0){
        let got = yield playList[i++];
        while(true) {
            got = yield got[i++];
        }
    }
    async like(song){
        if(song.liked) return;
        if(!(song instanceof Music)) throw new TypeError('Invalid music type');
        if(this.#liked.has(song)) return true;;
        this.#liked.add(song);
        song.liked = true;
        this.#checkLikedTypes(song);
    }

    async addMusic(song){
        if(this.#allMusics.has(song)) return;
        this.#allMusics.add(song);
    }
}

class Music {
    constructor(name,type){
        this.liked = false;
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
server.addMusic(new Music('Shot a friend','sad'))
server.like(server.getMusic('Gam Gam'))
let id = server.play('my wave')