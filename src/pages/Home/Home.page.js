import React, { Component } from 'react';
import { HomeContainer, HeaderContainer, Actions, SearchContainer, ContentContainer } from './Home.style';
import Header from '../../components/Header/Header.component';
import Searchbar from '../../components/SearchBar/Searchbar.component';
import CheckBox from '../../components/Checkbox/Checkbox.component';
import toolsServices from '../../services/toolsServices';
import MyButton from '../../components/Button/Button.component';
import { Card, CardContent, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      search: '',
      searchInTags: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    const response = await toolsServices.findAllTools();
    this.setState({
      tools: [...response],
    });
  }

  handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSearch = async () => {
    const { search, searchInTags } = this.state;
    let response = [];

    /* Verifica se a pesquisa será geral ou por tags */
    if (searchInTags) {
      response = await toolsServices.findByTags(search)
    }
    if (!searchInTags) {
      response = await toolsServices.findBySearch(search)
    }

    this.setState({
      tools: [...response]
    })
  }

  render() {
    const {
      state: { tools },
    } = this;
    return (
      <HomeContainer>
        <HeaderContainer>

          <Header titulo="VUTTR" subtitulo="Very Useful Tools to Remember" />
          <Actions>
            <SearchContainer>
              <Searchbar
                handleInputChange={this.handleInputChange}
                handleSearch={this.handleSearch}
              />
              <CheckBox
                handleInputChange={this.handleInputChange}
                state={this.state}
              />
            </SearchContainer>

            <MyButton size='medium' variant='contained' color='primary' name="+ Add" />
          </Actions>

        </HeaderContainer>
        <ContentContainer>
          {tools.map(tool => (
            <Card key={tool.id} style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h5" component='a'>
                  {tool.title}
                </Typography>
                <MyButton size='small' name='Remove' color='secondary'>
                  <DeleteIcon fontSize='small' />
                </MyButton>
                <Typography variant="h6" component="h2">
                  {tool.description}
                </Typography>
                <Typography variant="body2">
                  {tool.tags.map((tag, index) => <span key={index}>{`#${tag} `}</span>)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ContentContainer>
      </HomeContainer>
    );
  }
}

export default Home;
