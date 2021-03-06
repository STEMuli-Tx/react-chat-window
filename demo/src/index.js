import React, { Component } from 'react';
import { render } from 'react-dom';
import { Launcher } from '../../src';
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import Footer from './Footer';
import monsterImgUrl from './../assets/monster.png';
import './../assets/styles';
//import naruto from 'https://stemuli.blob.core.windows.net/stemuli/avatar-placeholder.png';

class Demo extends Component {
	constructor() {
		super();
		this.state = {
			messageList: messageHistory,
			newMessagesCount: 0,
			isOpen: false
		};
	}

	_onMessageWasSent(message) {
		this.setState({
			messageList: [ ...this.state.messageList, message ]
		});
	}

	_onFilesSelected(fileList) {
		const objectURL = window.URL.createObjectURL(fileList[0]);
		this.setState({
			messageList: [
				...this.state.messageList,
				{
					type: 'file',
					author: 'me',
					data: {
						url: objectURL,
						fileName: fileList[0].name
					}
				}
			]
		});
	}

	_sendMessage(text) {
		if (text.length > 0) {
			const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
			this.setState({
				newMessagesCount: newMessagesCount,
				messageList: [
					...this.state.messageList,
					{
						author: 'them',
						type: 'text',
						data: { text }
					}
				]
			});
		}
	}

	_handleClick() {
		this.setState({
			isOpen: !this.state.isOpen,
			newMessagesCount: 0
		});
	}

	render() {
		return (
			<div>
				<Header />
				<TestArea onMessage={this._sendMessage.bind(this)} />
				<Launcher
					agentProfile={{
						teamName: 'react-chat-window',
						imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
					}}
					avatar={
						'https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103'
					}
					isGroup={true}
					groupName={'Hidden Leaf'}
					groupColor={'#4286f4'}
					groupList={[
						{
							name: 'Naruto Uzumaki',
							avatar:
								'https://m.media-amazon.com/images/M/MV5BNDk2MDhhY2UtYTZhMS00YTc3LThmODEtNTExNDU0YTZiZTg2XkEyXkFqcGdeQXVyMjc2Nzg5OTQ@._V1_.jpg'
						},
						{
							name: 'Sasuke Uchiha',
							avatar: 'https://i.ytimg.com/vi/19s0vIeJthA/maxresdefault.jpg'
						}
					]}
					onMessageWasSent={this._onMessageWasSent.bind(this)}
					onFilesSelected={this._onFilesSelected.bind(this)}
					messageList={this.state.messageList}
					newMessagesCount={this.state.newMessagesCount}
					handleClick={this._handleClick.bind(this)}
					isOpen={this.state.isOpen}
					showEmoji
				/>
				<img className="demo-monster-img" src={monsterImgUrl} />
				<Footer />
			</div>
		);
	}
}

render(<Demo />, document.querySelector('#demo'));
