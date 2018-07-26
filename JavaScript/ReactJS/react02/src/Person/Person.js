import React from 'react';

const person = (props) => {
	return (
		<div>
			<h2 onClick={props.click}>I am a { props.name }, I am { props.age } years old. </h2>
		    <p>{ props.children }</p>
		    <input type="text" onChange={props.changed} />
		</div>
	);
}

export default person;