<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
          type="text"
          v-model="searchQuery"
          @input="getSearch"
          placeholder="Pesquise por Cidade ou Estado"
          class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      >
      <ul class="bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="mapBoxSearchResu">
        <p class="py-2" v-if="searchError">
          Desculpe, algo deu errado, tente novamente.
        </p>
        <p class="py-2" v-if="!searchError && mapBoxSearchResu.length === 0">
          Nenhum resultado corresponde à sua consulta. Tente um termo diferente.
        </p>
        <template v-else>
          <li class="py-2 cursor-pointer"
              v-for="searchResu in mapBoxSearchResu"
              :key="searchResu.id"
              @click="previewCity(searchResu)"
          >
            {{ searchResu.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList/>
        <template #fallback>
        <CityViewSeletion/>
        </template>
      </Suspense>
    </div>

  </main>
</template>
<script setup>
import {ref} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityViewSeletion from "../components/CityViewSeletion.vue";

const router = useRouter();
const previewCity = (searchResu) => {
  const [city, state] = searchResu.place_name.split(",");
  router.push({
    name: 'cityView',
    params: {state: state.trim(), city: city},
    query: {
      lat: searchResu.geometry.coordinates[1],
      lng: searchResu.geometry.coordinates[0],
      preview: true,
    }
  })
}


const mapboxApiKey =  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTime = ref(null);
const mapBoxSearchResu = ref(null);
const searchError = ref(null);

const getSearch = () => {
  clearTimeout(queryTime.value);
  queryTime.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const resu = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`);
        mapBoxSearchResu.value = resu.data.features;
        console.log(mapBoxSearchResu.value)
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapBoxSearchResu.value = null;
  }, 300)
}
</script>
