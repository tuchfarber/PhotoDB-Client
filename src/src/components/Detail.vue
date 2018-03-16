<template>
    <div class="container">
        <div class="row">
            <div class="col-12 controls">
                <router-link to="/" tag="button" class="btn btn-secondary back">
                    <i class="fa fa-arrow-left"></i>
                </router-link>
                <div class="btn-group actions" role="group">
                    <button type="button" class="btn btn-secondary" @click="savePhoto()">
                        <i class="fa fa-save"></i>
                    </button>
                    <button type="button" class="btn btn-secondary" @click="deletePhoto()">
                        <i class="fa fa-trash"></i>
                    </button>
                    <a download='x.jpg' :href="photo.image" >
                        <button type="button" class="btn btn-secondary">
                            <i class="fa fa-download"></i>
                        </button>
                    </a>
                </div>
            </div>
            <div class="col-12 photo">
                <img :src="photo.medium">
            </div>
            <div class="col-12 tags">
                <span class="tag" v-for="tag in photo.tags" :key="tag">
                    {{tag}}
                    <button @click="removeTag(tag)">X</button>
                </span>
            </div>
            <div class="col-12 tag-input">             
                <span>Tags: </span>
                <input type="text" v-model="new_tag" placeholder="Enter to add tag" @keyup.enter="addTag()">
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import CustomAPI from '../api'
import {Photo} from '../models';

export default {
    data () {
        return {
            photo: {medium: ''},
            new_tag: '',
        }
    },
    computed: {
        // ...mapGetters([
        // ])
    },
    methods: {
        addTag: function(){
            if(!this.photo.tags.includes(this.new_tag)){
                this.photo.tags.push(this.new_tag);
            };
            this.new_tag = '';
        },
        removeTag: function(tag){
            this.photo.tags.splice(this.photo.tags.indexOf(tag), 1);
        },
        savePhoto: function(){
            this.photo.update()
            .then(results => {
                alert("Saved!")
            })
            .catch(error => {
                console.log(error)
            })

        },
        deletePhoto: function(){
            let confirmed = confirm("Really delete photo?")
            if(!confirmed){return}
            this.photo.delete()
            .then(results => {
                this.removePhotoByID(this.photo.id)
                this.$router.push('/')
            })
            .catch(error => {
                console.log(error)
            })
        },
        ...mapActions([
            'removePhotoByID'
        ])
    },
    mounted: function(){
        Photo.getPhoto(this.$route.params.uuid)
        .then(results => {
            this.photo = new Photo(results.data);
        })
        .catch(error => {
            console.log(error)
        })

    }
}
</script>

<style lang="scss" scoped>
.controls{
    margin: 0 0 20px 0;
    .back{
        margin-right: 20px;
    }
    a button{
        border-radius: 0 5px 5px 0;
    }
}
.tag-input{
    margin-bottom: 10px;
}
.tags{
    margin-bottom: 10px;
    .tag{
        display:inline-block;
        margin: 5px;
        background-color: #555;
        padding: 5px;
        border-radius: 5px;
        white-space: nowrap;
        button{
            background-color: #555;
            border: 0;
            color: #fff;
        }
    }
}

.photo{
    max-height: 60vh;
    max-width: 100%;
    img{
        margin: 0 auto;
        display: block;
        max-height: 100%;
        max-width: 100%;
        box-shadow: 0 0 5px 5px black;
    }
    margin-bottom: 20px;
}
</style>
