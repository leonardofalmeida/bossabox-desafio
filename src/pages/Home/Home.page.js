import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography, CircularProgress, TextField } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import {
	Container, Actions, LinkTitle, HeaderCard, SearchActions, Header, Content,
} from './Home.style';

import TitleGroup from '../../components/TitleGroup/TitleGroup.component';
import Searchbar from '../../components/SearchBar/Searchbar.component';
import Checkbox from '../../components/Checkbox/Checkbox.component';
import toolsServices from '../../services/toolsServices';
import MyButton from '../../components/Button/Button.component';
import MyCard from '../../components/Card/Card.component';
import { TOOL_MODEL } from '../../constants/models';
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage.component';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tools: [],
			search: '',
			searchInTags: false,
			loading: true,
			openModalRemove: false,
			openModalAddTool: false,
			idRemoveTool: null,
			tool: TOOL_MODEL,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleDeleteTool = this.handleDeleteTool.bind(this);
	}

	async componentDidMount() {
		this.loadTools();
	}

	/* Carrega as ferramentas cadastradas no banco */
	loadTools = async () => {
		this.setLoading(true);
		try {
			const response = await toolsServices.findAllTools();
			this.setState({
				tools: [...response],
			});
			this.setLoading(false);
		} catch (error) {
			this.setLoading(false);
			alert(error);
		}
	}

	/* Controle de loading */
	setLoading = (loading = true) => {
		if (loading === true) {
			this.setState({
				loading: true,
			});
		} else {
			this.setState({
				loading: false,
			});
		}
	}

	/* Handlers para inputs do search e checkobox */
	handleInputChange = (event) => {
		const { target } = event;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	};

	/* Handlers dos inputs do forms */
	handleFormsChange = (event) => {
		const { target } = event;
		const { name } = target;
		const { value } = target;
		const { state: { tool } } = this;

		this.setState({
			tool: {
				...tool,
				[name]: value,
			},
		});
	}

	/* Serviço de pesquisar */
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

	/* Serviço de remover feeramenta */
	handleDeleteTool = async () => {
		const { idRemoveTool } = this.state;

		this.setLoading(true);

		/* Fecha a modal após o clique em remover */
		this.handleCloseModalRemove();

		try {
			await toolsServices.deleteTool(idRemoveTool);
			this.setLoading(false);
		} catch (error) {
			this.setLoading(false);
			alert(error);
		}
		/* Recarrega página, com o a nova lista */
		this.loadTools();
	}

	/* Serviço de cadastrar nova ferramenta */
	handleSubmit = async () => {
		const { tool } = this.state;

		this.setLoading(true);
		const cloneTool = {
			...tool,
		};

    	/*
			Retira espaços em brancos no final e do começo com o trim
			Separa a string, por espaço em branco
			Filtra as strings que vieram como "", no caso do usuário
			ter dado mais de um espaço
		*/
		if (cloneTool.tags.length !== 0) {
			cloneTool.tags = cloneTool.tags.trim().split(' ').filter(item => item !== '');
		}

		try {
			await toolsServices.saveTool(cloneTool);
			this.setLoading(false);
		} catch (error) {
			alert(error);
			this.setLoading(false);
		}

		/* Fecha modal */
		this.handleCloseModalAddTool();

		/* Recarrega página, com o a nova lista */
		this.loadTools();
	}

	/* Handlers de abrir e fechar modais */
	handleOpenModalRemove = (id) => {
		this.setState({
			openModalRemove: true,
			idRemoveTool: id,
		});
	}

	handleOpenModalAddTool = () => {
		this.setState({
			openModalAddTool: true,
		});
	}

	handleCloseModalRemove = () => {
		this.setState({
			openModalRemove: false,
		});
	}

	handleCloseModalAddTool = () => {
		this.setState({
			openModalAddTool: false,
		});
	}

	render() {
		const {
			state: {
				tools, loading, openModalRemove, openModalAddTool,
			},
		} = this;
		return (
			<>
				<Container>

					{/* Header */}
					<Header>
						<TitleGroup title='VUTTR' subtitle='Very Useful Tools to Remember' />
						<Actions>
							<SearchActions>
								<Searchbar
									handleInputChange={this.handleInputChange}
									handleSearch={this.handleSearch}
									placeholder={'Search for a tool'}
								/>
								<Checkbox
									handleInputChange={this.handleInputChange}
									state={this.state}
									label={'Search only in tags'}
								/>
							</SearchActions>

							<MyButton size='medium' variant='contained' color='primary' name='+ Add' onClick={this.handleOpenModalAddTool} />
						</Actions>
					</Header>

					{/* Utils */}
					{loading
						&& <CircularProgress />
					}

					{tools.length === 0
						&& (
							<EmptyMessage emptyText='No tools found :(' />
						)
					}

					{/* Content */}
					<Content>
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
									<MyButton
										size='small'
										name='Remove'
										color='secondary'
										onClick={() => this.handleOpenModalRemove(tool.id)}
									>
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
					</Content>

					{/* Modais */}
					<ModalAddTool
						openModalAddTool={openModalAddTool}
						handleCloseModalAddTool={this.handleCloseModalAddTool}
						handleFormsChange={this.handleFormsChange}
						handleSubmit={this.handleSubmit}
					/>

					<ModalConfirmDelete
						openModalRemove={openModalRemove}
						handleDeleteTool={this.handleDeleteTool}
						handleCloseModalRemove={this.handleCloseModalRemove}
					/>

				</Container>
			</>
		);
	}
}

