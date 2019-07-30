import React, { Component } from 'react';
import { HomeContainer, HeaderContainer } from './Home.style'
import Header from '../../components/Header/Header.component';
import Searchbar from '../../components/SearchBar/Searchbar.component';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import CheckBox from '../../components/Checkbox/Checkbox.component';
import toolsServices from '../../services/toolsServices';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: []
        }
    }

    async componentDidMount() {
        const response = await toolsServices.findAllTools();
        this.setState({
            tools: [...response],
        })
    }

    render() {
        const { state: { tools } } = this;
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
                <div>
                    {tools.map(tool => <p>{tool.title}</p>)}
                </div>
            </HomeContainer>
        );
    }
}

export default Home;