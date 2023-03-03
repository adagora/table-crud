import { LoaderStatus } from '../CircleLoader/CircleLoader';

export enum PROCESSING_STATUSES {
	PROCESSING = 'processing',
	ERROR = 'error',
	SUCCESS = 'success',
	IDLE = 'idle',
}

export const mapToLoader = (status?: PROCESSING_STATUSES): LoaderStatus => {
	switch (status) {
		case PROCESSING_STATUSES.SUCCESS:
			return 'success';
		case PROCESSING_STATUSES.ERROR:
			return 'error';
		default:
			return 'loading';
	}
};
