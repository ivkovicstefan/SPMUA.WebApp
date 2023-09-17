<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('');
const password = ref('');
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-50">
        <div class="flex flex-col p-6 w-full md:w-[400px] mt-[-50px]">
            <img src="@/assets/logo-light.png" class="h-[120px] self-center mb-6"/>
            <h1 class="text-2xl text-center !text-black font-light mb-6">Uloguj se kao administrator</h1>
            <div class="flex flex-col gap-2 border rounded bg-white p-6 mb-6">
                <label class="font-medium" for="email">Email adresa</label>
                <InputText v-model="email" type="email" />

                <label class="font-medium" for="email">Lozinka</label>
                <Password v-model="password" :feedback="false" toggleMask class="mb-6"></Password>

                <Button class="text-center">Uloguj se</Button>
            </div>
            <div class="flex flex-col gap-2 border rounded bg-white p-6">
                <p class="text-sm text-medium text-justify">
                    Neovlašćen pristup biće sankcionisan merama zakona Republike Srbije. Za povratak na početnu stranicu
                    <router-link to="/"><span class="text-amber-500">klikni ovde</span>.</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
.p-password-input {
    @apply !w-full
}

.p-button {
    @apply justify-center
}
</style>