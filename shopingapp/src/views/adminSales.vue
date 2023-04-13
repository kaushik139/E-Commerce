<template>
    <TopHeadder/>
    <h2>Sales Page</h2>
  <div class="add">
    <h3>Sales List</h3>
    <div id="sub" v-for="item in result" :key="item.product_id">
        <ul type="none">
            <li>
 User Name: {{item.name}}
            </li>
            <li>
Product Name: {{item.pname}}
            </li>
            <li>
Product Price: Rs.{{ item.price }}
            </li>
            <li>
Product Quantity: {{ item.pquantity }}
            </li>
            <li>
 Product status: {{ item.status }}
            </li>
        </ul>
      
      <!-- <p>Product Id: {{ item.product_id }}</p> -->
     
     
     
    
      <br />
    </div>
  </div>
</template>

<script>
import TopHeadder from '../components/TopHeadder.vue';
import axios from 'axios';

export default ({
   name:"adminSales",
   components:{
TopHeadder
   },
   data(){
    return{
        result:[]
    }
   },
   mounted(){
axios.
get(`http://localhost:3000/adminSales`)
.then((response) => {
      this.result = [...response.data];
      console.log(response.data);
    });
   },
})
</script>

<style scoped>
.add {
  border: 2px solid rgb(3, 164, 35);
  border-radius: 15px;
  /* display: block; */
  background: rgb(213, 239, 218);
}
#sub {
  background: white;
  border: 1px solid greenyellow;
  border-radius: 10px;
}
li{
    display: inline;
    padding: 20px;
}
</style>