import React from 'react';

const person = (props) => {
	return (
		<div>
			<h2>I am a { props.name }, I am { props.age } years old. </h2>
		    <p>{ props.children }</p>
		</div>
	);
}

export default person;