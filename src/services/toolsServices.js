import api from '../api/api';

export default {
    async findAllTools() {
        const { data } = await api.get('/tools');
        return data;
    }
}