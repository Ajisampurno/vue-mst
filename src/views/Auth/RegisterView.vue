<template>
    <div class="register-box">
        <div class="register-logo">
            <a href="#"><b>MST</b> Admin</a>
        </div>
        <div class="card">
            <div class="card-body register-card-body">
                <p class="login-box-msg">Register a new membership</p>
                <form @submit.prevent="handleRegister">
                    <div class="input-group mb-3">
                        <input type="text" v-model="fullName" class="form-control" placeholder="Full name" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" v-model="email" class="form-control" placeholder="Email" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" v-model="passwordConfirmation" class="form-control"
                            placeholder="Retype password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </div>
                    </div>
                </form>
                <router-link to="/login">
                    <p>I already have a membership</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/plugins/axios';

export default {
    data() {
        return {
            fullName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    },
    methods: {
        async handleRegister() {
            try {
                const response = await http.post('/register', {
                    name: this.fullName,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                });
                console.log(response.data);
                alert('sucsees registrasi');
                this.$router.push('/login');
            } catch (error) {
                console.error(error.response.data);
                // Show error message
                alert('Registration failed. Please check your inputs.');
            }
        },
    },
};
</script>

<style scoped>
.register-box {
    width: 350px;
    margin: auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
}

.card-body {
    padding: 20px;
}
</style>
