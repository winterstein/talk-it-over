import React, { Component } from 'react';
import Login from 'you-again';
import { assert } from 'sjtest';
import { getUrlVars } from 'wwutils';
import _ from 'lodash';

import BS from '../base/components/BS3'; // TODO 4

// Plumbing
import DataStore from '../base/plumbing/DataStore';
import C from '../C';
// Templates
import LoginWidget from '../base/components/LoginWidget';
import MessageBar from '../base/components/MessageBar';
import NavBar from '../base/components/NavBar';
// Pages
import {BasicAccountPage} from '../base/components/AccountPageWidgets';
import AccountMenu from '../base/components/AccountMenu';
import ChatPage from './ChatPage';
import TaskList from '../base/components/TaskList';
import Crud from '../base/plumbing/Crud';

C.setupDataStore();

const PAGES = {
	chat: ChatPage,
	account: BasicAccountPage,
};

const DEFAULT_PAGE = 'chat';

/**
		Top-level: tabs
*/
class MainDiv extends Component {

	componentWillMount() {
		// redraw on change
		const updateReact = (mystate) => this.setState({});
		DataStore.addListener(updateReact);

		Login.app = C.app.service;
		// Set up login watcher here, at the highest level		
		Login.change(() => {
			// ?? should we store and check for "Login was attempted" to guard this??
			if (Login.isLoggedIn()) {
				// close the login dialog on success
				DataStore.setShow('LoginWidget', false);
				Login.app = Login.getUser().app;
			} else {
				// poke React via DataStore (e.g. for Login.error)
				DataStore.update({});
			}
			this.setState({});
		});

		Login.verify();
	}
/**
	 * It is a good idea to wrap your callback in _.debounce()
	 */
	addListener(callback) {
		this.callbacks.push(callback);
	}

	render() {
		let path = DataStore.getValue('location', 'path');
		let page = path[0] || DEFAULT_PAGE; //const { page, pageProps } = this.state;
		// console.log("TODO page from path?", path, page);
		// assert(page, this.props);
		let Page = PAGES[page];		
		assert(Page, page);

		let msgs = Object.values(DataStore.getValue('misc', 'messages-for-user') || {});
		return (
			<div>
				<NavBar currentPage={page} pages={['ms', 'spreadsheet', 'chart', 'test']} >
					<TaskList />
				</NavBar>
				<div className="container-fluid avoid-navbar">
					<MessageBar messages={msgs} />
					<div id={page}>
						<Page />
					</div>
				</div>
				<LoginWidget logo={C.app.service} title={'Welcome to '+C.app.name} />
			</div>
		);
	}
}

export default MainDiv;
