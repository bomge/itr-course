import createStore from 'react-auth-kit/createStore';

const authStore = createStore<object>({
	authName:'_auth',
	authType:'cookie',
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === 'https:',
});

export default authStore;