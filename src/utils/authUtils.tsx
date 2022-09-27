export const setAuthState = (user: string) => {
	return localStorage.setItem('user', JSON.stringify(user));
};

export const resetAuthToken = () => setAuthState('');

export const getAuthState = () => {
	try {
		return localStorage['user'] ? JSON.parse(localStorage['user']) : '';
	} catch (error) {
		void error;
		resetAuthToken();
	}
	return '';
};

export const isLoggedIn = () => !!getAuthState();

export const AuthUtils = {
	getAuthState,
	resetAuthToken,
	setAuthState,
	isLoggedIn,
};

export default AuthUtils;
