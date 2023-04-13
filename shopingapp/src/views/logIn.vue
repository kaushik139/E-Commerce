<template>
  <div id="one">
    <h1>Log In</h1>
    <input type="text" v-model="mail" class="two" placeholder="Enter E-mail" />
    <input
      type="password"
      v-model="pass"
      class="two"
      placeholder="Enter Password"
    />
    <button id="b1" @click="logIn" type="submit">Log In</button>
    <br />
    Not A user ?
    <a href="#" @click="SignUp">SignUp</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "logIn",
  data() {
    return {
      mail: "",
      pass: "",
      role: "",
    };
  },
  methods: {
    logIn() {
      if ((this.mail === "") | (this.pass === "")) {
        alert(`Please fill in all the fields!`);
      } else {
        axios
          .post("http://localhost:3000/verification", {
            email: this.mail,
            password: this.pass,
          })
          .then((response) => {
            if (response.data === "valid user") {
              alert(`Login Successful`);
              var rslt = "";
              axios
                .get(`http://localhost:3000/info/${this.mail}`)
                .then((response) => {
                  rslt = response.data;
                  localStorage.setItem("user-id", rslt.id);
                  localStorage.setItem("user-name", rslt.name);
                  localStorage.setItem("user-role", rslt.role);
                  this.role = localStorage.getItem("user-role");
              if (this.role === "user") {
                this.$router.push({ name: "productsPage" });
              }
              if (this.role === "admin") {
                console.log("HELLO");
                this.$router.push({ name: "adminPage" });
              }
                });
            } else {
              alert(`Invalid Credentials!`);
            }
          });
      }
    },
    SignUp() {
      this.$router.push({ name: "signUp" });
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
  background: rgb(246, 116, 107);
  color: rgb(255, 0, 0);
  /* min-width: 240px; */
  height: 40px;
  align-items: center;
  border: none;
}
</style>
