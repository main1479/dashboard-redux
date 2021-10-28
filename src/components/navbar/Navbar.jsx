import { ArrowDropDown } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../state/userSlice';
import './navbar.css';

const Navbar = () => {
	const { name, image } = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	return (
		<div className="navbar">
			<div className="navbarWrapper">
				<div className="navbarLeft">
					<span className="logo">Redux App</span>
					<span className="navbarLink">Home</span>
					<span className="navbarLink">About</span>
					<span className="navbarLink">Contact</span>
				</div>
				<div className="navbarCenter">
					<div className="search">
						<input type="text" placeholder="search for something..." className="searchInput" />
					</div>
				</div>
				<div className="navbarRight">
					{name ? (
						<>
							<img className="avatar" src={image} alt="" />
							<span className="navbarName">{name}</span>
							<ArrowDropDown />
						</>
					) : (
						<span className="navbarLink" onClick={() => update(dispatch)}>
							Login
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
