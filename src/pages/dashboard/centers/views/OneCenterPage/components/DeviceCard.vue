<template>
  <a-col :lg="8">
    <div class="flex p-6 rounded-xl shadow-lg bg-white">
      <!-- Левая часть: Инфо о девайсе -->
      <a-col :lg="8" class="mr-4 border-r pr-4">
        <div class="flex justify-center items-center w-full mb-2">
          <IconConsole v-if="device.type === 'PS'" class="text-6xl"/>
          <IconBilliard v-if="device.type === 'table'" class="text-6xl"/>
          <IconKaraoke v-if="device.type === 'karaoke'" class="text-6xl"/>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 text-center">{{ device.name }}</h3>
        <div class="text-center mt-2">
          <p class="text-sm text-gray-600">Tariff: <strong>{{ device.tariff_id.tariff_name }}</strong></p>
          <p class="text-sm text-gray-600">Narx: {{ device.tariff_id.periods[0].price_per_hour }} so'm/soat</p>
        </div>
      </a-col>

      <!-- Правая часть: Сессия если есть -->
      <a-col v-if="device?.activeBooking" :lg="16" class="w-full space-y-4">
        <div
            :class="[colorClass, 'timer-display text-white text-center font-bold text-xl transition-all duration-500']">
          {{ formattedTime }}
        </div>
        <div class="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
          <div :class="[colorClass, 'h-2 transition-all duration-500']" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="flex justify-between w-full text-sm text-gray-700">
          <div class="bg-gray-100 px-3 py-2 rounded-md font-medium">
            Start: {{ start.format('HH:mm') }}
          </div>
          <div class="bg-gray-100 px-3 py-2 rounded-md font-medium">
            End: {{ end.format('HH:mm') }}
          </div>
        </div>
      </a-col>
      <!--      ЕСЛИ СВОБОДНО-->
      <a-col v-else :lg="16" class="w-full space-y-4">
        <div v-if="timeAddOpen === false">
          <a-empty :description="null"/>
          <a-button type="primary" class="mx-auto bg-green" @click="timeAddOpen = true">
            <template #icon>
              <icon-clock-add class="text-lg mr-1"/>
            </template>
            Sessiya ochish
          </a-button>
        </div>
        <a-form v-else>
          <a-form-item name="time" :rules="[{ required: true }]">
            <h3>Vaqt oraligini tanlang</h3>
            <a-time-range-picker
                v-model:value="form.time"
                format="HH:mm"
                value-format="HH:mm"
                class="w-full"
            />
          </a-form-item>
          <a-form-item label="Mijoz">
            <a-input v-model:value="form.clientName" type="text" size=""/>
          </a-form-item>
          <a-form-item label="Kommentariya">
            <a-input v-model:value="form.description" type="text" size=""/>
          </a-form-item>
          <a-form-item label="Umimiy summa">
            <a-input v-model:value="total_summ" type="number" size=""/>
          </a-form-item>
          <a-form-item class="flex items-center ">
            <div class="flex items-center space-x-2">
              <a-button @click="timeAddOpen =false" type="default" danger>
                Bekor qilish
              </a-button>
              <a-button @click="submitForm(device._id)" type="primary">
                Qo'shish
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-col>
    </div>
  </a-col>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import dayjs from 'dayjs';
import useBookingStore from "@/store/booking.pinia.js";
// components
import IconConsole from '@/components/icons/IconConsole.vue';
import IconBilliard from '@/components/icons/IconBilliard.vue';
import IconKaraoke from '@/components/icons/IconKaraoke.vue';
import IconClockAdd from "@/components/icons/IconClockAdd.vue";

const bookStore = useBookingStore();
const props = defineProps({
  device: Object,
});

const timeAddOpen = ref(false);
const now = ref(dayjs());
let timer = null;
const total_summ = ref(null);

const form = ref({
  time: [dayjs().format('HH:mm'), null],
  description: null,
  clientName: null,
});

function submitForm(deviceId) {
  const [startTimeStr, endTimeStr] = form.value.time;
  const today = dayjs();

  let start = dayjs(`${today.format('YYYY-MM-DD')}T${startTimeStr}:00+05:00`);
  let end = dayjs(`${today.format('YYYY-MM-DD')}T${endTimeStr}:00+05:00`);

  if (end.isBefore(start)) {
    end = end.add(1, 'day');
  }

  const jsonData = {
    device_id: deviceId,
    client_name: form.value.clientName || '',
    description: form.value.description || '',
    start_time: start.format('YYYY-MM-DDTHH:mm:ssZ'),
    end_time: end.format('YYYY-MM-DDTHH:mm:ssZ'),
  };

  bookStore.createBooking(jsonData); // 👈 теперь отправляем как JSON, а не FormData
}


onMounted(() => {
  now.value = dayjs();
  timer = setInterval(() => {
    now.value = dayjs();
  }, 1000);
});

onUnmounted(() => clearInterval(timer));

// Активная сессия
const start = computed(() => dayjs(props.device?.activeBooking?.start_time));
const end = computed(() => dayjs(props.device?.activeBooking?.end_time));

const totalSeconds = computed(() => end.value.diff(start.value, 'second'));
const remainingSeconds = computed(() => Math.max(end.value.diff(now.value, 'second'), 0));
const elapsedSeconds = computed(() => totalSeconds.value - remainingSeconds.value);

const formattedTime = computed(() => {
  const h = String(Math.floor(remainingSeconds.value / 3600)).padStart(2, '0');
  const m = String(Math.floor((remainingSeconds.value % 3600) / 60)).padStart(2, '0');
  const s = String(remainingSeconds.value % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
});

const progress = computed(() => {
  if (totalSeconds.value === 0) return 100;
  return Math.min((elapsedSeconds.value / totalSeconds.value) * 100, 100);
});

const colorClass = computed(() => {
  if (remainingSeconds.value === 0) return 'bg-red';
  if (remainingSeconds.value <= 1800) return 'bg-yellow';
  return 'bg-green';
});

// 👇 Основная логика подсчета суммы
watch(() => form.value.time, ([startTime, endTime]) => {
  if (!startTime || !endTime) {
    total_summ.value = null;
    return;
  }

  const periods = props.device?.tariff_id?.periods || [];
  const start = dayjs(startTime, 'HH:mm');
  const end = dayjs(endTime, 'HH:mm');

  let total = 0;

  // Времена начала и конца могут быть в разных сутках (например, 22:00 - 02:00)
  let current = start.clone();
  while (current.isBefore(end)) {
    const hour = current.hour();
    const nextHour = current.clone().add(1, 'hour');
    const actualEnd = nextHour.isAfter(end) ? end : nextHour;

    // Поиск тарифа для текущего часа
    const matchedTariff = periods.find(p => {
      const from = p.start_hour;
      const to = p.end_hour === 0 ? 24 : p.end_hour;
      if (from < to) {
        return hour >= from && hour < to;
      } else {
        // Ночной тариф (например, 22 - 2)
        return hour >= from || hour < to;
      }
    });

    if (matchedTariff) {
      const duration = actualEnd.diff(current, 'minute') / 60;
      total += matchedTariff.price_per_hour * duration;
    }

    current = nextHour;
  }

  total_summ.value = Math.round(total);
});
</script>

<style scoped>
.timer-display {
  width: 160px;
  padding: 10px 0;
  text-align: center;
  border-radius: 8px;
}
</style>