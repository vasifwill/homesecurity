import React,{useState} from 'react';
import axios from 'axios';

const Questions = ({q}) => {
	const [phoneValid, setPhoneValid] = useState('')
	const [emailValid, setEmailValid] = useState('')
	const [zipValid, setZipValid] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumbers, setPhoneNumbers] = useState('')

	const handlePhoneNumber = async (e) => {
		e.preventDefault()
		const phoneNumber = e.target.value
		if(phoneNumber.length > 0) {
			setPhoneNumbers(phoneNumber)
		}else{
			setPhoneNumbers('')
		}
		if(!isNaN(phoneNumber)){
			if(phoneNumber.length >=10) {
				const validation = await axios.get(`http://apilayer.net/api/validate?access_key=f9ca57e1282242abf19f3e967584b259&number=${phoneNumber}&country_code=US`)
				if(validation.data.valid){
					setPhoneValid('Phone number is valid')
				}else{
					setPhoneValid('Phone number is not existing')
				}
			}
		}else{
			setPhoneValid('Only numbers are allowed')
		}
		
		
		 
	}

	const handleEmail = async(e) => {
		// https://emailvalidation.abstractapi.com/v1/?api_key=edabf12aa2524364942311c638c28431&email=vasif.will@gmail.com
		const email = e.target.value
			if(email.length >=4) {
				const validation = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=edabf12aa2524364942311c638c28431&email=${email}`)
				if(validation.data.deliverability === 'DELIVERABLE'){
					setEmailValid('Email is valid')
				}else{
					setEmailValid('Email is not existing')
				}
			}
		}

		const handleZipCode = async(e) => {
			// https://app.zipcodebase.com/api/v1/search?apikey=f420c450-42dc-11ee-ab60-b9d14c287408&codes=92037&country=US 
			const zipCode = e.target.value
			
				if(zipCode.length === 5) {
					const validation = await axios.get(`https://app.zipcodebase.com/api/v1/search?apikey=f420c450-42dc-11ee-ab60-b9d14c287408&codes=${zipCode}&country=US`)
					if(validation.data.results.length !== 0) {
						setZipValid(validation.data.results.zipCode[0].state_en+''+validation.data.results.zipCode[0].province);
					}else{
						setZipValid('Zip code is not existing')
					}
				}

		}
	return (
		<div>
			<form>
				<h2>{q.title} </h2>
				{q.options.length !== 0 ? q.options.map((opt) => (
					<>
					<label htmlFor='dark' >
						<input type={`${q.id === 4 ?'checkbox':'radio'}`} name={`question-${q.id}`} value={opt} id='dark' />
						{opt}
						</label>
					</>
				)): q.title !== 'Your Details?' ? <><input onChange={handleZipCode}/><span>{zipValid}</span></>:
				<>
				<span style={{color: `${emailValid === 'Email is valid' ? 'green':'red'}`}}>{emailValid}</span>
				<span style={{color: `${phoneValid === 'Phone number is valid' ? 'green':'red'}`,visibility: phoneNumbers.length !== 0  ? 'visible' : 'hidden' }}>{phoneValid}</span>
				<input placeholder='First Name'/>
				<input placeholder='Last Name'/>
				<input type='email' placeholder='Email' onChange={handleEmail}/>
				<input  placeholder='Phone numbers' onChange={handlePhoneNumber}/>
				</>}
			</form>
		</div>
	);
};

// http://apilayer.net/api/validate?access_key=a277e97d03de1c6273716582e60c7c14&number=8572347368&country_code=US

export default Questions;
