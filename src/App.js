import Question from './Question';

// import FormInfo from './FormContext/ContextForm.js';
import './App.css';
import { useState } from 'react';

import axios from 'axios';

function App() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [ans, setAns] = useState([]);
	const [currentOpt, setCurrentOpt] = useState('');
	const [cbxAns, setCbxAns] = useState([]);
	const [questions, setQuestions] = useState([
		{
			id: 1,
			title: 'What type of property this system for?',
			options: ['rented', 'owned'],
			userAns: null,
		},
		{
			id: 2,
			title: 'What is your zip code?',
			options: [],
			userAns: null,
		},
		{
			id: 3,
			title: 'What is your Installation preference',
			options: [
				'Professional Installation',
				'Self Installation',
				'No Preference',
			],
			userAns: null,
		},
		{
			id: 4,
			title: 'What home security features would you like to have?',
			options: [
				'Cameras',
				'Motion Sensors',
				'Glass break sensors',
				'Doorbell Cameras',
			],
			userAns: null,
		},
		{
			id: 5,
			title: 'What kind of System do you need?',
			options: [
				'Burglar/inrusion',
				'Fire Detection',
				'Both Burglar and Fire Detection',
			],
			userAns: null,
		},
		{
			id: 6,
			title: 'How many entrances exist?',
			options: ['1', '2-4', '5', 'More than 5'],
			userAns: null,
		},
		{
			id: 7,
			title: 'What is your address?',
			options: [],
			userAns: null,
		},
		{
			id: 8,
			title: 'Your Details?',
			options: [],
			userAns: null,
		},
	]);

	// for zip and city,state
	const [zipValid, setZipValid] = useState(0);
	const [city, setCity] = useState('');
    const [submitState, setSubmitState] = useState(false)
	const [state, setState] = useState('');
	const [address, setAddress] = useState('');
	/// biodata
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

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

		//
		if (currentIndex === 3) {
			console.log(cbxAns);
			return;
		}

		const prevAns = [...ans];
		if (!prevAns.find((an) => an.id === currentOpt.id)) {
			prevAns.push(currentOpt);
		}
		setAns(prevAns);
	};

	const handleSubmit = async () => {
		setSubmitState(true);
		const payload = {
			lp_campaign_id: process.env.REACT_APP_CAMP_ID,
			lp_campaign_key: process.env.REACT_APP_CAMP_KEY,
			first_name: firstName,
			last_name: lastName,
			phone_home: phoneNumber,
			email_address: email,
			zip_code: zipValid,
			city: city,
			state: state,
			address: address,
			address2: address,
			property_type: ans.find((an) => an.id === 1)?.value,
			features: [...cbxAns],
			system_type: ans.find((an) => an.id === 5)?.value,
			installation_preference: ans.find((an) => an.id === 3)?.value,
			entrances: ans.find((an) => an.id === 6)?.value,
		};

		console.log({ payload: payload });

		try {
			const response = await axios.post(
				'https://bluemodo.leadspediatrack.com/post.do',
				payload
			);
		} catch (e) {
			alert(e.message);
		}
	};

	const handleOptAns = (e, id, cbxOpts) => {
		if (cbxOpts) {
			setCbxAns((prev) => [...cbxOpts]);
		} else {
			setCurrentOpt({
				id: id,
				value: e.target.value,
			});
		}
	};
	return (
		<div className='App'>
			<header>Help Protect Your Home with a New Security System.</header>
			<p>
				Quick and easy. Get matched with the best Home Security company in your
				area.
			</p>
			{submitState ? <h1>Thank you for your information. We will get back to you soon</h1>:<>
			<p>
				{currentIndex + 1}/{questions.length}
			</p>

			{correctIndex(currentIndex, questions.length) ? (
				<Question
					q={questions[currentIndex]}
					onOptionAns={handleOptAns}
					zipValid={zipValid}
					setZipValid={setZipValid}
					city={city}
					setCity={setCity}
					state={state}
					setState={setState}
					email={email}
					setEmail={setEmail}
					firstName={firstName}
					setFirstName={setFirstName}
					lastName={lastName}
					setLastName={setLastName}
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					address={address}
					setAddress={setAddress}
				/>
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
				<button style={{ marginTop: '15px' }} onClick={handleSubmit}>
					Submit{' '}
				</button>
			)}
			</>}
			
			<div className='howItWorks'>
				<h3>How it works</h3>
				<p>
					Safe Home Pros services hundreds of brands and provides trusted
					information for millions of individuals across the United States
				</p>
				<ul>
					<li>Easily compare</li>
					<li>Strengthen your consumer awareness</li>
					<li>Find the best rates for your financial needs</li>
				</ul>
			</div>
			<footer>
				<h4>
					Safe Home Pros offers rankings and reviews for the top companies in
					many verticals across different industries in the United States. We
					strive to remain both objective and informative, with the goal of
					giving our users the best experience. The opinions and the prices we
					represent on our site(s) are subject to change without notice. We are
					an independent, advertising-supported comparison service. The offers
					that appear on this site are from companies that compensate us. This
					compensation may impact how and where products appear on this site,
					including, for example, the order in which they may appear within the
					listing categories. <span>Copyright © 2023 Safe Home Pros.</span>
				</h4>
			</footer>
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
