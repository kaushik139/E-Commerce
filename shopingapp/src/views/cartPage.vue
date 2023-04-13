<template>
  <TopHeadder />
  <h1>carts Page</h1>
  <div class="add">
    <div id="sub" v-for="item in result" :key="item.cart_id">
      <div id="img">
        <img style="height:100px;width:100px" :src="item.image" alt="Balaji" />
        <!-- <p>{{ item.image }}</p> -->
      </div>
      <div id="details">
        <h3>{{ item.pname }}</h3>
        <p>Product Price: {{ item.price }}</p>
        <button @click="minus(item.cart_id, item.pid)">
          <img class="icon" src="../assets/minus.png" />
        </button>
        {{ item.cquantity }}
        <button  @click="plus(item.cart_id, item.pid)">
          <img
            class="icon"
            src="../assets/plus.png"
          />
        </button>
        <br /><br />
        <button class="b1" @click="remove(item.pid)">Remove from cart</button>
      </div>
    </div>
    <br />
    Total Price: {{ TotalPrice }}
    <br />
    <button class="b1" @click="checkout">Proceed To Checkout</button>
  </div>
  <!-- <button @click="checkout">Check</button> -->
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import TopHeadder from "../components/TopHeadder.vue";
import axios from "axios";
export default {
  name: "cartPage",
  components: {
    TopHeadder,
  },
  data() {
    return {
      // uid:'',
      Pid: "",
      Pname: "",
      Pquantity: "",
      Pprice: "",
      Pdescription: "",
      Pimg: "",
      result: [],
      TotalPrice: "",
      TPrice: "",
    };
  },
  methods: {
    minus(element,pid) {
      axios.put(`http://localhost:3000/decrementCartQuantity/${element}`).then(
        // axios
        //   .get(`http://localhost:3000/fetchProductId/${element}`)
        //   .then((response) => {
        //     this.result = [...response.data];
        //     console.log(this.result.product_id);
        //     axios.put(
        //       `http://localhost:3000/incrementProductQuantity/${this.result}`
        //     );
        //     document.location.reload();
        //   })
        axios.put(
              `http://localhost:3000/incrementProductQuantity/${pid}`
          ).then(document.location.reload())
      );
    },
    plus(element,pid) {
      axios.put(`http://localhost:3000/incrementCartQuantity/${element}`).then(
        // axios
        //   .get(`http://localhost:3000/fetchProductId/${element}`)
        //   .then((response) => {
        //     this.result = [...response.data];
        //     console.log(this.result.product_id);
        //     axios.put(
        //       `http://localhost:3000/decrementProductQuantity/${this.result}`
        //     );
        //     document.location.reload();
        //   })
          axios.put(
              `http://localhost:3000/decrementProductQuantity/${pid}`
          ).then(document.location.reload())
      );
    },
    remove(element) {
      var ind = this.result.indexOf(element);
      this.result.splice(ind, 1);
      // console.log(element);
      const info = {
        uid: localStorage.getItem("user-id"),
        pid: element,
      };
      axios
        .delete(`http://localhost:3000/deleteProductCart`, { params: info })
        .then((response) => {
          this.message = response.data;
          alert(response.data);
        });
    },
    checkout() {},
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/cartPage/${localStorage.getItem("user-id")}`)
      .then((response) => {
        this.result = [...response.data];
        let total = 0;
        for (let i = 0; i < this.result.length; i++) {
          for (let j = 0; j < this.result[i].cquantity; j++) {
            total += this.result[i].price;
          }
        }
        this.TotalPrice = total;
      });
    let user = localStorage.getItem("user-id");
    if (!user) {
      this.$router.push({ name: "logIn" });
    }
  },
};
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
.icon {
  height: 10px;
  width: 10px;
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