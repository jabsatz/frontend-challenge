import React from 'react'
import { Link } from 'react-router-dom';
import './Link.scss';

export const AnchorLink = ({ children, link }) => (
	<a className="Link" target="_blank" rel="noopener noreferrer" href={link}>
		{children}
	</a>
);

export const AppLink = linkProps => <Link {...linkProps} className="Link"></Link>;