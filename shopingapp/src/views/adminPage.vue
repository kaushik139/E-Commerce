<template>
  <TopHeadder />
  <br />
  <h1>Admin Page</h1>
  <div class="add">
    <!-- adding products  -->
    <h3>Add Product</h3>
    <input
      type="text"
      class="inp"
      v-model="Pname"
      placeholder="Enter Product Name"
    /><br />
    <input
      type="text"
      class="inp"
      v-model="Pquantity"
      placeholder="Enter Product Quantity"
    /><br />
    <input
      type="text"
      class="inp"
      v-model="Pprice"
      placeholder="Enter Product Price"
    /><br />
    <!-- <input type="text" class="inp" v-model="Pimg" placeholder="Image" /> -->
    <div>
      <input type="file" @change="handleFileChange" />
      <img style="height:100px;width:100px" :src="Pimg" v-if="Pimg" />
    </div>
    <!-- Image: <input type="file" class="inp"><br> -->
    <br />
    <label for="category">Choose a category:</label>

    <select name="category" id="cars" v-model="Pcategory">
      <option value="phone">Phones</option>
      <option value="computer">Computer Peripherals</option>
      <option value="laptops">Laptops</option>
      <option value="headphones">Headphones</option>
      <option value="miscellaneous">Miscellaneous</option>
    </select>
    <br />
    <textarea
      class="inp"
      cols="30"
      rows="3"
      v-model="Pdescription"
      placeholder="Enter Product Description"
    ></textarea
    ><br />
    <button class="b1" @click="add">Add</button>
  </div>
  <br /><br />

  <!-- Products list  -->
  <div class="add">
    <h3>Products List</h3>
    <div id="sub" v-for="item in result" :key="item.product_id">
      <p>{{ item.image }}</p>
      <p>Product Id: {{ item.product_id }}</p>
      <p>Product Name: {{ item.pname }}</p>
      <p>Product Price: Rs.{{ item.price }}</p>
      <p>Product Quantity: {{ item.pquantity }}</p>
      <p>Product Description: {{ item.description }}</p>
      <br />
      <a href="#one"
        ><button class="b1" @click="update(item)">Update</button></a
      >
      <button class="b1" @click="deleteItem(item.product_id)">Delete</button>
    </div>
  </div>
  <br />

  <!-- Update Product  -->
  <div class="add">
    <h3 id="one">Update Products</h3>
    <label for="Pid" class="lab">{{ Pid }}</label>
    <br />
    <label for="Pname" class="lab">{{ Pname }}</label>
    <br />
    Enter Product Quantity:
    <input
      type="text"
      class="inp"
      v-model="Pquantity"
      placeholder="Enter Quantity"
    />
    <br />
    Enter Product Price:
    <input type="text" class="inp" v-model="Pprice" placeholder="Enter Price" />
    <br />
    <textarea
      cols="30"
      rows="3"
      class="inp"
      placeholder="Enter Description"
      v-model="Pdescription"
    ></textarea
    ><br />
    Upload Image: <div>
      <input type="file" @change="handleFileChange" />
      <img style="height:100px;width:100px" :src="Pimg" v-if="Pimg" />
    </div>
    <button class="b1" @click="update2()">Update</button>
  </div>
</template>

<script>
import TopHeadder from "../components/TopHeadder.vue";
import axios from "axios";
export default {
  name: "adminPage",
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
      result: [],
      Pcategory: "",
    };
  },
  methods: {
    update(item) {
      localStorage.setItem("Pid", item.product_id);
      localStorage.setItem("Pname", item.pname);
      localStorage.setItem("Pquantity", item.pquantity);
      localStorage.setItem("Pprice", item.price);
      localStorage.setItem("Pdescription", item.description);
      localStorage.setItem("Pimg", item.image);

      this.Pid = localStorage.getItem("Pid");
      this.Pname = localStorage.getItem("Pname");
      this.Pquantity = localStorage.getItem("Pquantity");
      this.Pprice = localStorage.getItem("Pprice");
      this.Pdescription = localStorage.getItem("Pdescription");
      this.Pimg = localStorage.getItem("Pimg");
      //   .catch((error) => console.log(error));
    },
    update2() {
      const info = {
        pid: this.Pid,
        name: this.Pname,
        quantity: this.Pquantity,
        price: this.Pprice,
        description: this.Pdescription,
        image: this.Pimg,
        message: "",
      };
      //   console.log(info);
      axios
        .put(
          `http://localhost:3000/updateProduct/${localStorage.getItem("Pid")}`,
          info
        )
        .then((response) => {
          //   console.log(response.data);
          this.message = response.data;
          alert("Updation Successful");
          location.reload();
        });
    },
    add() {
      // console.log(category.value);
      if (
        this.Pname &&
        this.Pquantity &&
        this.Pprice &&
        this.Pdescription &&
        this.Pimg &&
        this.Pcategory
      ) {
        const Productdata = {
          name: this.Pname,
          quantity: this.Pquantity,
          price: this.Pprice,
          description: this.Pdescription,
          image: this.Pimg,
          category: this.Pcategory,
        };
        console.log(Productdata);
        axios
          .post("http://localhost:3000/addProduct", Productdata)
          .then((response) => {
            this.message = response.data;
            this.result.push(Productdata);
            alert(this.message);
          });

        (this.Pname = ""),
          (this.Pquantity = ""),
          (this.Pprice = ""),
          (this.Pdescription = ""),
          (this.Pimg = "");
      } else {
        alert(`Failed to add product: Please fill all the fields `);
      }
      //   window.location.reload();
    },
    deleteItem(element) {
      //   var ind = this.result.indexOf(element)
      //   this.result.splice(ind,1)
      axios
        .delete(`http://localhost:3000/deleteProductAdmin/${element}`)
        .then((response) => {
          this.message = response.data;
        });
      window.location.reload();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.Pimg = reader.result;
      });
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    axios.get(`http://localhost:3000/allProducts`).then((response) => {
      this.result = [...response.data];
      //   console.log(response.data);
    });
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
.inp {
  margin: 2px;
  border: 1.5px solid green;
  border-radius: 5px;
  width: 150px;
}
.lab {
  margin: 2px;
  border: 1.5px solid green;
  border-radius: 5px;
  width: 150px;
  padding: 0px 65px 0px 65px;
}
#sub {
  background: white;
  border: 1px solid greenyellow;
  border-radius: 10px;
}
</style>