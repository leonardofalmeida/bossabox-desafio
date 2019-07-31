import React from 'react';
import Modal from '@material-ui/core/Modal';
import { ModalPosition } from './Modal.style';

export default function MyModal({ isOpenModalAdd, children }) {
	return (
		<ModalPosition
			aria-labelledby='simple-modal-title'
			aria-describedby='simple-modal-description'
			open={isOpenModalAdd}
		>
			{children}
		</ModalPosition>
	);
}
