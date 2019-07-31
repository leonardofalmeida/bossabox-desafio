import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	Container, HeaderContainer, Actions, SearchContainer, ContentContainer, LinkTitle, HeaderCard,
} from './Home.style';
import Header from '../../components/Header/Header.component';
import Searchbar from '../../components/SearchBar/Searchbar.component';
import CheckBox from '../../components/Checkbox/Checkbox.component';
import toolsServices from '../../services/toolsServices';
import MyButton from '../../components/Button/Button.component';
import MyCard from '../../components/Card/Card.component';

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

	handleInputChange = (event) => {
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
			response = await toolsServices.findByTags(search);
		}
		if (!searchInTags) {
			response = await toolsServices.findBySearch(search);
		}

		this.setState({
			tools: [...response],
		});
	}

	render() {
		const {
			state: { tools },
		} = this;
		return (
			<Container>
				<HeaderContainer>

					<Header title='VUTTR' subtitle='Very Useful Tools to Remember' />
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

						<MyButton size='medium' variant='contained' color='primary' name='+ Add' />
					</Actions>

				</HeaderContainer>

				<ContentContainer>
					{tools.map(tool => (
						<MyCard key={tool.id}>

							<HeaderCard>
								<LinkTitle
									href={tool.link}
									target='_blank'
									rel='noopener'
									underline='hover'
								>
									{tool.title}
								</LinkTitle>
								<MyButton size='small' name='Remove' color='secondary'>
									<DeleteIcon fontSize='small' />
								</MyButton>
							</HeaderCard>

							<Typography align='left' variant='h6'>
								{tool.description}
							</Typography>

							<Typography align='left' variant='body2'>
								{tool.tags.map((tag, index) => <span key={index}>{`#${tag} `}</span>)}
							</Typography>

						</MyCard>
					))}
				</ContentContainer>

			</Container>
		);
	}
}

export default Home;
