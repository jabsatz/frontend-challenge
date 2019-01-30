import React from 'react';
import { AppLink } from 'components/Link';
import './Page.scss';

export const Page = ({ title, loading, backButton, children }) => (
	<div className="Page">
		<header className="Page-title">{backButton && <><AppLink to="/">{"<"}</AppLink></>}{title}</header>
		<div className="Page-content">{loading ? <div className="Page-content-loading" /> : children}</div>
	</div>
);
