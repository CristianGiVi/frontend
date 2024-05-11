<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
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
      productPrice: ''
    };
  },
  methods: {
    createProduct() {
      const newProduct = {
        name: this.productName,
        value: this.productPrice
      };
      axios.post('http://localhost/laravel/BackendPruebaTecnicaSumiLaravel/public/products/create', newProduct)
        .then(response => {
          this.$router.push('/products');
        })
        .catch(error => {
          console.error('Error al crear el producto:', error);
        });
    }
  }
};
</script>
