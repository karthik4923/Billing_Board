<script setup>
  import { useCart } from './cart.js'
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  const { adder, increase, decrease, remove,updateQuantity } = useCart()
  const totalprice=computed(() => {
    return adder.value.reduce((sum, item) => {
      return sum+item.quantity*item.cost
    },0)
  })
  const router = useRouter();
  function payment() {
    if (adder.value.length === 0) {
      alert('cart is empty!')
    } else {
      alert('Booked Successfully')
      router.push('/payment')
    }
    
  }
</script>

<template>
  <div class="leftcontainer">
    <div class="inner">
      <table class="container1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Volume</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d,index) in adder" :key="index" class="content">
            <td>{{index+1}}</td>
            <td>{{ d.name }}</td>
            <td>
              <div v-if="d.grams">{{d.grams}}g</div>
              <div v-if="d.kgs">{{d.kgs}}kg</div>
              <div v-if="d.liters">{{d.liters}}L</div>
              <div else> </div>
            </td>
            <td>{{ d.cost }}</td>
            <td>
              <button @click="decrease(d)" class="qunat">-</button>
              <input
                     :value="d.quantity"
                     @input="updateQuantity(d, $event)"
                     class="qty-input"
                     min="1" />
              <button @click="increase(d)" class="qunat">+</button>
            </td>
            <td>&#8377; {{ d.quantity * d.cost }}</td>
            <td><button @click="remove(d)" class="remo">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="botprice">
      <h3>Total Price: &#8377; {{totalprice}}</h3>
      <button @click="payment">Pay</button>
    </div>
  </div>
</template>
<style scoped>
  .leftcontainer {
    padding: 10px;
    width: 100%;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }
  .container1{
    box-sizing:border-box;
    font-size:smaller;
  }
   
  .container1 thead th{
    background-color:#ccc;
    padding:5px;
    margin-bottom:10px
  }
  .container1 thead th:nth-child(1){
    width:5%;
  }
  .container1 thead th:nth-child(2) {
      width: 15%;
      word-break:break-word;
  }
  .container1 thead th:nth-child(3){
    width:4%;
  }
  .container1 thead th:nth-child(4) {
      width: 6%; /* Price */
   }

    .container1 thead th:nth-child(5) {
      width: 35%; 
    }

    .container1 thead th:nth-child(6) {
      width: 15%; 
    }

    .container1 tbody td{
      border-bottom:1px solid #ccc;
    }
  .inner {
    height: 500px;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 10px;
    width: 100%;
    scroll-behavior: smooth;
  }
  .qunat {
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    padding: 6px 10px;
    border-radius: 6px;
    width: 30px;
    font-size: 16px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

   .qunat:hover {
      background-color: #ddd;
    }
  .qty-input {
   
    max-width:50px;
    text-align: center;
    padding: 5px;
    margin: 0 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .remo {
    background-color: #ff4d4d;
    border: none;
    color: white;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

    .remo:hover {
      background-color: #cc0000;
    }

  .botprice {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.2em;
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }

  .botprice button {
    border: none;
    background-color: #80ce4b;
    color: white;
    border-radius: 10px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

    .botprice button:hover {
      background-color: forestgreen;
    }
  @media (max-width: 768px) {
    .container1 {
      display: block;
      overflow-x: auto;
      white-space: wrap;
      border-radius:0px;
    }
      .container1 tbody td:nth-child(4) {
        width:10%;
     
     }
      .inner{
        
  
        box-sizing:border-box;
      }
      .leftcontainer{
        padding:0px;
      }
      .qty-input{
        width:30px;
        
        font-size:small;
      }
      


    .qunat{
      padding:0px;
      font-size:large;

    }
    .remo {
      
      font-size: 14px;
      padding: 5px 8px;
    }

    .botprice {
      flex-direction: column;
      gap: 10px;
      font-size: 1em;
      align-items: flex-start;
    }

      .botprice button {
        width: 100%;
        font-size: 1em;
        padding: 10px;
      }
  }
</style>

