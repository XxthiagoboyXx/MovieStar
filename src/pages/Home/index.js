import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

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
import { getListMovies } from '../../utils/movie';


function Home() {

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);


    useEffect(() => {
        let isActive = true;

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

            //setNowMovies(nowData.data.results) traria uma lista com 20 filmes
            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(15, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            setNowMovies(nowList)
            setPopularMovies(popularList)
            setTopMovies(topList)

        }

        getMovies();

    }, []) //oda vez que o aplicativo abre e o nowMovies está vazio faz o que tá na função anônima

    return (
        <Container>
            <Header title="Movie Star" />

            <SearchContainer>
                <Input
                    placeholder="Ex: Free Guy"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>

            </SearchContainer>


            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.83} onPress={() => alert('TESTE')}>
                    <Banner
                        resizeMethod="resize"
                        source={{ uri: 'https://images.unsplash.com/photo-1616712134411-6b6ae89bc3ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80' }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />

                <Title>Populares</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />

                <Title>Mais votados</Title>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />

            </ScrollView>


        </Container >
    );
}

export default Home;