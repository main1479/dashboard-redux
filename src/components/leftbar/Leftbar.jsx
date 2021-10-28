import {
	ExitToAppOutlined,
	FileCopyOutlined,
	GroupOutlined,
	HearingOutlined,
	HomeOutlined,
	List,
	MovieCreationOutlined,
	PhotoSizeSelectActualOutlined,
	ScheduleOutlined,
	Settings,
	ShoppingBasketOutlined,
} from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, update } from '../../state/userSlice';
import MenuLink from '../menuLink/MenuLink';
import './leftbar.css';

export default function Leftbar() {
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	return (
		<div className="leftbar">
			<div className="leftbarWrapper">
				<MenuLink icon={<HomeOutlined />} text="Homepage" />
				<MenuLink icon={<List />} text="Lists" />
				<MenuLink icon={<ShoppingBasketOutlined />} text="Products" />
				<MenuLink icon={<GroupOutlined />} text="Groups" />
				<MenuLink icon={<FileCopyOutlined />} text="Pages" />
				<MenuLink icon={<PhotoSizeSelectActualOutlined />} text="Photos" />
				<MenuLink icon={<MovieCreationOutlined />} text="Videos" />
				<MenuLink icon={<ScheduleOutlined />} text="Schedule" />
				<MenuLink icon={<HearingOutlined />} text="Wishlist" />
				<MenuLink icon={<Settings />} text="Settings" />
				{userInfo && userInfo.name ? (
					<MenuLink
						onClick={() => dispatch(removeUser())}
						icon={<ExitToAppOutlined />}
						text="Logout"
					/>
				) : (
					<MenuLink onClick={() => update(dispatch)} icon={<ExitToAppOutlined />} text="Login" />
				)}
			</div>
		</div>
	);
}
