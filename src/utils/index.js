export * from './constants';

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
};

export const setItemInLocalStorage = (key, value) => {
  if (!value || !key) {
    return console.error('can not store in LS');
  } else {
    const valueToStore =
      typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
  }
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('can not get from LS');
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
    if (!key) {
      return console.error('can not remove from LS');
    }
  
    return localStorage.removeItem(key);
  };

export const checkFriend = (currentUser, userId) => {
  const friendUser = currentUser.friendships.filter(friend => friend?.to_user?._id === userId);
  
  return friendUser.length > 0;
}
