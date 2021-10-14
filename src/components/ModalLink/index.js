import React from 'react';

import { BackButton, Name } from './styles';
import { Feather } from '@expo/vector-icons';

import { WebView } from 'react-native-webview';


function ModalLink({ link, title, closeModal }) {

    //foi utilizado fragment <> pois a View tem estilo e nessa situação era necessário que o elemento não o tivesse.
    return (
        <>
            <BackButton activeOpacity={0.7} onPress={closeModal}>
                <Feather name="x" size={35} color="#FFF" />
                <Name numberOfLines={1} >{title}</Name>
            </BackButton>

            <WebView
                source={{ uri: link }}
            />

        </>
    );
}

export default ModalLink;