<template>
    <div>
        <h1>Productos</h1>
        <div class="row mb-3">
            <div class="col-lg-8 offset-lg-2">
                <button @click="goToCreateProduct" class="btn btn-success mb-2">Crear Nuevo Producto</button>
                <form @submit.prevent="searchProducts">
                    <div class="input-group">
                        <input type="text" class="form-control" ref="searchInput" placeholder="Buscar por nombre">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </form>
                </div>
            </div>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="5"><h3>Cargando</h3></td>
                            </tr>
                            <tr v-else v-for="(product, index) in products" :key="product.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ product.id }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.value }}</td>
                                <td>
                                    <router-link :to="{ path: '/product/edit/' + product.id }" class="btn btn-warning">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    &nbsp;
                                    <button @click="deleteProduct(product.id)" class="btn btn-danger">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return {
                products: null,
                loading: false
            }
        }, mounted(){
            this.getProducts();
        }
        ,methods: {
            getProducts(){
                this.loading = true;
                axios.get('http://localhost/laravel/test/public/products')
                .then(
                    res => {
                        this.products = res.data.data;
                        this.loading = false;
                    }
                ).catch(
                    error => {
                        console.error(error);
                        this.loading = false;
                    }
                );
            },

            searchProducts() {
                const searchTerm = this.$refs.searchInput.value.trim();

                if(searchTerm){
                    this.loading = true;
                    axios.get(`http://localhost/laravel/test/public/products/${searchTerm}`)
                    .then(
                        res => {
                            this.products = res.data.data;
                            this.loading = false;
                        }
                    )
                    .catch(
                        error => {
                            this.loading = false;
                            return
                        }
                    );
                } else {
                    this.getProducts();
                }

            },

            deleteProduct(id) {
                axios.delete(`http://localhost/laravel/test/public/products/delete/${id}`)
                .then(
                    res => {
                        this.getProducts();
                    }
                )
                .catch(
                    error => {
                        console.error(error);
                    }
                );
            },
            goToCreateProduct() {
                this.$router.push('/product/create');
            }
        },
    }
</script>