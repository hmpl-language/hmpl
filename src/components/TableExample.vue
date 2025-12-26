<template>
  <div>
    <table>
      <caption>
        List of products in the store
      </caption>
      <thead>
        <tr>
          <th scope="col">Product name</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ name, quantity, id } in products" :key="id">
          <td>{{ name }}</td>
          <td>{{ quantity }}</td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="switchComponent2" id="form">
      <div class="form-example">
        <label for="product">Product name: </label>
        <input
          v-model="product"
          type="text"
          name="product"
          id="product"
          required
        /><br />
        <label for="quantity">Quantity: </label>
        <input
          v-model="quantity"
          type="number"
          name="quantity"
          id="quantity"
          required
        />
      </div>
      <div class="form-example">
        <input type="submit" value="Add product" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
let id = 2;
const defaultValue = [
  { id: 0, name: "Coca Cola", quantity: 10 },
  { id: 1, name: "Lays", quantity: 4 }
];
const products = ref([...defaultValue]);
const product = ref("");
const quantity = ref("");
const loading = { id: -1, name: "Loading...", quantity: "Loading..." };
const switchComponent2 = () => {
  const currentArr = [...products.value];
  products.value = [...defaultValue, loading];
  setTimeout(() => {
    currentArr.push({ id, name: product.value, quantity: quantity.value });
    products.value = currentArr;
    product.value = "";
    quantity.value = "";
    id++;
  }, 300);
};
</script>
