import api from '../api/api';
import { TOOLS } from '../constants/routes';

export default {
	async findAllTools() {
		const { data } = await api.get(TOOLS.FIND_ALL);
		return data;
	},

	async findBySearch(search) {
		const { data } = await api.get(TOOLS.FIND_BY_SEARCH.replace('{search}', search));
		return data;
	},

	async findByTags(search) {
		const { data } = await api.get(TOOLS.FIND_BY_TAGS.replace('{search}', search));
		return data;
	},

	async deleteTool(id) {
		const response = await api.delete(TOOLS.DELETE.replace('{id}', id));
		return response;
	},

	async saveTool(tool) {
		const response = await api.post(TOOLS.SAVE, tool);
		return response;
	},
};
