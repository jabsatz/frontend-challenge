import React from 'react';
import classnames from 'classnames';
import './List.scss';

export const List = ({ children }) => <ul className="List">{children}</ul>;

export const ListItem = ({ children, highlight }) => (
	<li className={classnames('List-item', { 'List-item--highlight': highlight })}>{children}</li>
);


