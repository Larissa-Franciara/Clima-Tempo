<template>
  <div class="flex flex-col flex-1 fundo items-center">
    <div
        v-if="route.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        Você pode salvar está cidade, clicando no ícone de "+".
      </p>
    </div>
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl txt mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("pt-BR", router,
              {
                weekday: "short",
                day: "2-digit",
                month: "long",
              }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("pt-BR", {timeStyle: "short"})
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round((weatherData.current.temp - 32) / 1.8).toFixed(0)}}&deg;C
      </p>
      <p>
        Exatamente
        {{ Math.round((weatherData.current.feels_like - 32) / 1.8 ).toFixed(0)}} &deg;C
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
          class="w-[150px] h-auto"
          :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
          alt=""
      />
    </div>

    <hr class="border-white border w-full" />
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Tempo de hora em hora</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(
                    hourData.currentTime
                ).toLocaleTimeString("pt-BR", {hour: "numeric", minute: "numeric"})
              }}
            </p>
            <img
                class="w-auto h-[50px] object-cover"
                :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
                alt=""
            />
            <p class="text-xl">
              {{ Math.round((hourData.temp -32 ) / 1.8).toFixed(0) }}&deg;C
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />
    <div class="max-w-screen-md mt-9 bg-black backdrop-blur-xl bg-weather-secondary/30 w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-center">Previsão para os próximo 7 dias</h2>
        <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center"
        >
          <p class="flex-1 txt">
            {{
              new Date(day.dt * 1000).toLocaleDateString("pt-br", {weekday: "long",})
            }}
          </p>
          <img
              class="w-[50px] h-[50px] object-cover"
              :src="
              `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            "
              alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p> Max: {{ Math.round((day.temp.max - 32) / 1.8) }}ºC</p>
            <p> Min: {{ Math.round((day.temp.min - 32) / 1.8) }}ºC</p>
          </div>
        </div>
      </div>
    </div>

    <div
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>REMOVER</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;


    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
      (city) => city.id !== route.query.id
  );
  localStorage.setItem(
      "savedCities",
      JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });
};
</script>
<style scoped>
.fundo {
  height: 100%;
  background-image: url("../assets/img/bg-2.jpg");
  background-position: 30% 60%;
  background-size: cover;
  filter: grayscale(45%);
}
.txt {
  text-shadow: 0.1em 0.1em 0.3em black
}
</style>
