/** @format */

import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import data from "./data";
import sidebarReducer from "../redux/features/sidebarSlice";
import tabsReducer from "../redux/features/tabSlice";
import newTabsReducer from "../redux/features/searchTabSlice";
import favoriteReducer from "../redux/features/favoriteSlice";
import permissionReducer from "../redux/features/rolePermissionSlice";
import memberReducer from "../redux/features/selectMemberSlice";

import roleReducer from "../redux/features/roleSlice";
import rolesListReducer from "../redux/features/rolesListSlice";
import auth from "../redux/features/authSlice";
import isFirm from "../redux/features/isFirmSlice";

export default combineReducers({
	auth,
	isFirm,
	role: roleReducer,
	rolesList: rolesListReducer,
	errors,
	messages,
	data,
	sidebar: sidebarReducer,
	favorite: favoriteReducer,
	tabs: tabsReducer,
	newTabs: newTabsReducer,
	permissions: permissionReducer,
	member: memberReducer,
});
