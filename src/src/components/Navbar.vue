<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark">
        <router-link class="navbar-brand" to="/">
            <img class="logo" src="../assets/logo.png" alt="PhotoDB logo">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#/upload">Upload</a>
                </li>
            </ul>
            <span class="navbar-text">
                <template v-if="$store.state.logged_in">
                    <span class='welcome_name'>Welcome, {{$store.state.username}}. </span>
                    <router-link to="/" @click.native="logout()">Logout</router-link>
                </template>
                <template v-else>
                    <router-link to="/login">Login</router-link>
                </template>
            </span>
        </div>
    </nav>
  </div> 
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import CustomAPI from '../api'

export default {
    data () {
        return {
        }
    },
    computed: {
        // ...mapGetters([
        // ])
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        logout: function(){
            CustomAPI({
                method: 'POST',
                url: '/rest-auth/logout/',
                headers: {
                    'X-CSRFToken': this.$store.state.csrftoken,
                },
            })
            .then(results => {
                this.$store.dispatch('logout');
            })
            .catch(error => {
                console.log("Unable to log out")
            })
        }
    },
    mounted: function(){
        CustomAPI({
            method: 'GET',
            url: '/rest-auth/user/',
        })
        .then(results => {
            this.$store.dispatch('login', results.data.username);
            this.$store.dispatch('updateCSRFToken');
        })
        .catch(error => {
            console.log("Unable to log in")
        })
    }
}
</script>

<style lang="scss" scoped>
    #navbar{
        background-color: #111;
    }
</style>