const ModalConfirmDelete = ({
	openModalRemove, handleDeleteTool, handleCloseModalRemove,
}) => (
		<Dialog open={openModalRemove}>

			<DialogTitle id='alert-dialog-title'>
				{'X Remove tool'}
			</DialogTitle>

			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Are you sure you want to remove tool?
			</DialogContentText>
			</DialogContent>

			<DialogActions>
				<MyButton onClick={handleCloseModalRemove} color='primary'>
					Cancel
				</MyButton>
				<MyButton onClick={handleDeleteTool} color='primary' autoFocus>
					Yes, remove
			</MyButton>
			</DialogActions>

		</Dialog>
	);

ModalConfirmDelete.propTypes = {
	openModalRemove: PropTypes.bool.isRequired,
	handleDeleteTool: PropTypes.func.isRequired,
	handleCloseModalRemove: PropTypes.func.isRequired,
};

const ModalAddTool = ({
	openModalAddTool, handleCloseModalAddTool, handleFormsChange, handleSubmit,
}) =>
	(
		<Dialog open={openModalAddTool}>

			<DialogTitle id='alert-dialog-title'>
				{'+ Add tool'}
			</DialogTitle>

			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='title'
					label='Tool name'
					name='title'
					fullWidth
					onChange={handleFormsChange}
				/>
				<TextField
					margin='dense'
					id='link'
					label='Tool link'
					name='link'
					fullWidth
					onChange={handleFormsChange}
				/>
				<TextField
					margin='dense'
					id='description'
					label='Tool description'
					name='description'
					multiline
					rowsMax='5'
					fullWidth
					onChange={handleFormsChange}
				/>
				<TextField
					margin='dense'
					id='tags'
					label='Tags'
					name='tags'
					fullWidth
					onChange={handleFormsChange}
				/>
			</DialogContent>

			<DialogActions>
				<MyButton variant='outlined' onClick={handleCloseModalAddTool} color='secondary' autoFocus>
					Cancel
    			</MyButton>

				<MyButton onClick={handleSubmit} variant='contained' color='primary' autoFocus>
					ADD TOOL
   				</MyButton>
			</DialogActions>

		</Dialog>
	);

ModalAddTool.propTypes = {
	openModalAddTool: PropTypes.bool.isRequired,
	handleCloseModalAddTool: PropTypes.func.isRequired,
	handleFormsChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default Home;
