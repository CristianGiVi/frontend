<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="alert alert-danger" v-if="error">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Registrar nuevo producto
        </div>
        <div class="card-body">
          <form @submit.prevent="createProduct">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Ingrese el nombre del producto" v-model="productName" required>
            </div>
            <div class="input-group mb-3">
              <input type="number" class="form-control" placeholder="Ingrese el precio del producto" v-model="productPrice" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Crear Producto</button>
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
      productName: '',
      productPrice: '',
      error: false,
      errorMessage: '' 
    };
  },
  methods: {
    createProduct() {
      const newProduct = {
        name: this.productName,
        value: this.productPrice
      };
      axios.post('http://localhost/laravel/test/public/products/create', newProduct)
        .then(response => {
          if(response.data.HttpStatus  == 409){
            this.error = true;
            this.errorMessage = 'Ya existe un producto con este nombre';
          } else {
            this.$router.push('/products');
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
