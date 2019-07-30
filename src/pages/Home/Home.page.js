import React, { Component } from 'react';
import { HomeContainer, HeaderContainer } from './Home.style'
import Header from '../../components/Header/Header.component';
import Searchbar from '../../components/SearchBar/Searchbar.component';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import CheckBox from '../../components/Checkbox/Checkbox.component';

class Home extends Component {
    render() {
        return (
            <HomeContainer>
                <HeaderContainer>
                    <Header
                        titulo='VUTTR'
                        subtitulo='Very Useful Tools to Remember'
                    />
                    <Searchbar></Searchbar>
                    <CheckBox></CheckBox>
                </HeaderContainer>
            </HomeContainer>
        );
    }
}

export default Home;