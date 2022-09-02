<template>
<header class="sticky top-0 bg-weather-primary shadow-lg">
  <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
    <RouterLink :to="{ name: 'home' }">
      <div class="flex items-center gap-3">
        <i class="fa-solid fa-sun text-2xl"></i>
        <p class="text-2xl"> ClimaTempo</p>
      </div>
    </RouterLink>

    <div class="flex gap-3 flex-1 justify-end">
      <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
      >
      </i>
      <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
      >
      </i>
    </div>
    <RouterLink :to="{ name: 'feedback' }">
      <div class="flex items-center gap-3">
        <i class="fa-solid fa-check text-2xl"></i>
        <p class="text-1xl"> Feedback </p>
      </div>
    </RouterLink>

    <BaseModal :modalActive="modalActive"
               @close-modal="toggleModal"
    >
      <div class="text-black">
        <h1 class="text-2xl mb-1"> SOBRE </h1>
        <p class="mb-4">
          O Clima tempo permite que você rastreie as condições atuais e
          clima futuro das cidades de sua escolha.
        </p>
        <h2 class="text-2xl">COMO FUNCIONA:</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>
            Procure sua cidade digitando o nome no
            Barra de pesquisa.
          </li>
          <li>
            Selecione uma cidade nos resultados, isso levará
            você para o clima atual para sua seleção.
          </li>
          <li>
            Para salvar a cidade basta clicar no ícone "+" no
            canto superior direito. Isso salvará a cidade da sua escolha, para acompanhar em
            consultas futuras.
          </li>
        </ol>

        <h2 class="text-2xl"> REMOVER </h2>
        <p>
          Se você não deseja mais acompanhar uma cidade, basta selecionar
          a cidade na página inicial. Na parte inferior da
          página, haverá uma opção para remover a cidade.
        </p>

        <h2 class="mt-4 text-2xl"> Feedback </h2>
        <p>
          Deixa sua avaliação para sabermos como foi sua experiência com o ClimaTempo.
        </p>
      </div>
    </BaseModal>
  </nav>
</header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
        localStorage.getItem("savedCities")
    );
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem(
      "savedCities",
      JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

</script>
