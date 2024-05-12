<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="alert alert-danger" v-if="error">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Registrar nuevo usuario
        </div>
        <div class="card-body">
          <form @submit.prevent="createUser">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Nombre de usuario" v-model="userName" required>
            </div>
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Correo electrónico" v-model="userEmail" required>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Contraseña" v-model="userPassword" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Crear Usuario</button>
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
      userName: '',
      userEmail: '',
      userPassword: '',
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    createUser() {
      const newUser = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword
      };

      axios.post('http://localhost/laravel/test/public/register', newUser)
        .then(response => {
          if(response.data.HttpStatus  == 409){
            this.error = true;
            this.errorMessage = 'Ya existe un usuario con este email';
          } else {
            this.$router.push('/');
          }
        })
        .catch(
          error => {
                    console.error(error);
                  }
        );
    }
  }
};
</script>


