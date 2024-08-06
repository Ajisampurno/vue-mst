<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main class="mt-5 px-3">
            <h1 class="text-center">Cover your page.</h1>
            <p class="lead text-center">
                Cover is a one-page template for building simple and beautiful home pages.
                Download, edit the text, and add your own fullscreen background photo to make it your own.
            </p>
            <p class="text-center">
                <RouterLink to="/login" class="btn btn-lg btn-success fw-bold">Login</RouterLink>
                <RouterLink to="/register" class="btn btn-lg btn-primary fw-bold m-3">Registrasi</RouterLink>
            </p>
        </main>
        <footer class="mt-auto text-white-50">
            <p>
                Aji sampurno
            </p>
        </footer>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.cover-container {
    max-width: auto;
    min-height: 640px;
    background-color: rgb(71, 71, 71);
    color: #fff;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>
