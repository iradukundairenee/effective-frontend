import { toast } from 'react-toastify';

const messageId = 13;
export const notifier = {
	error: (msg) =>
		toast(msg, {
			type: toast.TYPE.ERROR,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: messageId
		}),
	success: (msg) =>
		toast(msg, {
			type: toast.TYPE.SUCCESS,
			position: toast.POSITION.BOTTOM_LEFT,
			toastId: messageId
		})
};
