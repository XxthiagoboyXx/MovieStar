import AsyncStorage from "@react-native-async-storage/async-storage";

//é padrão da biblioteca utilizar funções async

//Buscar os filmes salvos
export async function getMoviesSave(key) {
    const myMovies = await AsyncStorage.getItem(key) //salva em string

    let moviesSave = JSON.parse(myMovies) || []; //passa novamente para lista

    return moviesSave;
}


//Salvar um novo filme
export async function saveMovie(key, newMovie) {
    let moviesStored = await getMoviesSave(key);

    const hasMovie = moviesStored.some(item => item.id === newMovie.id) //verifica se dentro da array existe pelo menos um filme igual ao passado como argumento

    if (hasMovie) {
        console.log("Esse filme já existe na sua lista");
        return;
    }

    moviesStored.push(newMovie) //coloca o filme na array em memória

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored)) //coloca a lista de filmes que está em memória no arquivo salvo no formato string
    console.log("Filme salvo com sucesso!");
}


//Deletar algum filme específico
export async function deleteMovie(id) {
    let moviesStored = await getMoviesSave('@StarMovie');

    let myMovies = moviesStored.filter(item => {
        return (item.id !== id) //retorna todos os filmes com exceção do que está sendo deletado
    })

    await AsyncStorage.setItem("@StarMovie", JSON.stringify(myMovies));
    console.log("Filme deletado com sucesso");

    return myMovies;
}


//Filtrar algum filme está salvo na lista.
export async function hasMovie(movie) {
    let moviesStored = await getMoviesSave('@StarMovie');

    //procura se o filme passado está na lista e retorna true ou false
    const hasMovie = moviesStored.find(item => item.id === movie.id)

    if (hasMovie) {
        return true;
    }

    return false;
}