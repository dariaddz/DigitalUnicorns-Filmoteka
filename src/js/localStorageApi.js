
const localStorageApi = {

    // Читає файл `key` з бібліотеки
    getMovies(key) {        
        const keyStorage = this.load(key);

        if(Array.isArray(keyStorage)) return keyStorage;
        
        this.save(key, []);
        return [];
    },
    
    // У файл `key` записує `value`.
    addMovie(key, value) {        
        const dataFromLocalStorage = this.load(key);
        this.save(key, [value, ...dataFromLocalStorage]);
        },

    // З файлу `key` видаляє `value`.
    removeMovie(key, value) {
        const dataFromLocalStorage = this.load(key);
        const truncatedArray = dataFromLocalStorage.filter((el) => el.id !== value);
        this.save(key, truncatedArray);
     },

    load(key){
        try {
            const serializedState = localStorage.getItem(key);

            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (err) {
            console.error('Get state error: ', err);
        }
    },

    save(key, value){
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            console.error('Set state error: ', err);
        }
    }
}
export default localStorageApi;
