<template>
  <a-col :lg="8" class="flex rounded-xl shadow-lg bg-white animate-pulse overflow-hidden">
    <!-- Левая часть -->
    <div class="flex flex-col items-center justify-between w-1/2 p-4">
      <div class="w-14 h-14 bg-gray-300 rounded-full mb-4"></div>
      <div class="h-4 w-20 bg-gray-300 rounded mb-2"></div>
      <div class="h-3 w-24 bg-gray-200 rounded mb-1"></div>
      <div class="h-6 w-24 bg-gray-300 rounded-full mt-2"></div>
    </div>

    <!-- Правая часть -->
    <div class="flex-1 p-4 space-y-3">
      <div class="h-10 w-40 bg-gray-300 rounded-md mx-auto"></div>
      <div class="h-3 w-full bg-gray-200 rounded-full">
        <div class="h-3 bg-gray-300 rounded-full w-2/5"></div>
      </div>

      <div class="flex justify-between mt-4">
        <div class="space-y-1">
          <div class="h-4 w-16 bg-gray-300 rounded"></div>
          <div class="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div class="space-y-1 text-right">
          <div class="h-4 w-16 bg-gray-300 rounded"></div>
          <div class="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </a-col>
</template>
