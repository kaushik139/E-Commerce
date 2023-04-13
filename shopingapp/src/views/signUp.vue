<template>
  <div id="one">
    <h1>Sign Up</h1>
    <input type="text" v-model="name" class="two" placeholder="Enter Name" />
    <input type="text" v-model="mail" class="two" placeholder="Enter E-mail" />
    <input
      type="password"
      v-model="pass"
      class="two"
      placeholder="Enter Password"
    />
    <button id="b1" @click="signUp" type="submit">Sign Up</button>
    <br />
    Already A user ?
    <a href="#" @click="login">LogIn</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signUp",
  data() {
    return {
      name: "",
      mail: "",
      pass: "",
      userType: "user",
    };
  },
  methods: {
    signUp() {
      if (this.name && this.mail && this.pass && this.userType) {
        const userData = {
          email: this.mail,
          name: this.name,
          password: this.pass,
          userType: this.userType,
        };
        console.log(userData);
        axios.post("http://localhost:3000/users", userData).then((response) => {
          this.message = response.data;
          alert(this.message);
          if (this.message != "E-mail already Exists.")
            this.$router.push({ name: "logIn" });
        });
      } else {
        alert("Please fill the required details");
      }

      // console.warn(result);
      // if (result.status == 201) {
      //   alert("task completed");
      // }
    },
    login() {
      this.$router.push({ name: "logIn" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#one {
  margin: auto;
  padding: 0px;
  max-width: 300px;
  text-align: center;
}
h1 {
  color: #cc2020;
  display: block;
  margin: auto;
  margin-bottom: 30px;
  /* margin-left: 70px; */
}
.two {
  display: flex;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
}
#b1 {
  display: flex;
  margin: auto;
  background: rgb(244, 110, 110);
  color: rgb(255, 0, 0);
  /* min-width: 240px; */
  height: 40px;
  align-items: center;
  border: none;
}
</style>
