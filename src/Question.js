import React, { useState } from 'react';
import axios from 'axios';

const Questions = ({
	q,
	onOptionAns,
	zipValid,
	setZipValid,
	city,
	setCity,
	state,
	setState,
	email,
	setEmail,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phoneNumber,
	setPhoneNumber,
	address,
	setAddress,
}) => {
	const [phoneValid, setPhoneValid] = useState('');
	const [emailValid, setEmailValid] = useState('');

	const [phoneNumbers, setPhoneNumbers] = useState('');
	const [zipCodeState, setZipCodeState] = useState(null);

	const handlePhoneNumber = async (e) => {
		e.preventDefault();
		const phoneNumber = e.target.value;
		if (phoneNumber.length > 0) {
			setPhoneNumbers(phoneNumber);
		} else {
			setPhoneNumbers('');
		}
		if (!isNaN(phoneNumber)) {
			if (phoneNumber.length >= 10) {
				const validation = await axios.get(
					`http://apilayer.net/api/validate?access_key=f9ca57e1282242abf19f3e967584b259&number=${phoneNumber}&country_code=US`
				);
				if (validation.data.valid) {
					setPhoneValid('Phone number is valid');
					setPhoneNumber(validation.data.valid);
				} else {
					setPhoneValid('Phone number is not existing');
				}
			}
		} else {
			setPhoneValid('Only numbers are allowed');
		}
	};

	const handleEmail = async (e) => {
		// https://emailvalidation.abstractapi.com/v1/?api_key=edabf12aa2524364942311c638c28431&email=vasif.will@gmail.com
		const email = e.target.value;
		if (email.includes('.com')) {
			const validation = await axios.get(
				`https://emailvalidation.abstractapi.com/v1/?api_key=edabf12aa2524364942311c638c28431&email=${email}`
			);
			if (validation.data.deliverability === 'DELIVERABLE') {
				setEmailValid('Email is valid');
				setEmail(e.target.value);
			} else {
				setEmailValid('Email is not existing');
			}
		}
	};

	const handleZipCode = async (e) => {
		if (q.id === 7) {
			setAddress(e.target.value);
			return;
		}
		// https://app.zipcodebase.com/api/v1/search?apikey=f420c450-42dc-11ee-ab60-b9d14c287408&codes=92037&country=US
		const zipCode = e.target.value;
		setZipValid(0);
		setState('');
		setCity('');

		if (zipCode.length > 5) {
			console.log('greater characters!!');
			return;
		} else {
			setZipCodeState(+e.target.vaue);
		}

		if (zipCode.length === 5) {
			const response = await axios.get(
				`https://app.zipcodebase.com/api/v1/search?apikey=f420c450-42dc-11ee-ab60-b9d14c287408&codes=${zipCode}&country=US`
			);

			// console.log(response.data.results[zipCode][0]);
			let parsedDataObj = null;
			console.log(response.data.results);

			if (response.data.results.length !== 0) {
				parsedDataObj = response.data.results[zipCode][0];
				console.log(parsedDataObj);
				setZipValid(zipCode);
				setCity(parsedDataObj.city);
				setState(parsedDataObj.state);
			} else {
				setZipValid(1);
			}
		} else {
			console.log('invalid zip code');
			return;
		}
	};

	const handleOpt = (e) => {
		let cbxAns = [];
		if (q.id === 4) {
			const allCbx = document.querySelectorAll('.question-4');
			allCbx.forEach((cb) => {
				cbxAns.push({
					id: q.id + cb.value,
					value: cb.value,
					checked: cb.checked,
				});
			});
		}
		if (q.id === 4) {
			onOptionAns(e, q.id, cbxAns);
		} else {
			onOptionAns(e, q.id);
		}
	};

	return (
		<div className='question'>
			<form>
				<h2>{q.title} </h2>
				{q.options.length !== 0 ? (
					q.options.map((opt) => (
						<>
							<label htmlFor='dark'>
								<input
									type={`${q.id === 4 ? 'checkbox' : 'radio'}`}
									name={`question-${q.id}`}
									className={`question-${q.id}`}
									value={opt}
									onChange={handleOpt}
								/>
								{opt}
							</label>
						</>
					))
				) : q.title !== 'Your Details?' ? (
					<>
						<input onChange={handleZipCode} maxLength={5} id={q.id} />
						{/* <span>{zipValid}</span> */}
						{zipValid === 1 && <span>Not a valid : please enter manually</span>}

						{zipValid !== 0 && (
							<div className='state-state'>
								<div className='input-control'>
									<label htmlFor='city'>City</label>
									<input type='text' id='city' value={zipValid ? city : ''} />
								</div>
								<div className='input-control'>
									<label htmlFor='state'>State</label>
									<input type='text' id='state' value={zipValid ? state : ''} />
								</div>
							</div>
						)}
						{}
					</>
				) : (
					<>
						<span
							style={{
								color: `${emailValid === 'Email is valid' ? 'green' : 'red'}`,
							}}
						>
							{emailValid}
						</span>
						<span
							style={{
								color: `${
									phoneValid === 'Phone number is valid' ? 'green' : 'red'
								}`,
								visibility: phoneNumbers.length !== 0 ? 'visible' : 'hidden',
							}}
						>
							{phoneValid}
						</span>
						<input
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<input
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
						/>
						<input type='email' placeholder='Email' onChange={handleEmail} />
						<input placeholder='Phone numbers' onChange={handlePhoneNumber} />
					</>
				)}
			</form>
		</div>
	);
};

// http://apilayer.net/api/validate?access_key=a277e97d03de1c6273716582e60c7c14&number=8572347368&country_code=US

export default Questions;
