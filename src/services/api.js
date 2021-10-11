import axios from 'axios';

// URL FILMES EM CARTAZ:
// https://api.themoviedb.org/3/movie/now_playing?api_key=b0e0dd0506d5ef1c9b93090f9abd1f36&language=pt-BR&page=1

// Exemplo de Requisição:
// /movie/now_playing &language=pt-BR &page=1

export const key = 'b0e0dd0506d5ef1c9b93090f9abd1f36'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;