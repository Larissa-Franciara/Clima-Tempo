<template>
  <form @submit="onSubmit">
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
        <ul class="avaliacao">
          <li class="star-icon ativo" data-avaliacao="1"></li>
          <li class="star-icon" data-avaliacao="2"></li>
          <li class="star-icon" data-avaliacao="3"></li>
          <li class="star-icon" data-avaliacao="4"></li>
          <li class="star-icon" data-avaliacao="5"></li>
        </ul>
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
        <button type="submit" class="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Enviar</button>
      </div>
    </div>
  </div>
</div>
</div>
  </form>
</template>

<script setup>
import api from "../composables/useApi.js";
import {ref} from "vue";

const feedback = ref({
  id: '',
  author: '',
  mensagem: '',
  star: ''
})

const onSubmit = () => {
  api
      .post("/posts", feedback)
      .then(() => {
        console.log('Usuário cadastrado com sucesso')
      })
      .catch((error) => {
        console.log(error);
      });
}

</script>

<style>
.avaliacao{
  display: flex;
}
.star-icon{
  list-style-type: none;
  cursor: pointer;
  color: #ffe500;
  font-size: 40px;
}
.star-icon::before{
  content: "\2605";
}
.star-icon.ativo ~ .star-icon::before{

}
.avaliacao:hover .star-icon::before{
  content: "\2605";
}
.star-icon:hover ~ .star-icon::before{
  content: "\2606";
}
</style>
