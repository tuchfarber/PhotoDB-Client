<template>
    <div id="homepage" class="container">
        <div class="row">
            <div id="welcome" class="col-12">
                <h1 class="heading">Welcome</h1>
                <div class="heading">Welcome to PhotoDB! Please use the box below to search for photos.</div>
                <div class="search-box input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Filter</span>
                    </div>
                    <input type="text" id="filter" placeholder="" v-model="filter_text" class="form-control">
                    <div class="input-group-prepend">
                        <button v-if="filter_text.length == 0" class="btn btn-secondary" @click="searchUntagged()">
                            Show untagged
                        </button>
                        <button v-if="filter_text.length > 0" class="btn btn-secondary" @click="clearFilter()">
                            Clear
                        </button>
                    </div>
                </div>
                <div id="controls">
                    <div>
                        <button class="btn btn-secondary" @click="toggleMultiSelect">
                            <span v-if="!multiselect_enabled">Enable multi-select</span>
                            <span v-else>Disable multi-select</span>
                        </button>
                    </div>
                    <div>
                        <button v-if="multiselect_enabled" data-toggle="modal" data-target="#delete-multiple-confirmation" :disabled="noPhotosSelected" class="btn delete control">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button v-if="multiselect_enabled" data-toggle="modal" data-target="#tagadditon" :disabled="noPhotosSelected" class="btn tag control">
                            <i class="fa fa-tag" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>    
            </div>
        </div>
        <div id="photolist"  class="row">
            <div class="col-12 col-md-6 col-lg-3" v-cloak v-for="(photo, index) in $store.state.photo_list" :key="photo.id">
                <router-link v-if="!multiselect_enabled" :to="{path: '/detail/' + photo.id}">
                    <div class="thumbnail-container">
                        <img class="thumbnail" :src="photo.thumbnail" alt="">
                    </div>
                </router-link>
                <div v-else @click="togglePhotoSelection(index)" class="thumbnail-container">
                    <img class="thumbnail" v-bind:class="{ selected: isIndexSelected(index) }" :src="photo.thumbnail" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import {Photo} from '../models';

export default {
    components: {
    },
    data () {
        return {
            filter_text: '',
            multiselect_enabled: false,
        }
    },
    computed: {
        ...mapGetters([
            'noPhotosSelected',
        ]),
    },
    methods: {
        ...mapActions([
            'togglePhotoSelection',
        ]),
        clearFilter: function(){
            this.filter_text = '';
        },
        searchUntagged: function(){
            this.filter_text = 'untagged';
        },
        toggleMultiSelect: function(){
            this.multiselect_enabled = !this.multiselect_enabled;
        },
        getPhotos: function(query){
            Photo.search(query)
        },
        loadNextPage: function(){
            Photo.continueSearch()
        },
        isIndexSelected: function(index){
            return this.$store.state.selected_photo_indicies.includes(index);
        },
    },
    watch: {
        filter_text: function(query){
            this.getPhotos(query);
            this.multiselect_enabled = false;
        }
    },
    mounted: function(){
        this.getPhotos('');
        window.onscroll = (ev) => {
            if ((window.innerHeight + window.scrollY) == document.body.offsetHeight){
                this.loadNextPage()
            }
        };
    }
}
</script>

<style lang="scss" scoped>
    #welcome{
        h1{
            margin-top: 10px;
        }
        .heading{
            text-align: center;
            margin-bottom: 10px;
        }
        .search-box{
            max-width: 600px;
            margin: auto;

            #filter{
                margin: 0 
            }     
        }
        #controls{
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 600px;
            margin: 10px auto 0 auto;
            .delete, .tag{
                color: #fff;
                background-color: transparent;
            }
            .delete:hover:enabled{
                color: rgb(255, 125, 125);
            }
            .tag:hover:enabled{
                color: rgb(125, 125, 255)
            }
        }
    }
    #photolist{
        a:focus{
            .thumbnail{
                border: 5px solid #444;
            }
        }
        .thumbnail{
            max-width: 100%;
            max-height: 200px;
            border: 5px solid black;
            margin: 20px auto;
            display: block;
            &:hover{
                cursor: pointer;
                border: 5px solid #444;
            }
            &.selected{
                border-color: #ff0000;
            }
        }
    }
</style>
