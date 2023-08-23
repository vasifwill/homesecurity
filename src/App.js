import Form from './Form';

import Question from './Question';

// import FormInfo from './FormContext/ContextForm.js';
import './App.css';
import { useState } from 'react';

function App() {
	const [start, setStart] = useState(false);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [showSubmit, setShowSubmit] = useState(false);

	const [questions, setQuestions] = useState([
		{
			id: 1,
			title: 'What type of property this is?',
			options: ['rented', 'owned'],
			userAns: null,
		},
		{
			id: 2,
			title: 'How many entries exists?',
			options: [1, 2, 3],
			userAns: null,
		},
		{
			id: 3,
			title: 'What is your Installation preference',
			options: [
				'Burgular/Intrusion',
				'Intrusion',
				'Both burgular and fire detection',
			],
			userAns: null,
		},
	]);

	//<button onClick={handlePrev}>Prev</button>

	const handlePrev = () => {
		if (currentIndex === 0) {
			return;
		}

		setCurrentIndex(currentIndex - 1);
	};
	const handleNext = () => {
		if (currentIndex === questions.length - 1) {
			return;
		}
		setCurrentIndex(currentIndex + 1);
	};
	return (
		<div className='App'>
			<header>Help Protect Your Home with a New Security System</header>
			<p>
				Quick and easy. Get matched with the best Home Security company in your
				area
			</p>

			{correctIndex(currentIndex, questions.length) ? (
				<Question q={questions[currentIndex]} />
			) : (
				<p>No Question</p>
			)}

			<div>
				{currentIndex > 0 && <button onClick={handlePrev}>Prev</button>}
				{currentIndex !== questions.length - 1 && (
					<button onClick={handleNext}>Next</button>
				)}
			</div>

			{currentIndex === questions.length - 1 && (
				<button style={{ marginTop: '15px' }}>Submit </button>
			)}
		</div>
	);
}

export default App;

// helper
const correctIndex = (index, length) => {
	if (index >= 0 && index < length) {
		return true;
	} else {
		return false;
	}
};
