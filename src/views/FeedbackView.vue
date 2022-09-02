<template>
  <form @submit.prevent="onSubmit">
<div class="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
<div class="py-3 sm:max-w-xl sm:mx-auto">
  <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
    <div class="px-12 py-5">
      <h2 class="text-gray-800 text-2xl font-semibold">
        Sua opinião é importante para nós!
      </h2>
    </div>
    <div class="bg-gray-200 w-full flex flex-col items-center">
      <div class="flex flex-col items-center py-6 space-y-3">
        <span  class="text-xl text-gray-800">Como foi a qualidade da requisição ?</span>
      </div>
      <div class="w-3/4 flex flex-col">
        <input
            type="text"
            v-model="feedback.author"
            placeholder="Digite seu nome"
            class=" mb-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
        <input
            v-model="feedback.mensagem"
            placeholder='Deixa sua opinião'
            class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
        />
        <button type="submit" class="py-3 my-8 text-lg bg-orange-500 from-orange-500 to-indigo-600 rounded-xl text-white">Enviar</button>
      </div>
      <div class="flex justify-center items-center  p-8  w-auto space-x-1 lg:space-x-2">
        <button class="mr-1">
          <svg class="text-yellow-400 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
          </svg>
        </button>
        <span class="text-slate-400 font-medium">9.5 • <span class="font-normal underline">129 reviews </span></span>
      </div>
    </div>
  </div>
</div>
</div>
  </form>
</template>

<script setup>
import api from "../composables/useApi.js";
import { ref } from 'vue'



const feedback = ref({
  id: '',
  author: '',
  mensagem: '',
  star: ''
})


const onSubmit = () => {
  api
      .post("posts", feedback)
      .then((res) => {
        console.log('Mensagem enviada com sucesso', res.data)

      })
      .catch((error) => {
        console.log(error);
      })

}

</script>

<style>

</style>
