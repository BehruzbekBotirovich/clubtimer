<template>
    <section>
        <h2 class="section-title">Ishga oid ma'lumotlar</h2>
        <a-row class="details">
            <a-col class="det" :span="6">Rol</a-col>
            <a-col class="det" :span="6">{{ jobData.role }}</a-col>

            <a-col class="det" :span="6">Ish boshlangan yil</a-col>
            <a-col class="det" :span="6">{{ jobData.startYear }}</a-col>

            <a-col class="det" :span="6">Tizimga qo'shilgan sana</a-col>
            <a-col class="det" :span="6">{{ jobData.joinedDate }}</a-col>

            <a-col class="det" :span="6">Oylik summasi</a-col>
            <a-col class="det" :span="6">{{ jobData.salary }}</a-col>

            <a-col class="det" :span="6">Bino nomi</a-col>
            <a-col class="det" :span="6">{{ jobData.buildingName }}</a-col>

            <a-col class="det" :span="6">Smena</a-col>
            <a-col class="det" :span="6">{{ jobData.shift }}</a-col>
        </a-row>
    </section>
    <section>
        <h2 class="section-title">Shaxsga oid ma'lumotlar</h2>
        <a-row class="details">
            <a-col class="det" :span="6">FISH</a-col>
            <a-col class="det" :span="6">{{ personalData.fullName }}</a-col>

            <a-col class="det" :span="6">Tug'ilgan sanasi</a-col>
            <a-col class="det" :span="6">{{ personalData.birthDate }}</a-col>

            <a-col class="det" :span="6">Passport seriya raqami</a-col>
            <a-col class="det" :span="6">{{ personalData.passportNumber }}</a-col>

            <a-col class="det" :span="6">Viloyat</a-col>
            <a-col class="det" :span="6">{{ personalData.region }}</a-col>

            <a-col class="det" :span="6">JSHSHIR (PINFL)</a-col>
            <a-col class="det" :span="6">{{ personalData.pinfl }}</a-col>

            <a-col class="det" :span="6">Pochta</a-col>
            <a-col class="det" :span="6">{{ personalData.email }}</a-col>

            <a-col class="det" :span="6">Manzil</a-col>
            <a-col class="det" :span="6">{{ personalData.address }}</a-col>

            <a-col class="det" :span="6">Telefon nomer</a-col>
            <a-col class="det" :span="6">{{ personalData.phoneNumber }}</a-col>
        </a-row>
    </section>
</template>

<script setup>
const jobData = {
    role: "Admin",
    startYear: "2021",
    joinedDate: "2021-05-15",
    salary: "3,500,000 UZS",
    buildingName: "HQ Building",
    shift: "Morning",
};

const personalData = {
    fullName: "Ahmadov Ahmad",
    birthDate: "1990-01-01",
    passportNumber: "AA1234567",
    region: "Tashkent",
    pinfl: "12345678901234",
    email: "ahmad@example.com",
    address: "123 Main Street, Tashkent",
    phoneNumber: "+998901234567",
};
</script>

<style>
.section-title {
    color: #333333;
    font-size: 14px;
    padding: 6px 10px;
    border-bottom: 1px solid #E5E7E8;
    margin-bottom: 6px;
}

.details {
    padding: 0 16px;
}

.details>.det {
    font-size: 14px;
    padding: 6px 0;
}

.details>.det:nth-child(even) {
    font-size: 14px;
    font-weight: 400;
}

.details>.det:nth-child(odd) {
    color: #959FA3;
}
</style>