<template>
  <TopHeadder />
  <br />
  <h3>Adderss</h3>
  <div class="add">
    <h3>Products List</h3>
    <div id="sub">
      <input type="text" v-model="pin" placeholder="Enter Pin code" />
      <p>
        <textarea
          v-model="address"
          placeholder="Enter address"
          cols="30"
          rows="3"
        ></textarea>
        <br />
        <button class="b1" @click="update">Update Address</button>
      </p>
      <br />
    </div>
  </div>
</template>

<script>
import TopHeadder from "../components/TopHeadder.vue";
import axios from "axios";

export default {
  name: "userAddress",
  components: {
    TopHeadder,
  },
  data() {
    return {
      address: "",
      pin: "",
    };
  },
  methods: {
    update() {
      var uid = localStorage.getItem("user-id");
      if (this.address && this.pin) {
        const data = {
          address: this.address,
          pin: this.pin,
        };
        console.log();
        axios
          .put(`http://localhost:3000/updateAddress/${uid}`, data)
          .then((response) => {
            alert(response.data);
          });
      }
    },
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
  height: 30px;
  margin-bottom: 5px;
}
.b1:hover {
  color: rgb(2, 83, 2);
  background: rgb(137, 246, 134);
  margin-bottom: 5px;
}
</style>