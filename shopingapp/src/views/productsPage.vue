<template>
  <TopHeadder />
  <h1>products Page</h1>
  <div class="add">
    <h3>Products List</h3>
    <div id="sub" v-for="item in result" :key="item.product_id">
      <div id="img">
        <img src="../assets/logo.png" alt="" />
        <!-- <p>{{ item.image }}</p> -->
      </div>
      <div id="details">
        <h4>{{item.pname}}</h4>
        <br>
        <p>Product Price: Rs.{{ item.price }}</p>
        <button class="b1" @click="details(item.product_id)">View Details</button>
      </div>
      <br />     
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import TopHeadder from "../components/TopHeadder.vue";
import axios from "axios";

export default {
  name: "productsPage",
  components: {
    TopHeadder,
  },
  data() {
    return {
      Pid: "",
      Pname: "",
      Pquantity: "",
      Pprice: "",
      Pdescription: "",
      Pimg: "",
      Pstatus: "inCart",
      result: [],
    };
  },
  methods: {
    details(Pid) {
      localStorage.setItem("currProduct", Pid);
      this.$router.push({ name: `detailsPage` });
    },
    
  },
  mounted() {
    axios.get(`http://localhost:3000/allProducts`).then((response) => {
      this.result = [...response.data];
    });
  },
};
</script>

<style scoped>
#top {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 30px;
  text-decoration: none;
  /* border: 2px solid green; */
}
li {
  list-style-type: none;
  text-decoration: none;
  margin: 0px;
  float: left;
  padding: 0px 0px 0px 0px;
  /* border: 2px solid red; */
}
#LO {
  flex: right;
}
#C {
  margin-left: 10px;
}
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
.b1 {
  color: rgb(2, 83, 2);
  background: none;
  border: none;
  width: 200px;
  height: 30px;
  margin-bottom: 5px;
}
.b1:hover {
  color: rgb(2, 83, 2);
  background: rgb(137, 246, 134);
  margin-bottom: 5px;
}
#img {
  height: 100px;
  width: 100px;
  display: flex;
  margin: 0% 80% 0% 0%;
}
#details {
  /* display: flex; */
  margin: -90px 0px 0px 35px;
}
</style>