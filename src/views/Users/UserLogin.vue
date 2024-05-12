<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="alert alert-danger" v-if="error">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Iniciar sesión
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Correo electrónico" v-model="userEmail" required>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Contraseña" v-model="userPassword" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    loginUser() {
      const userData = {
        email: this.userEmail,
        password: this.userPassword
      };

      axios.post('http://localhost/laravel/BackendPruebaTecnicaSumiLaravel/public/login', userData)
        .then(response => {
          if (!response.data) {
            this.error = true;
            this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
          } else {
            console.log('Inicio de sesión exitoso:', response.data);
            this.$router.push('/products');
          }
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
        });
    }
  }
};
</script>
