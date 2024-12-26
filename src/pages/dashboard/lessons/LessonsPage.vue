<template>
    <div class="calendar-container">
        <!-- Шапка календаря с навигацией -->
        <div class="calendar-header">
            <button @click="prevMonth">❮</button>
            <span>{{ currentMonthYear }}</span>
            <button @click="nextMonth">❯</button>
        </div>

        <!-- Сетка с днями недели -->
        <div class="calendar-grid">
            <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</div>

            <!-- Ячейки для каждого дня месяца -->
            <div v-for="day in daysInMonth" :key="day.date" class="calendar-day"
                :class="{ 'other-month': !day.isCurrentMonth }">
                <div class="day-number">{{ day.date.getDate() }}</div>

                <!-- События внутри ячейки -->
                <div class="events">
                    <div v-for="event in day.events" :key="event.title + event.time" :class="['event', event.color]">
                        {{ event.time }} - {{ event.title }}
                    </div>
                </div>

                <!-- Показать дополнительные события -->
                <div v-if="day.extraEvents" class="show-more">+{{ day.extraEvents }} (показать)</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentDate = ref(new Date());
const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Пример данных событий
const eventsData = [
    { date: '2024-10-01', time: '8:30', title: 'PRESIDENT_61', color: 'blue' },
    { date: '2024-10-01', time: '8:30', title: 'MIDDLE_61', color: 'red' },
    // Добавьте дополнительные события аналогично
];

// Генерация дней месяца с событиями
const daysInMonth = computed(() => {
    const days = [];
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay() || 7;
    const totalDays = startDayOfWeek + lastDayOfMonth.getDate() - 1;

    for (let i = 1 - startDayOfWeek; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(year, month, i);
        const isCurrentMonth = i > 0;
        const dayEvents = eventsData.filter(event => event.date === date.toISOString().split('T')[0]);
        const eventsToShow = dayEvents.slice(0, 5); // Показываем максимум 5 событий
        const extraEvents = dayEvents.length > 5 ? dayEvents.length - 5 : 0;

        days.push({ date, isCurrentMonth, events: eventsToShow, extraEvents });
    }
    return days;
});

const currentMonthYear = computed(() =>
    currentDate.value.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })
);

function prevMonth() {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
}

function nextMonth() {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
}
</script>

<style scoped>
.calendar-container {
    max-width: 1000px;
    margin: auto;
    text-align: center;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
}

.day-header {
    padding: 5px;
    text-align: center;
    font-weight: bold;
    background-color: #f3f4f6;
}

.calendar-day {
    border: 1px solid #ddd;
    min-height: 120px;
    position: relative;
    padding: 5px;
}

.other-month {
    background-color: #f0f0f0;
    color: #aaa;
}

.day-number {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

.events {
    text-align: left;
    font-size: 12px;
}

.event {
    padding: 2px;
    border-radius: 4px;
    margin-bottom: 2px;
    color: white;
}

.blue {
    background-color: #007bff;
}

.red {
    background-color: #dc3545;
}

/* Добавляем еще цвета, если необходимо */
.show-more {
    font-size: 10px;
    color: #007bff;
    cursor: pointer;
}
</style>