import React, { Component } from 'react';
import closeIcon from './../assets/close-icon.png';
import GroupMenuList from './popups/GroupMenuList';
class Header extends Component {
	state = {
		groupMenuisOpen: false
	};
	render() {
		const { groupList, isGroup } = this.props;
		const groupItems = () => {
			return groupList.map((item) => {
				return <span style={{ fontSize: 12 }}>{item.name + ', '} </span>;
			});
		};
		return (
			<div className="sc-header">
				<img className="sc-header--img" src={this.props.imageUrl} alt="" />
				<div className="sc-header--team-name">
					<span
						onMouseEnter={() => this.setState({ groupMenuisOpen: true })}
						onMouseLeave={() => this.setState({ groupMenuisOpen: false })}
					>
						{this.props.teamName}
					</span>
					<GroupMenuList isOpen={this.state.groupMenuisOpen} />
				</div>
				<div className="sc-header--close-button" onClick={this.props.onClose}>
					<img src={closeIcon} alt="" />
				</div>
			</div>
		);
	}
}

export default Header;
