<template>
  <TopHeadder />
  <h1>details Page</h1>
  <div v-for="item in result" :key="item.product_id">
    <div id="img">
      <img style="height:250px;width:250px" :src="item.image" alt="" />
    </div>
    <div id="details">
      <h3>{{ item.pname }}</h3>
      <h4>Rs.{{ item.price }}</h4>
      <!-- <p></p> -->
      <p>{{ item.description }}</p>
      <br />
      <button class="b1" @click="addToCart(item.product_id)">
        Add to Cart
      </button>
    </div>
  </div>
  <!-- <button @click="hi">Check</button> -->
</template>

<script>
import TopHeadder from "../components/TopHeadder.vue";
import axios from "axios";

export default {
  name: "detailsPage",
  components: {
    TopHeadder,
  },
  data() {
    return {
      //   uid:'',
      message: "",
      Pid: "",
      result: [],
      Pquantity: "",
      result1: [],
      //   data1:[uid=localStorage.getItem('User-id'),],
    };
  },
  methods: {
    // check() {
    //   console.log();
    // },
    addToCart() {
      const info = {
        uid: localStorage.getItem("user-id"),
        pid: localStorage.getItem("currProduct"),
      };
      //   console.log(info);
      axios
        .get(`http://localhost:3000/checkCartForProduct`, { params: info })
        .then((response) => {
          this.result1 = [...response.data];
          const count = this.result1[0].count;
        //   console.log(this.result1[0].count);
          //   console.log(response.data);
          if (count === '0') {
            axios
              .post(`http://localhost:3000/addToCartNew`, info)
              .then((response) => {
                this.message = response.data;
                alert(response.data);
                console.log(`New`);
              });
          } else {
            axios
              .post(`http://localhost:3000/addToCartExisting`, info)
              .then((response) => {
                this.message = response.data;
                alert(response.data);
                console.log(`Existing`);
              });
          }
        });
      // console.log(info);
    },
  },
  mounted() {
    this.Pid = localStorage.getItem("currProduct");
    axios
      .get(`http://localhost:3000/productDetails/${this.Pid}`)
      .then((response) => {
        this.result = [...response.data];
        console.log(this.result);
      });
  },
};
</script>

<style scoped>
#img {
  display: flex;
  margin: 0px 0px 0px 0px;
}
#details {
  /* display: flex; */
  margin: -200px 0px 0px 250px;
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
  margin-bottom: 5px;
}
.b1:hover {
  color: rgb(2, 83, 2);
  background: rgb(137, 246, 134);
  margin-bottom: 5px;
}
</style>