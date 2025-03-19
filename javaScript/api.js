class Fetch {
    constructor() {
        this.gameTypes = {
            Sudoku : "sudoku/generator",
            Minesweeper : "minesweeper/generator",
            Takuzu : "takuzu/generator",
            WordSearch : "wordsearch/generator",
            Countries : "countries/capital-quiz",
            Kuromasu : "kuromasu/generator",
            Memory : "memory/generator"
        };
    }

    async fetchData(url,parameters = [""],key = "") {
        try {
            const finalURL = new URL(url);
            Object.keys(parameters).forEach(param =>{
                finalURL.searchParams.append(param,parameters[param]);
            });
    
            const response = await this.setResponse(finalURL,key);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
    async setResponse(url,key) {
        if(key == "") return await fetch(url);
        
        return await fetch(url.toString(),{
            headers:{
                Authorization: "Bearer " + key
            }
        });
    }

    async getGameData(gameType) {
        const url = "https://shadify.yurace.pro/api/" + gameType;
        const result = await this.fetchData(url);
        return result;
    }
    
}

let fetchManager = new Fetch();
/*fetchManager.getGameData(fetchManager.gameTypes.Minesweeper).then((data)=>{
    console.log(data);
});*/

export {fetchManager}