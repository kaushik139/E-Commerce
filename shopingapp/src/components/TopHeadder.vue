<template>
  <div class="nav">
     <ul type='none' id="top">
        <li v-if="role === 'user'">
 <router-link to="productsPage">Home</router-link>  
        </li>
        <li v-if="role === 'admin'">
 <router-link to="adminPage">Home</router-link>  
        </li>
        <li id="q">
            {{name}}
        </li>
        <li v-if="role === 'user'">
  <router-link to="cartPage" id="C">Cart</router-link>  
        </li>
        <li v-if="role === 'admin'">
             <router-link to="adminSales" id="C">Sales</router-link> 
        </li>
        <li id="qw">
            <input type="search" v_model="search">
        </li>
        <li>
<router-link to="logOut" @click="logout" id="LO">LogOut</router-link>
        </li>
       </ul> 
  </div>
</template>


<script>
export default {
    data(){
        return{
            name:'',
            search:'',
        }
    },
    methods:{
logout(){
     localStorage.clear();
      this.$router.push({name:'logIn'})
},
    },
    mounted(){
        this.name=localStorage.getItem('user-name')
        this.role = localStorage.getItem('user-role');
    },
    computed:{
        filter(){
            return this.posts.filter(post => post.body.includes(this.search))
        }
    }
};
</script>


<style scoped>
.nav{
        background-color: rgb(61, 206, 17);
    height: 2px;
    width: 100%;
    margin: -18px;
    padding: 20px;
    overflow: hidden;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0 20px;
  /* overflow: hidden; */
  
}

li {
  float: left;
}

li a {
      /* display: flex; */
    color: white;
    text-align: center;
    padding: 0px 30px 0px 30px;
    text-decoration: none;
    margin: 0px;
    /* border: solid black 1px; */
    height: 100%;
}
li a:hover{
    color:green;
    background-color: rgb(174, 245, 144) ;
    margin: -10px 0px 0px 0px;
    overflow: hidden;
}
li a.router-link-exact-active{
    color:green;
    background-color: rgb(174, 245, 144) ;
    margin: -10px 15px 0px 0px;
    overflow: hidden;
}
#q{
    margin: 0px 0px 0px 0px;
    color: rgb(255, 247, 0);

}
#qw{
    margin: 0px 0px 0px 0px;
}
</style>