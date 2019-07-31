import api from '../api/api';

export default {
  async findAllTools() {
    const { data } = await api.get('/tools');
    return data;
  },

  async findBySearch(search) {
    const { data } = await api.get(`/tools?q=${search}`);
    return data;
  },

  async findByTags(search) {
    const { data } = await api.get(`/tools?tags_like=${search}`);
    return data;
  },
};
