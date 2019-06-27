import React, { Component } from 'react';
import {ReactDOM} from 'react-dom';
import {SJTest, assert} from 'sjtest';
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
	const chat = DataStore.getValue(['misc','chat']) || DataStore.setValue(['misc','chat'], {});
	assert(chat);
	if ( ! chat.qnum) chat.qnum = 1;

	return (
		<div className='ChatPage'>
			<Q1 />
			{chat.q1 && chat.q1.answer? <div><R1 answer={chat.q1.answer} /><Q2 /></div> : null}
		</div>
	);
};


const Q1 = () => {
	return (<div>
	<h2>Welcome to TIO! :-)</h2><br/><br/>
	<p>
		<img src="/img/person-listening.jpg" alt="Person listening icon" height="140" auto="compress" />
	</p><br/>
		<p>TIO stands for Talk It Over -- this is a place where you can talk about whatever is on your mind.</p>
		<p>This is a very early prototype! Thank you for trying it.</p>
		<p>If you're feeling low, type what's on your mind and I'll listen to you :-)</p>
		<p> I'm not a very clever piece of software and I might not understand everything you say, but I\'m here for you for as long as you need. And I won't judge you. So if you think that talking things through with someone in a safe confidential space might help, have a go.</p><p>Let's start with you just rating how you feel on a scale from 1 to 10, where 1 is terrible and 10 is great</p> 
		
		<PropControl type='radio' prop="answer" inline={true} path={['misc','chat','q1']} options={[1,2,3,4,5,6,7,8,9,10]} />
	</div>);
};

const R1 = ({answer}) => {
	if (answer > 7) {
		return (<div>That's great!<br/><br/><p>I'm here to help people who are feeling low or have something on their minds. But you're feeling good, which is great!</p><p> Why don't you go out and have fun! Or if you want to help others who are feeling low, check out these 
			<a href="https://www.google.co.uk/search?q=volunteering+opportunities+near+me+mental+health+sane+mind+rethink+samaritans&oq=volunteering+opportunities+near+me+mental+health+sane+mind+rethink+samaritans&aqs=chrome..69i57.10476j0j9&sourceid=chrome&ie=UTF-8">google search results</a> 
			to find some volunteering opportunities.
		</p><p>Or maybe you're just here to check out this site, which is cool. Why don't you try again, but pretend you're feeling sad this time! :-) (you can probably do this clicking on Ctrl+r, but don't trust anything I say, I'm just a pretty unintelligent piece of software!)</p>
		</div>);
	}
	if (answer > 3) {
		return <div>Sounds like you're not quite on top of the world -- shame about that.</div>;
	}
	return <div>Oh dear, sounds like you're feeling really low.</div>;
};

const Q2 = () => {
	return <div>
		Is there anything specific on your mind at the moment?

		<PropControl />
	</div>;
};

export default ChatPage;
