<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="alert alert-danger" v-if="error">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Editar el producto
        </div>
          <div class="card-body">
            <form @submit.prevent="updateProduct">
              <div class="input-group mb-3">
                <input type="text" class="form-control" id="name" placeholder="Ingrese el nombre del producto" v-model="productName" required>
              </div>
              <div class="input-group mb-3">
                <input type="number" class="form-control" id="price" placeholder="Ingrese el precio del producto" v-model="productPrice" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Guardar Cambios</button>
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
      productId: null,
      error: false,
    };
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.getProductDetails();
  },
  methods: {
    getProductDetails() {
      axios.get(`http://localhost/laravel/test/public/products/${this.productId}`)
        .then(response => {
          const product = response.data.data;
          this.productName = product.name;
          this.productPrice = product.value;
        })
        .catch(error => {
          console.error('Error al obtener los detalles del producto:', error);
        });
    },
    updateProduct() {
      const updatedProduct = {
        name: this.productName,
        value: this.productPrice,
      };
      axios.put(`http://localhost/laravel/test/public/products/put/${this.productId}`, updatedProduct)
        .then(response => {
          this.$router.push('/products');
        })
        .catch(error => {
          console.error('Error al actualizar el producto:', error);
          this.error = true;
          this.errorMessage = 'Ya existe un producto con este nombre';
        });
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
