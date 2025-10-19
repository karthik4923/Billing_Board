<script setup>
  import { ref, computed } from 'vue'
  import { useCart } from './cart.js'
  import qr from '../../assets/images/qr.png'
  import { data } from './data.js'
  import { jsPDF } from 'jspdf'

  const a = ref(0)
  const { adder } = useCart()

  const purchasedItems = ref([])  // Temporary array for PDF generation

  const totalprice = computed(() => {
    return adder.value.reduce((sum, item) => sum + item.quantity * item.cost, 0)
  })

  function downloadPDF() {
    if (purchasedItems.value.length === 0) {
      alert("No items to download. Please purchase items first.")
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Purchased Items', 14, 22)

    doc.setFontSize(12)
    let startY = 30

    // Table Headers
    doc.text('Item', 14, startY)
    doc.text('Quantity', 80, startY)
    doc.text('Cost', 120, startY)
    doc.text('Total', 150, startY)

    startY += 10

    purchasedItems.value.forEach((item, index) => {
      const total = item.quantity * item.cost
      doc.text(item.name, 14, startY + (index * 10))
      doc.text(String(item.quantity), 80, startY + (index * 10))
      doc.text(`₹${item.cost}`, 120, startY + (index * 10))
      doc.text(`₹${total}`, 150, startY + (index * 10))
    })

    // Total Price at bottom
    const totalCost = purchasedItems.value.reduce((sum, item) => sum + item.quantity * item.cost, 0)
    doc.setFontSize(14)
    doc.text(`Total Price: ₹${totalCost}`, 14, startY + (purchasedItems.value.length * 10) + 10)

    doc.save('purchased_items.pdf')

    // Clear temporary array after download
    purchasedItems.value = []
  }

  function handlePayment() {
    if (adder.value.length === 0) {
      alert('Your cart is empty!')
      return
    }

   
    purchasedItems.value = adder.value.map(item => ({ ...item }))

    
    adder.value.forEach(pitems => {
      for (const cat of data) {
        const pro = cat.items.find(i => i.name === pitems.name)
        if (pro) {
          pro.totalquantity -= pitems.quantity
          if (pro.totalquantity < 0) pro.totalquantity = 0
          break
        }
      }
    })

    alert('Successfully purchased! You can now download your receipt.')

    
    adder.value = []
  }
</script>


<template>
  <div class="contain">
    <p>Choose the type of payment</p>
    <div class="content">
      <select v-model="a">
        <option disabled value="">--select Payment type--</option>
        <option :value="1">Cash</option>
        <option :value="2">UPI</option>
        <option :value="3">Credit Card</option>
      </select>
      <span class="edi">|...</span>
    </div>

    <div v-if="a === 1" class="active">
      <p>hi cash</p>
      <p>Pay: &#8377;{{ totalprice }}</p>
    </div>
    <div v-if="a === 2" class="active">
      <p>hi upi</p>
      <img :src="qr" alt="QR Code" />
    </div>
    <div v-if="a === 3" class="active">
      <p>hi credit</p>
    </div>
  </div>

  <button @click="handlePayment">Pay</button>
  <button @click="downloadPDF" style="margin-left: 10px;">Download PDF</button>
</template>

<style scoped>
  .contain {
    margin-top: 20px;
    padding: 10px;
    font-family: 'Arial Rounded MT';
  }

  .active {
    margin-top: 10px;
    padding: 10px;
    background-color: #f4f4f4;
    border-left: 5px solid green;
  }

  .content {
    position: relative;
    border: 2px solid black;
    width: 230px;
  }

    .content select {
      border: none;
      outline: none;
      width: 100%;
    }

  .edi {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  button {
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }

    button:hover {
      background-color: green;
    }
</style>
