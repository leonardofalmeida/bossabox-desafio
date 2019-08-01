import { configure } from '@storybook/react';
import { setDefaults } from "@storybook/addon-info";

// addon-info
setDefaults({
	header: true,
	inline: true,
	source: true
});

function loadStories() {
	require('../src/components/Button/Button.story');
	require('../src/components/Card/Card.story');
	require('../src/components/Checkbox/Checkbox.story');
	require('../src/components/EmptyMessage/EmptyMessage.story');
	require('../src/components/SearchBar/Searchbar.story');
	require('../src/components/TitleGroup/TitleGroup.story');
}

configure(loadStories, module);