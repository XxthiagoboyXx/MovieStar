//Gera uma lista de filmes do tamanho desejado.
export function getListMovies(size, movies) {
    let popularMovies = [];

    for (let i = 0, l = size; i < l; i++) {
        popularMovies.push(movies[i])
    }

    return popularMovies;
}

//Gera um numero aleatorio com base no tamanho da lista de filmes passada
export function randomBanner(movies) {
    return Math.floor(Math.random() * movies.length)
}

