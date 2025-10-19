<script setup>

</script>
<template>
  <div class="outercontainer">
    <div class="top">
      <div class="tleft">
        <p><strong>Billing Board</strong></p>
      </div>
      <div class="tright">
        <i class="bi bi-house"></i>
        <i class="bi bi-question-circle"></i>
        <i class="bi bi-gear"></i>
      </div>
    </div>
    <div class="containers">
      <div class="left">
        <router-view name="left"></router-view>
      </div>
      <div class="right">
        <router-view name="right"></router-view>
      </div>
    </div>
    <div class="bottom">
      <p>Please Add the items to Dispatch! Thank you</p>
    </div>
  </div>
</template>
<style scoped>
  .outercontainer{
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    width:100%;
  }
  .top{
    display:flex;
    padding:10px;
    justify-content:space-between;
    padding-top:20px;
    
  }
  .top .tleft{
    margin-left:10px;
  }
  
  .top .tright{
    margin-right:10px;
    color:red;
    
  }
  .top .tright i{
    margin-right:10px;
    font-size:25px;
  }
  .top .tright i:hover{
    color:dodgerblue;
  }
  .containers {
    display: flex;
    gap: 10px;
    box-shadow: 0px 1px 7px #ccc;
    padding: 20px;
    border-radius: 20px;
    flex-wrap:wrap;
  }

  .left {
    flex: 1;
    border: 1px solid black;
    padding: 10px;
  }
  .right {
    flex: 1;
    border: 1px solid black;
    padding: 10px;
 
  }
  .bottom{
    text-align:center;
    padding:10px;
  }
  
</style>
