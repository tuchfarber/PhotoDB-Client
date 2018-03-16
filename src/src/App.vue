<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Login from './components/Login.vue';
import Modal from './components/Modal.vue';

export default {
  components: {
    'nav-bar': Navbar,
    'login': Login,
    'modal': Modal,
  },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
    html, body{
        background-color: #222;
        color: #eee;
    }
    a{
        outline: none;
    }
    .logo{
        height: 25px;
    }
    a{
        text-decoration: none;
    }
    .container{
        margin-top: 20px;
    }
    .welcome_name{
        margin-right: 5px;
    }
    .btn:hover{
        cursor: pointer;
    }
    .btn:disabled{
        cursor: default;
    }
    .modal-content{
        background-color: #222;
    }
    .modal-header{
        border-bottom-color: #777;
    }
    .modal-footer{
        border-top-color: #777;
    }
    [v-cloak] {
        display: none;
    }
</style>
