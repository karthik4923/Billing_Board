<script setup>
  import { data } from './data.js'
  import { computed, ref,reactive} from 'vue'
  import { useCart } from './cart.js'
  const curindex = ref(0)
  
  function changer(id) {
    curindex.value = id
  }
  const { addToCart, getAddedQuantity } = useCart()

  function add(d) {
    addToCart(d)
  }
 
</script>

<template>
  <div class="rightconatiner">
    <div class="items">
      <div v-for="(item, index) in data" :key="index" class="buttoner">
        <button @click="changer(index)" :class="{ act: index === curindex }">{{ item.type }}</button>
      </div>
    </div>
    <div class="content">
      <div v-for="(product, idx) in data[curindex].items"
           :key="idx"
           class="itemer"
           @click="add(product)">
        <img :src="product.image" />
        <p>
          <strong>{{ product.name }}</strong>
          <div>
            <div v-if="product.grams">{{product.grams}} gr</div>
            <div v-if="product.kgs">{{product.kgs}} Kg</div>
            <div v-if="product.liters">{{product.liters}} Liter</div>
            <div else> </div>
          </div>
        </p>
        
        <p>&#8377; {{ product.cost }}</p>
        <span>Available: {{ product.totalquantity - getAddedQuantity(product.name)  }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .rightconatiner {
    padding: 10px;
    width:100%;
  }

  .items {
    display: flex;
    gap: 10px;
  }

  .buttoner button {
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    transition:all 0.4s ease;
  }
  .buttoner button:hover{
      transform:scale(0.9);
  }

  .act {
    background-color: red;
    color: white;
    transform:scale(1.1)
  }

  .content {
    display: flex;
    font-family: Arial;
    gap: 10px;
    margin-top: 10px;
    height: 500px;
    flex-wrap: wrap;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

    .content::-webkit-scrollbar {
      width: 5px;
    }

    .content::-webkit-scrollbar-thumb {
      background-color: gray;
    }

    .content img {
      height: 100px;
      width: 100px;
      justify-content:center;
    }

  .itemer {
    box-shadow: 0px 3px 4px #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 150px;
    height: 250px;
    cursor: pointer;
  }

    .itemer:hover {
      border: 1px solid red;
    }

    .itemer p {
      text-align: center;
      margin-top: 0px;
    }
</style>
