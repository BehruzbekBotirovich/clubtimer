<template>
  <div class="w-full h-[300px]" ref="mapContainer"></div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'

const props = defineProps({
  modelValue: Array // Пример: [41.2995, 69.2401]
})
const emit = defineEmits(['update:modelValue'])

const mapContainer = ref()
let map
let placemark = null

onMounted(() => {
  window.ymaps.ready(() => {
    map = new window.ymaps.Map(mapContainer.value, {
      center: props.modelValue?.length ? props.modelValue : [41.2995, 69.2401], // Default Tashkent
      zoom: 13,
      controls: ['zoomControl']
    })

    // Если координаты уже есть — показать маркер
    if (props.modelValue?.length === 2) {
      placemark = createPlacemark(props.modelValue)
      map.geoObjects.add(placemark)
    }

    // Клик по карте
    map.events.add('click', (e) => {
      const coords = e.get('coords')

      // Удалить старый маркер
      if (placemark) map.geoObjects.remove(placemark)

      // Создать новый
      placemark = createPlacemark(coords)
      map.geoObjects.add(placemark)

      emit('update:modelValue', coords)
    })
  })
})

function createPlacemark(coords) {
  return new window.ymaps.Placemark(coords, {}, {
    preset: 'islands#redIcon'
  })
}
</script>

<style scoped>
div {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
