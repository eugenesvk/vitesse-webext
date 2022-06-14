import { storageDemo, setStorageDemo, key }	from '~/logic/storage'

import icon from '/assets/icon.svg';

export default function App () {
  const fetchStorageDemo = async () => await storageDemo[key];
  const [keyVal]	= createResource(fetchStorageDemo);

  return (
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
  <img src={icon} class="icon-btn mx-2 text-2xl" alt="extension icon" />
  <div>Options</div>
    <p class="mt-2 opacity-50">
      This is the options page
    </p>
  <input value={ keyVal() } oninput={ async (e) => await setStorageDemo(key, e.target.value) }
    class="border border-gray-400 rounded px-2 py-1 mt-2" />
  <div class="mt-4">
    Powered by Vite <pixelarticons-zap class="align-middle"/>
  </div>
 </main>
);}
