import React from 'react';
import { useSelector } from 'react-redux';
import './menulink.css';

export default function MenuLink({ icon, text, onClick: clickEvent }) {
	const { name } = useSelector((state) => state.user.userInfo);
	return (
		<div className="menulink" onClick={clickEvent}>
			{icon}
			<span className="menuLinkText">{text}</span>
			<span className="menuLinkTextName">{text === 'Logout' && `( ${name} )`}</span>
		</div>
	);
}
