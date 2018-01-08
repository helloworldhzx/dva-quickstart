import store from "store2";

export function setSession(key, value) {
	store.session(key, value);
}

export function getSession(key) {
	var value = store.session(key);
	return value;
}

export function clearSession(key) {
	store.session.remove(key);
}

export function setLocalStore(key, value) {
	store.local(key, value);
}

export function getLocalStore(key) {
	let value = store.local(key);
	return value;
}

export function clearLocalStore(key) {
	store.local.remove(key);
}