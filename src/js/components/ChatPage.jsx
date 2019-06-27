import React, { Component } from 'react';
import {ReactDOM} from 'react-dom';
import {SJTest} from 'sjtest';
import {Login} from 'you-again';
import printer from '../base/utils/printer';
import C from '../C';
import Roles from '../base/Roles';
import Misc from '../base/components/Misc';
import {stopEvent} from 'wwutils';
import DataStore from '../base/plumbing/DataStore';
import Settings from '../base/Settings';
import ShareWidget, {ShareLink} from '../base/components/ShareWidget';
import ListLoad, {CreateButton, ListItems} from '../base/components/ListLoad';
import ActionMan from '../plumbing/ActionMan';
import PropControl from '../base/components/PropControl';
import BS from '../base/components/BS';
import JSend from '../base/data/JSend';
import SimpleTable from '../base/components/SimpleTable';
import ServerIO from '../plumbing/ServerIO';
import _ from 'lodash';


const ChatPage = () => {
	return (
		<div className='ChatPage'>
			Hello
		</div>
	);
};

export default ChatPage;
