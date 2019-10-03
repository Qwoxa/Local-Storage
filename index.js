/**
 * Add item to local storage
 * @param {String} key
 * @param {Any} value
 */
export const setGlobal = (key, value) => {
	if (typeof key !== 'string' && typeof key !== 'number') {
  	throw new Error('Item should be string or number.');
  }
    
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Removes the property from the local storage
 * @param {String} key 
 */
export const removeGlobal = key => {
	localStorage.removeItem(key);
};

/**
 * Modifies an object from the local storage
 * @param {String} key Key of the prop that needs to be modified
 * @param {Object} newValues The new values that will replace existing ones, 
 * or will be added to the obj
 */
export const mutateGlobalObj = (key, newValues) => {
  if (typeof newValues !== 'object') {
    throw new Error('newValues should be an object!')
  }

  const parsed = JSON.parse(localStorage.getItem(key));
  if (!parsed) return false;
  
  const newProps = {
  	...parsed,
    ...newValues
  };
  localStorage.setItem(key, JSON.stringify(newProps));
  return true;
};

/**
 * Adds/removes the item to the array
 * Array is created if it does not exist
 * @param {String} key Name of the array
 * @param {String} item The item that needs to bee added/deleted
 * @param {String} action add/remove
 */
export const mutateGlobalArr = (key, item, action) => {
	const arr = JSON.parse(localStorage.getItem(key)) || [];
	
	switch (action) {
  	case 'add':
      localStorage.setItem(key, JSON.stringify([...arr, item]));
      break;
    case 'remove':
    	localStorage.setItem(
      	key,
      	JSON.stringify(arr.filter(el => el !== item))
      );
      break;
  }
};
