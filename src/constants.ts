import { version } from '../package.json';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const APP_VERSION = version;
