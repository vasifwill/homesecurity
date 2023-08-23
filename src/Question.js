import React from 'react';

const Questions = ({ q }) => {
	return (
		<div>
			<form>
				<h2>{q.title}</h2>

				{q.options.map((opt) => (
					<>
						<input type='radio' name={`question-${q.id}`} value={opt} />{' '}
						<label>{opt}</label>
					</>
				))}
			</form>
		</div>
	);
};

export default Questions;
