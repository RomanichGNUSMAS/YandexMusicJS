class YandexMusic {
    #liked;
    #allMusics = new Set();
    #PlaylistColor;
    #prevSelected = null;
    #queue = [];
    constructor() {
        this.#liked = new Set();
        this.#PlaylistColor = 'unknown';
    }

    customSet(theme){
        let res = [];
        this.#prevSelected = 'wave';
        for(let i of this.#allMusics){
            if(i.type && i.type.toLowerCase() === theme.toLowerCase()){
                res.push(i);
            }
        }
        if(res.length === 0) res = [...this.#allMusics];
        let i = 0;
        let gen = this.next(res,i);
        if(this.#prevSelected != 'unknown') while(this.#queue.length) clearInterval(this.#queue.pop())
        this.#prevSelected = theme;
        let wave = setInterval(() => {
            let val = gen.next();
            if(!val.value?.name) {clearInterval(wave); return;}
            console.log(`Playing ${val.value.name}`);
        },1000)
        this.#queue.push(wave);
    }
    getMusic(name){
        let found = [...this.#allMusics].filter(t => t.name.toLowerCase() === name.toLowerCase());
        return found.length == 0 ? false : found[0];
    }
    #checkLikedTypes() {
        if(this.#liked.size == 0) return;
        const map = new Map();
        for(let i of this.#liked){
            if(map.has(i.type)){
                map.set(i.type, map.get(i.type) + 1);
                continue;
            }
            map.set(i.type, 1);
        }
        let max  = [[...this.#liked][0].type,map.get([...this.#liked][0].type)];
        for(let i of this.#liked){
            if(max[1] < map.get(i.type)){
                max = [i.type,map.get(i.type)];
            }
        }
        this.#PlaylistColor = max[0];
        console.log(`Color changed to ${this.#PlaylistColor} you can share your color with friends`);
    }
     play(str) {
        switch (str){
            case 'my wave':
                if(this.#prevSelected != 'unknown') while(this.#queue.length) clearInterval(this.#queue.pop());
                this.#prevSelected = 'wave';
                let i = 0;
                let gen = this.next([...this.#allMusics],i);
                let my_wave = setInterval(() => {
                    let val = gen.next()
                    if(!val.value?.name) {clearInterval(my_wave); return};
                    console.log(`Playing ${val.value?.name}`);
                }, 1000);
                this.#queue.push(my_wave);
                return;
            case 'liked':
               if(this.#prevSelected != 'unknown') while(this.#queue.length) clearInterval(this.#queue.pop());
                this.#prevSelected = 'liked';
                let j = 0;
                let gen1 = this.next([...this.#liked],j)
                let liked = setInterval(() => {
                    let val = gen1.next()
                    if(!val.value?.name) { clearInterval(liked); return; }
                    console.log(`Playing ${val.value.name}`);
                },1000)
                this.#queue.push(liked);
                return;
            default:
                throw new Error('Unknown playlist');
            
        }
    }
   *next(playList,i){
        if(!Number.isInteger(i)) throw new Error('invalid Index');
        while(i < playList.length) {
            yield playList[i++];
        }
    }
    like(song){
        if(!(song instanceof Music)) throw new TypeError('Invalid music type');
        if(this.#liked.has(song)) return true;;
        this.#liked.add(song);
        song.liked = true;
        this.#checkLikedTypes(song);
        return true;
    }

    addMusic(song){
        let a = false;
        this.#allMusics.forEach(t => {
            if(t.name === song.name && t.type === song.type) a = true;
        })
        if(a) return;
        this.#allMusics.add(song);
    }

    searchMusic(name,option){
        if(/[^a-zA-Z]/g.test(option)) throw new Error('Invalid Option');
        for(let i of this.#allMusics){
            if(i.name.toLowerCase() === name.toLowerCase()){
                switch(option){
                    case 'like':
                        let res = this.like(i);
                        if(!res) throw new Error('Something went wrong try again');
                        return res;
                    case 'play':
                        while(this.#queue.length){
                            clearInterval(this.#queue.pop());
                        }
                        setTimeout(() => {
                            console.log(`Playing ${name}`);
                        },1000);
                }
                break;
            }
        }
        return false;
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
                break;
            case 'deep house':
                this.color = 'red';
                break;
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