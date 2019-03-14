import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';
import Avatar from '@material-ui/core/Avatar';
class Launcher extends Component {
	constructor() {
		super();
		this.state = {
			launcherIcon,
			isOpen: false,
			groupLabel: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.mute) {
			return;
		}
		const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
		const isIncoming = (nextMessage || {}).author === 'them';
		const isNew = nextProps.messageList.length > this.props.messageList.length;
		if (isIncoming && isNew) {
			this.playIncomingMessageSound();
		}
	}

	playIncomingMessageSound() {
		var audio = new Audio(incomingMessageSound);
		audio.play();
	}

	handleClick() {
		if (this.props.handleClick !== undefined) {
			this.props.handleClick();
		} else {
			this.setState({
				isOpen: !this.state.isOpen
			});
		}
	}
	componentDidMount() {
		const { isGroup } = this.props;
		if (isGroup) this.createGroupLabel();
	}
	createGroupLabel = () => {
		const { groupName } = this.props;
		const splitName = groupName.split(' ');

		let label;
		if (splitName.length > 1) {
			label = splitName.map((item) => {
				return item[0];
			});
		} else {
			let name = splitName.toString().toUpperCase();
			label = [ name[0], name[1], name[2], name[3] ];
		}
		this.setState({ groupLabel: label });
	};
	render() {
		const { avatar, isGroup = false, groupColor, groupName } = this.props;
		const { groupLabel } = this.state;
		const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
		const classList = [ 'sc-launcher', isOpen ? 'opened' : '' ];
		return (
			<div id="sc-launcher">
				<div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
					<MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
					<img className={'sc-open-icon'} src={launcherIconActive} />
					{!isGroup ? (
						<img className={'sc-closed-icon'} src={avatar} />
					) : (
						<Avatar style={{ backgroundColor: groupColor }} className={'sc-closed-icon'}>
							{groupLabel}
						</Avatar>
					)}
				</div>
				<ChatWindow
					isGroup={isGroup}
					groupName={groupName}
					groupAvatar={
						isGroup && (
							<Avatar style={{ backgroundColor: groupColor }} className={'sc-closed-icon'}>
								{groupLabel}
							</Avatar>
						)
					}
					groupList={this.props.groupList}
					messageList={this.props.messageList}
					onUserInputSubmit={this.props.onMessageWasSent}
					onFilesSelected={this.props.onFilesSelected}
					agentProfile={this.props.agentProfile}
					isOpen={isOpen}
					onClose={this.handleClick.bind(this)}
					showEmoji={this.props.showEmoji}
				/>
			</div>
		);
	}
}

const MessageCount = (props) => {
	if (props.count === 0 || props.isOpen === true) {
		return null;
	}
	return <div className={'sc-new-messages-count'}>{props.count}</div>;
};

Launcher.propTypes = {
	onMessageWasReceived: PropTypes.func,
	onMessageWasSent: PropTypes.func,
	newMessagesCount: PropTypes.number,
	isOpen: PropTypes.bool,
	handleClick: PropTypes.func,
	messageList: PropTypes.arrayOf(PropTypes.object),
	mute: PropTypes.bool,
	groupColor: PropTypes.string,
	isGroup: PropTypes.bool,
	groupLabel: PropTypes.string,
	avatar: PropTypes.string.isRequired,
	showEmoji: PropTypes.bool
};

Launcher.defaultProps = {
	newMessagesCount: 0,
	showEmoji: true
};

export default Launcher;
