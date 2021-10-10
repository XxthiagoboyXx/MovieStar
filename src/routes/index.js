import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Stars from '../pages/Stars';
import StackRoutes from './stackRoutes';

const Drawer = createDrawerNavigator();

function Routes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#090A0E', //cor de fundo 
                    paddingTop: 20,
                },

                drawerActiveBackgroundColor: '#E72F49', //cor de background do escolhido
                drawerActiveTintColor: '#FFF', //cor do texto selecionado
                drawerInactiveTintColor: '#FFF' //cor do texto nao selecionado
            }}

        >
            <Drawer.Screen
                name="HomeDrawer"
                component={StackRoutes}
                options={{
                    title: 'Descubra Filmes', //para subsitituir o HomeDrawer
                    drawerIcon: ({ focused, size, color }) => ( //passa como parametro os valores da linha 21,22,23
                        <MaterialCommunityIcons
                            name="movie-open" //name={focused ? "movie-open" : "movie-outline"} //usar hover
                            size={size}
                            color={color}
                        />
                    )
                }}
            />


            <Drawer.Screen
                name="Minha Lista"
                component={Stars}
                options={{
                    title: "Minha Lista",
                    drawerIcon: ({ focused, size, color }) => (
                        <FontAwesome5
                            name="tasks" //name={focused ? "archive" : "archive-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

export default Routes;