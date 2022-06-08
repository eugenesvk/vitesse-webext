import { useStorageLocal, storageLocalAPI } from '~/composables/useStorageLocal'

const prefix 	= 'vitesse';
const key    	= 'webext_demo';
const prefkey	= [prefix,key].join('.');

const [storageDemo, setStorageDemo, storageDemoAct
  ] = useStorageLocal({api:storageLocalAPI, prefix:prefix, sync:true});

if (typeof await storageDemo[key] === 'undefined') { await setStorageDemo(key, 'Storage Demo'); }
export { storageDemo, setStorageDemo, storageDemoAct, prefix, key, prefkey}
