import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { ModalPosition } from './Modal.style';

export default function MyModal({ confirmDelete, handleClose, children }) {
	return (
		<ModalPosition
			open={confirmDelete}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{children}
		</ModalPosition>
	);
}

Modal.propTypes = {
	isOpenModalAdd: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
};
