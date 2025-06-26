<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold py-6">
        Tarifflar
      </h1>
      <a-button @click="openNewTariffCard" type="primary" size="large">
        + Новый тариф
      </a-button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Новый тариф -->
      <div
          v-if="newTariff"
          class="bg-white rounded-xl shadow p-4 border border-dashed border-blue-400"
      >
        <div class="mb-2">
          <input
              v-model="newTariff.tariff_name"
              class="w-full border px-2 py-1 rounded mb-2"
              placeholder="Tariff Name"
          />
          <input
              v-model="newTariff.device_type"
              class="w-full border px-2 py-1 rounded"
              placeholder="Device Type"
          />
        </div>

        <div class="space-y-2 mb-3">
          <div
              v-for="(period, idx) in newTariff.periods"
              :key="idx"
              class="grid grid-cols-4 gap-2 items-center"
          >
            <input
                v-model.number="period.start_hour"
                type="number"
                class="border px-2 py-1 rounded"
                placeholder="Start"
                min="0"
                max="23"
            />
            <input
                v-model.number="period.end_hour"
                type="number"
                class="border px-2 py-1 rounded"
                placeholder="End"
                min="0"
                max="23"
            />
            <input
                v-model.number="period.price_per_hour"
                type="number"
                class="border px-2 py-1 rounded text-green-600 font-semibold"
                placeholder="Price"
            />
            <a-button
                type="text"
                @click="newTariff.periods.splice(idx, 1)"
                class="text-red-500 hover:text-red-700 w-[40px] text-center"
            >
              ❌
            </a-button>
          </div>
        </div>

        <div class="flex gap-2">
          <a-button type="primary"
                    @click="createNewTariff"
          >
            ✅ Создать
          </a-button>
          <a-button
              type="default"
              @click="cancelNewTariff"
          >
            ❌ bekor qilish
          </a-button>
          <a-button
              class="px-3 py-1 bg-gray-200 text-black rounded"
              @click="addPeriodToNewTariff"
          >
            + Interval
          </a-button>
        </div>
      </div>

      <!-- Существующие тарифы -->
      <div
          v-for="(tariff, index) in editableTariffs"
          :key="tariff._id"
          class="bg-white rounded-xl shadow p-4 h-fit"
      >
        <div class="mb-2">
          <input
              v-model="tariff.tariff_name"
              class="w-full border px-2 py-1 rounded mb-2"
              placeholder="Tariff Name"
          />
          <input
              v-model="tariff.device_type"
              class="w-full border px-2 py-1 rounded"
              placeholder="Device Type"
          />
        </div>

        <div class="space-y-2 mb-3">
          <div
              v-for="(period, pIdx) in tariff.periods"
              :key="pIdx"
              class="grid grid-cols-4 gap-2 items-center"
          >
            <input
                v-model.number="period.start_hour"
                type="number"
                class="border px-2 py-1 rounded"
                placeholder="Start"
                min="0"
                max="23"
            />
            <input
                v-model.number="period.end_hour"
                type="number"
                class="border px-2 py-1 rounded"
                placeholder="End"
                min="0"
                max="23"
            />
            <input
                v-model.number="period.price_per_hour"
                type="number"
                class="border px-2 py-1 rounded text-green-600 font-semibold"
                placeholder="Price"
            />
            <a-button
                type="text"
                @click="removePeriod(index, pIdx)"
                class="text-red-500 hover:text-red-700 w-[40px] text-center"
            >
              ❌
            </a-button>
          </div>
        </div>

        <div class="flex gap-2">
          <button
              class="px-3 py-1 bg-blue-600 text-white rounded"
              @click="saveTariff(tariff)"
          >
            Сохранить
          </button>
          <button
              class="px-3 py-1 bg-gray-200 text-black rounded"
              @click="addPeriod(index)"
          >
            + Период
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import useTariffStore from "@/store/tariff.pinia.js";

const tariffStore = useTariffStore();

const editableTariffs = ref([]);
const newTariff = ref(null);

onMounted(() => {
  if (tariffStore.tariffs.length === 0) {
    tariffStore.getAllTariffs();
  }
});

watch(
    () => tariffStore.tariffs,
    (newVal) => {
      editableTariffs.value = newVal.map(t => ({
        ...t,
        periods: t.periods.map(p => ({...p}))
      }));
    },
    {immediate: true}
);

function addPeriod(index) {
  editableTariffs.value[index].periods.push({
    start_hour: 0,
    end_hour: 1,
    price_per_hour: 0
  });
}

function removePeriod(tariffIndex, periodIndex) {
  editableTariffs.value[tariffIndex].periods.splice(periodIndex, 1);
}

function saveTariff(tariff) {
  tariffStore.updateTariff(tariff._id, tariff);
}

function openNewTariffCard() {
  newTariff.value = {
    tariff_name: '',
    device_type: '',
    periods: []
  };
}

function addPeriodToNewTariff() {
  newTariff.value.periods.push({
    start_hour: 0,
    end_hour: 1,
    price_per_hour: 0
  });
}

function cancelNewTariff() {
  newTariff.value = null;
}

function createNewTariff() {
  tariffStore.createTariff(newTariff.value);
}
</script>
