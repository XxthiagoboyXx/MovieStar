import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import {
    Container,
    SearchContainer,
    Input,
    SearchButton,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';

import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';

import { useNavigation } from '@react-navigation/native';



function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    const [bannerMovie, setBannerMovie] = useState({});

    const [input, setInput] = useState('');


    //contruindo o loading, já que se trata de uma função async
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies() {
            /*         const response = await api.get('/movie/now_playing', {
                            params: {
                                api_key: key,
                                language: 'pt-BR',
                                page: 1,
                            }
                        })*/

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),

            ])

            if (isActive) {

                //setNowMovies(nowData.data.results) traria uma lista com 20 filmes
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(15, popularData.data.results);
                const topList = getListMovies(10, topData.data.results);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]) //gera um numero aleatorio para ser a posicao a ser passada para o setbannermovie
                // exemplo: setBannerMovie(nowData.data.results[3)) //pega o terceiro filme da lista nowData e passa ele como o novo banner


                setNowMovies(nowList)
                setPopularMovies(popularList)
                setTopMovies(topList)

                setLoading(false);
            }

        }

        getMovies();

        //funcao anonima que faz algo quando o componente é desmontado (troca de tela)
        return () => {
            isActive = false;
            ac.abort(); //aborta as funções async que estavam ativas
        }


    }, []) //toda vez que o aplicativo abre e o nowMovies está vazio faz o que tá na função anônima

    function navigateDetailsPage(item) {
        navigation.navigate('Detail', { id: item.id }) //o parametro é o nome da rota (localizado em routes/stackRoutes)
    }

    function handleSearchMovie() {
        if (input === '') return;

        navigation.navigate('Search', { name: input })
        setInput('');
    }


    if (loading) {
        return (
            <Container style={{
                alignItens: "center",
                justifyContent: "center",
            }}>
                <ActivityIndicator size="large" color="#FFF" />
            </Container>
        )
    }

    return (
        <Container>
            <Header title="Movie Star" />

            <SearchContainer>
                <Input
                    placeholder="Ex: Free Guy"
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>

            </SearchContainer>


            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.83} onPress={() => navigateDetailsPage(bannerMovie)}>
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                />

                <Title>Populares</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                />

                <Title>Mais votados</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
                    keyExtractor={(item) => String(item.id)}
                />

            </ScrollView>


        </Container >
    );
}

export default Home;