import isPromise from 'is-promise';
import { useHistory } from 'react-router';
import { notifier } from '../../utils/notifier';

export const errorHandler = () => {
	// const history = useHistory();

	return (next) => (action) => {
		if (!isPromise(action.payload)) {
			return next(action);
		}

		if (!action.meta || !action.meta.localError) {
			return next(action).catch((error) => {
				let errorMessage = '';
				if (error.response) {
					const { error: apiError, message } = error.response.data;
					errorMessage = apiError || message;
				} else {
					errorMessage = error.message;
				}
				const displayMsg = Array.isArray(errorMessage)
					? errorMessage[0]
					: errorMessage;
				notifier.error(displayMsg);
			});
		}

		return next(action);
	};
};
