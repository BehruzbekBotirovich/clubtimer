<template>
  <a-col :lg="8">
    <a-spin :spinning="loadingUrl.has(`device/${device._id}`)">
      <div class="flex p-4 rounded-xl shadow-lg bg-white">
        <!-- Левая часть: Инфо о девайсе -->
        <a-col :lg="8" class="border-r pr-4  !px-0 relative">
          <div class="flex justify-center items-center w-full mb-2">
            <IconConsole v-if="device.type === 'PS'" class="text-6xl"/>
            <IconBilliard v-if="device.type === 'table'" class="text-6xl"/>
            <IconKaraoke v-if="device.type === 'karaoke'" class="text-6xl"/>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 text-center">{{ device.name }}</h3>
          <div class="text-center mt-2">
            <p class="text-sm text-gray-600">Tariff: <strong>{{ device.tariff_id.tariff_name }}</strong></p>
            <div class="text-sm text-gray-600">
              <div class="mb-1">Hozirgi narxi:</div>
              <a-tag color="blue">{{ currentPricePerHour }} so'm/soat</a-tag>
            </div>
          </div>
          <a-button @click="showDrawer(device._id)" type="default" class="absolute -top-1 -left-1">
            <template #icon>
              <icon-info-circle class="text-lg"/>
            </template>
          </a-button>
        </a-col>

        <!-- Правая часть: Сессия если есть -->
        <a-col v-if="device?.activeBooking" :lg="16" class="w-full space-y-2">
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
          <div class="flex w-full">
            <a-button-group class="mx-auto">
              <a-button type="primary" class="bg-red px-3 py-1 rounded">Tugatish</a-button>
              <a-dropdown :trigger="['click']">
                <a-button type="primary" class="bg-green  px-3 py-1 rounded">Uzaytirish</a-button>
                <template #overlay>
                  <a-menu class="w-fit">
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 5, buildingId, device._id  )"
                        key="0"
                        class="flex items-center gap-2">
                      +5 minut
                    </a-menu-item>
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 15, buildingId, device._id  )"
                        key="1" class="flex items-center gap-2">
                      +15 minut
                    </a-menu-item>
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 30, buildingId, device._id  )"
                        key="2">
                      +30 minut
                    </a-menu-item>
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 45, buildingId, device._id  )"
                        key="3">
                      +45 minut
                    </a-menu-item>
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 60, buildingId, device._id  )"
                        key="4">
                      +1 soat
                    </a-menu-item>
                    <a-menu-item
                        @click="bookStore.addTimeToBooking(device.activeBooking, 120, buildingId, device._id  )"
                        key="5">
                      +2 soat
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-button-group>
          </div>
          <div class="space-y-1">
            <div>
              <span class="text-gray-600">  Summa:</span> {{ device?.activeBooking?.total_price }}
            </div>
            <div v-if="device?.activeBooking?.client_name">
              <span class="text-gray-600">  Mijoz:</span> {{ device?.activeBooking?.client_name }}
            </div>
            <div v-if="device?.activeBooking?.description">
              <span class="text-gray-600">  Sharh:</span> {{ device?.activeBooking?.description }}
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
    </a-spin>
  </a-col>

  <a-drawer
      v-model:open="open"
      :title="device.name"
      placement="right"
  >
    <a-card title="Vaqt bo'yicha narxlar" size="small" class="mb-4 ">
      <div v-for="period in device.tariff_id.periods" :key="period._id" class="flex justify-between py-1 text-sm">
        <div>
          {{ formatHour(period.start_hour) }} - {{ formatHour(period.end_hour === 0 ? 24 : period.end_hour) }}
        </div>
        <div class="font-semibold">{{ period.price_per_hour }} so'm/soat</div>
      </div>
    </a-card>
    <h3>Bugungi sessiyalar</h3>
    <a-spin :spinning="loadingUrl.has('get-one-device-timeline')">
      <div class="mt-3">
        <div
            v-for="session in bookStore?.OneDeviceHistory?.timeline"
            :key="session._id"
            class="mb-3 p-3 rounded-xl shadow border bg-white space-y-2"
        >
          <div class="flex justify-between text-sm text-gray-700">
            <span><b>🕒</b> {{ formatTime(session.start_time) }} - {{ formatTime(session.end_time) }}</span>
            <a-tag color="green">{{ session.total_price }} so'm</a-tag>
          </div>
          <div class="text-sm text-gray-600 flex ">
            <icon-user-cog class="text-lg mr-1"/>
            <div><b>Hodim:</b> {{ session.user.fullName }}</div>
          </div>
          <div v-if="session.client_name" class="text-sm text-gray-600 flex ">
            <icon-user-check class="text-lg mr-1"/>
            <div><b>Mijoz:</b> {{ session.client_name }}</div>
          </div>
          <div v-if="session.description" class="text-sm text-gray-600">
            📝 <b>Sharh:</b> {{ session.description }}
          </div>
        </div>
      </div>
    </a-spin>
  </a-drawer>

</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import dayjs from 'dayjs';
import useBookingStore from "@/store/booking.pinia.js";
import {useRoute} from "vue-router";
import useCore from "@/store/core.pinia.js";
// components
import IconConsole from '@/components/icons/IconConsole.vue';
import IconBilliard from '@/components/icons/IconBilliard.vue';
import IconKaraoke from '@/components/icons/IconKaraoke.vue';
import IconClockAdd from "@/components/icons/IconClockAdd.vue";
import IconInfoCircle from "@/components/icons/IconInfoCircle.vue";
import {storeToRefs} from "pinia";
import IconUserCheck from "@/components/icons/IconUserCheck.vue";
import IconUserCog from "@/components/icons/IconUserCog.vue";
import IconThreeDots from "@/components/icons/IconThreeDots.vue";

const core = useCore();
const route = useRoute();
const bookStore = useBookingStore();
const props = defineProps({
  device: Object,
});
const {loadingUrl} = storeToRefs(core)
const buildingId = route.params.id;
///
const open = ref(false);
const showDrawer = (id) => {
  open.value = true;
  bookStore.getOneDeviceBooking(id)
};
///
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

  bookStore.createBooking(jsonData, buildingId);
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

const currentPricePerHour = computed(() => {
  const periods = props.device?.tariff_id?.periods || [];
  const nowHour = dayjs().hour();

  const matchedPeriod = periods.find(period => {
    const from = period.start_hour;
    const to = period.end_hour === 0 ? 24 : period.end_hour;
    // Обычный интервал: 9-18
    if (from < to) {
      return nowHour >= from && nowHour < to;
    } else {
      // Ночной интервал: например, 22 - 2
      return nowHour >= from || nowHour < to;
    }
  });

  return matchedPeriod?.price_per_hour || '—';
});

function formatHour(hour) {
  return `${hour.toString().padStart(2, '0')}:00`;
}

const formatTime = (isoString) => {
  return dayjs(isoString).format('HH:mm');
};
</script>

<style scoped>
.timer-display {
  width: 160px;
  padding: 10px 0;
  text-align: center;
  border-radius: 8px;
}
</style>