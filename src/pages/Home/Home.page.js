import React, { Component } from 'react';
import { Typography, CircularProgress, TextField } from '@material-ui/core';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TOOL_MODEL } from '../../constants/models';

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

	handleInputChange = (event) => {
		const { target } = event;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	};

	handleFormsChange = (event) => {
		const { target } = event;
		const { name } = target;
		const value = target.value;

		this.setState({
			tool: {
				...this.state.tool,
				[name]: value,
			}
		});
	}

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

	handleDeleteTool = async () => {
		const { idRemoveTool } = this.state;

		this.setLoading(true);
		this.handleCloseModalRemove();
		try {

			await toolsServices.deleteTool(idRemoveTool);
			await this.loadTools();
			this.setLoading(false);

		} catch (error) {

			this.setLoading(false);
			alert(error);

		}
	}

	handleSubmit = async () => {
		const { tool } = this.state;

		let cloneTool = {
			...tool,
		}

		/* 
			Retira espaços em brancos no final e do começo com o trim
			Separa a string, por espaço em branco
			Filtra as strings que vieram como "", no caso do usuário
			ter dado mais de um espaço
		*/
		if (cloneTool.tags.length !== 0) {
			cloneTool.tags = cloneTool.tags.trim().split(" ").filter(item => item !== "");
		}

		const response = await toolsServices.saveTool(cloneTool);
		console.log(response);
		this.handleCloseModalAddTool();
		this.loadTools();
	}

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
			state: { tools, loading, openModalRemove, openModalAddTool },
		} = this;
		return (
			<>
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

							<MyButton size='medium' variant='contained' color='primary' name='+ Add' onClick={this.handleOpenModalAddTool} />
						</Actions>

					</HeaderContainer>
					{loading
						&& <CircularProgress />
					}

					<ModalAddTool
						openModalAddTool={openModalAddTool}
						handleCloseModalAddTool={this.handleCloseModalAddTool}
						handleFormsChange={this.handleFormsChange}
						handleSubmit={this.handleSubmit}
					>
					</ModalAddTool>

					<ModalConfirmDelete
						openModalRemove={openModalRemove}
						handleDeleteTool={this.handleDeleteTool}
						handleCloseModalRemove={this.handleCloseModalRemove}
					></ModalConfirmDelete>

					{tools.length === 0
						&& (
							<div>
								<h4>No tools found :(</h4>
							</div>
						)
					}

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
					</ContentContainer>

				</Container>
			</>
		);
	}
}

const ModalConfirmDelete = ({ openModalRemove, handleDeleteTool, handleCloseModalRemove, handleSubmit }) => (
	<Dialog open={openModalRemove}>
		<DialogTitle id="alert-dialog-title">
			{'X Remove tool'}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Are you sure you want to remove tool?
          	</DialogContentText>
		</DialogContent>
		<DialogActions>
			<MyButton onClick={handleCloseModalRemove} color="primary">
				Cancel
          	</MyButton>
			<MyButton onClick={handleDeleteTool} color="primary" autoFocus>
				Yes, remove
          	</MyButton>
		</DialogActions>
	</Dialog>
);

const ModalAddTool = ({ openModalAddTool, handleCloseModalAddTool, handleFormsChange, handleSubmit }) => (
	<Dialog open={openModalAddTool}>
		<DialogTitle id="alert-dialog-title">
			{'+ Add tool'}
		</DialogTitle>
		<DialogContent>
			<TextField
				autoFocus
				margin="dense"
				id="title"
				label="Tool name"
				name="title"
				fullWidth
				onChange={handleFormsChange}
			/>
			<TextField
				margin="dense"
				id="link"
				label="Tool link"
				name="link"
				fullWidth
				onChange={handleFormsChange}
			/>
			<TextField
				margin="dense"
				id="description"
				label="Tool description"
				name="description"
				multiline
				rowsMax="5"
				fullWidth
				onChange={handleFormsChange}
			/>
			<TextField
				margin="dense"
				id="tags"
				label="Tags"
				name="tags"
				fullWidth
				onChange={handleFormsChange}
			/>
		</DialogContent>
		<DialogActions>
			<MyButton variant="outlined" onClick={handleCloseModalAddTool} color="secondary" autoFocus>
				Cancel
          	</MyButton>
			<MyButton onClick={handleSubmit} variant="contained" color="primary" autoFocus>
				ADD TOOL
          	</MyButton>
		</DialogActions>
	</Dialog>
);

export default Home;
