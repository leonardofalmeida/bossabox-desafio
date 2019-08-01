const BASE_ROUTE = '/';

export const TOOLS = {
	FIND_ALL: `${BASE_ROUTE}tools`,
	FIND_BY_SEARCH: `${BASE_ROUTE}tools?q={search}`,
	FIND_BY_TAGS: `${BASE_ROUTE}tools?tags_like={search}`,
	DELETE: `${BASE_ROUTE}tools/{id}`,
	SAVE: `${BASE_ROUTE}tools`,
};
