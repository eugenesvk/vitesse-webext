import { useStorageLocal, storageLocalAPI }	from '~/composables/useStorageLocal'
import {createSharedRoot}                  	from '@solid-primitives/rootless'

const prefix 	= 'vitesse';
const key    	= 'webext_demo';
const prefkey	= [prefix,key].join('.');

const useState = createSharedRoot(() => {
  return useStorageLocal({api:storageLocalAPI, prefix:prefix, sync:true});
});

const [storageDemo, setStorageDemo, storageDemoAct] = useState()

if (typeof await storageDemo[key] === 'undefined') { await setStorageDemo(key, 'Storage Demo'); }
export { storageDemo, setStorageDemo, storageDemoAct, prefix, key, prefkey}
