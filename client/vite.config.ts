import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      { 
        registerType: 'prompt',
        includeAssets:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
        manifest:{
          name:"Navir",
          short_name:"Navir",
          description:"Nations virtuelles",
          icons:[{
            src: '/android-chrome-192x192.png',
            sizes:'192x192',
            type:'image/png',
            purpose:'favicon'
          },
          {
            src:'/android-chrome-512x512.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'favicon'
          },
          {
            src: '/apple-touch-icon.png',
            sizes:'180x180',
            type:'image/png',
            purpose:'apple touch icon',
          },
          {
            src: '/maskable_icon.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'any maskable',
          }
        ],
        theme_color:'#fff',
        background_color: '#081825',
        display:"standalone",
        scope:'/',
        start_url:"/",
        orientation:'portrait'
        } 
      })],
})

