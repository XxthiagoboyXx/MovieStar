import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';

import { Container, ListMovies } from './styles';

import { getMoviesSave, deleteMovie } from '../../utils/storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

function Stars() {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); //toda vez que sair da tela o isFocused se torna falso e toda vez que entrar na tela se torna true. Útil para atualizar a lista sem precisar reabrir o app

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getFavoriteMovies() {
            const result = await getMoviesSave("@StarMovie");

            if (isActive) {
                setMovies(result);
            }

        }

        if (isActive) {
            getFavoriteMovies();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused]);

    async function handleDelete(id) {
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item) {
        navigation.navigate('Detail', { id: item.id })
    }

    return (
        <Container>
            <Header title="Meus filmes" />

            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <FavoriteItem
                        data={item}
                        deleteMovie={handleDelete}
                        navigatePage={() => navigateDetailsPage(item)}
                    />
                )}
            />

        </Container>
    );
}

export default Stars;