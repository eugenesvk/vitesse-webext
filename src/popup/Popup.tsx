import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const render = function(h) { return (
    <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo/>
    <div>Popup</div>
    <p class="mt-2 opacity-50">
      This is the popup page
    </p>
    <button class="btn mt-2" onClick=={openOptionsPage()}>
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> { storageDemo  }
    </div>
  </main>
)}
