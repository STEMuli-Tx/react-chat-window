import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const options = [
	'None',
	'Atria',
	'Callisto',
	'Dione',
	'Ganymede',
	'Hangouts Call',
	'Luna',
	'Oberon',
	'Phobos',
	'Pyxis',
	'Sedna',
	'Titania',
	'Triton',
	'Umbriel'
];

const ITEM_HEIGHT = 48;

function GroupMenuList(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}
	return (
		<Menu
			id="long-menu"
			anchorEl={anchorEl}
			open={props.isOpen}
			onClose={handleClose}
			PaperProps={{
				style: {
					maxHeight: ITEM_HEIGHT * 4.5,
					width: 200
				}
			}}
		>
			{options.map((option) => (
				<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
					{option}
				</MenuItem>
			))}
		</Menu>
	);
}

export default GroupMenuList;
