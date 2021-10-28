import Warning from '../warning/Warning';
import './update.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, update } from '../../state/userSlice';

export default function Update() {
	const { userInfo, loading, error } = useSelector((state) => state.user);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState(userInfo.image);
	useEffect(() => {
		setImage(userInfo.image);
	}, [userInfo]);

	const dispatch = useDispatch();
	const handleClick = (e) => {
		e.preventDefault();

		if (!name && !email) return;

		update(dispatch, { name, email, image });
		setName('');
		setEmail('');
	};
	const handleDelete = () => {
		dispatch(removeUser());
	};

	const handleImage = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setImage(readerEvent.target.result);
		};
	};

	return (
		<div className="update">
			<div className="updateWrapper">
				<h3 className="updateTitle">
					{userInfo.name ? 'Update Your Account' : 'Login To Update Your Account'}
				</h3>
				{userInfo && userInfo.name && (
					<>
						<Warning />
						<button className="delete" onClick={handleDelete}>
							Delete Account
						</button>
					</>
				)}
				<div className="updateContainer">
					<form>
						{userInfo && userInfo.image && (
							<div className="formItem">
								<label>Profile Picture</label>
								<div className="profilePic">
									<img className="avatar" src={image} alt="" />
									<label htmlFor="image" className="change">
										Change
									</label>
									<input type="file" id="image" hidden onChange={handleImage} />
								</div>
							</div>
						)}
						<div className="formItem">
							<label>Username</label>
							<input
								className="formInput"
								type="text"
								placeholder={userInfo.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="formItem">
							<label>Email</label>
							<input
								className="formInput"
								type="text"
								placeholder={userInfo.email}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						{/* <div className="formItem">
							<label>Password</label>
							<input className="formInput" type="password" />
						</div> */}
						<button disabled={loading} className="updateButton" onClick={handleClick}>
							Update
						</button>
						{error && <span className="error">Something went wrong!</span>}
						{!error && loading === false && (
							<span className="success">Account has been updated!</span>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
