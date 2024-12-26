<script setup>

</script>

<template>
  <div class="page-500">
    <img
      src="https://img.freepik.com/premium-vector/flat-illustration-500-internal-server-error-concept-can-t-connect-server-internet_258153-329.jpg"
      alt="">
    <a-row justify="center" class="w-100">
      <a-col :xs="24" :sm="24" :lg="12" :xl="8">
        <h1 class="mb-0 text-center">
          Qadirli foydalanuvchi!
        </h1>
        <p class="my-3 mx-auto text-center text-muted">
          Bu sahifaga siz internet bog'lanishi yoki tizim serverlarida muamo tug'ulgani tufayli yo'naltirildigniz!
          Tizim adminsitratorlari tez orada muamoni bartaraf etishadi.
        </p>
        <p class="text-center">
          <b>Keltirilgan noqulayliklar uchun uzur!</b>
        </p>
        <div class="text-center">
          <router-link :to="'/'">
            <a-button type="primary">
              Bosh sahifaga qaytish
            </a-button>
          </router-link>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.page-500 {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .w-100 {
    width: 100%;
  }

  p {
    line-height: 20px;
  }

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    overflow: hidden;
  }
}
</style>