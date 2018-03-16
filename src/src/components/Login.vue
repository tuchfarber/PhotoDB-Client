<template>
    <div id="login" class="container">
        <div class="row">
            <div class="col-12">
                <div id="login-form">
                    <h2>Login</h2>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Username</span>
                        </div>
                        <input type="text" v-model="username" class="form-control">
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Password</span>
                        </div>
                        <input type="password" v-model="password" class="form-control" @keyup.enter="login()">
                    </div>
                    <button class="btn btn-primary" @click="login()">Submit</button>
                    <div class="error">{{error_text}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import CustomAPI from '../api'

export default {
    data () {
        return {
            'username': '',
            'password': '',
            'error_text': '',
        }
    },
    computed: {
        // ...mapGetters([
        // ])
    },
    methods: {
        login(){
            CustomAPI({
                method: 'POST',
                url: '/rest-auth/login/',
                headers: {
                    'X-CSRFToken': this.$store.state.csrftoken,
                },
                data: {
                    username: this.username,
                    password: this.password,
                },
            })
            .then(results => {
                this.$store.dispatch('login', this.username);
                this.$store.dispatch('updateCSRFToken');
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
                this.error_text = "Failed to log in. Please try again.";
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    #login-form{
        max-width: 400px;
        margin:auto;
    }
    .input-group{
        margin: 10px 0;
    }
    .error{
        color: #f00;
    }
</style>
