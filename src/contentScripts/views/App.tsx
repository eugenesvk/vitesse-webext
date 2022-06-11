import { useToggle } from '@vueuse/core'
import 'virtual:windi.css'

const [show, toggle] = useToggle(false)

const render = function(h) { return (
    <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
    <div class="bg-white text-gray-800 rounded-full shadow w-max h-min" p="x-4 y-2" m="y-auto r-2" transition="opacity duration-300" :class="show ? 'opacity-100' : 'opacity-0'">
      Vitesse WebExt
    </div>
    <div class= "flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg     	= "teal-600 hover:teal-700"
      onClick	= {toggle()}>
      <pixelarticons-power class="block m-auto text-white text-lg"/>
    </div>
  </div>
)}
