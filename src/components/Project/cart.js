import { ref, watch } from 'vue'

const adder = ref(JSON.parse(localStorage.getItem('addeddata') || '[]'))

// Keep localStorage in sync whenever adder changes
watch(adder, (newVal) => {
  localStorage.setItem('addeddata', JSON.stringify(newVal))
}, { deep: true })

function addToCart(item) {
  const found = adder.value.find(i => i.name === item.name)
  if (item.totalquantity === 0) {
    alert('out of stock')
  }
  else {
    if (found) {
      found.quantity += 1
    } else {
      adder.value.push({ ...item, quantity: 1 })
    }
  }
    
  
}

function getAddedQuantity(name) {
  const found = adder.value.find(i => i.name === name)
  return found ? found.quantity : 0
}
function increase(item) {
  const found = adder.value.find(i => i.name === item.name)
  if (found) {
    found.quantity+=1
  }
  
}
function decrease(item) {
  const found = adder.value.find(i => i.name === item.name)
  if (found) {
    if (found.quantity > 1) {
      found.quantity -= 1
    } else {
     
      const index = adder.value.indexOf(found)
      adder.value.splice(index, 1)
    }
  }
 
}
function remove(item) {
  const index = adder.value.findIndex(i => i.name === item.name)
  if (index > -1) {
    adder.value.splice(index, 1)
  }
}
function updateQuantity(item, event) {
  const val = parseInt(event.target.value)
  if (val > item.totalquantity) {
    alert('out of stork')
  }
  else {
    if (!isNaN(val) && val > 0) {
      item.quantity = val
    } else {
      item.quantity = 1
    }

  }
 
}


export function useCart() {
  return {
    adder,
    addToCart,
    getAddedQuantity,
    increase,
    decrease,
    remove,
    updateQuantity,
    
  }
}
