<template>
    <div id="upload" class="container">
        <div class="row" id="upload_form">
            <div class="col-12">
                <h1 class="center-text">Upload new photos</h1>
                <div class="form-group">
                    <label for="photo_files">Select Photos</label>
                    <input type="file" class="form-control-file" id="photo_file" 
                        accept=".jpg, .jpeg, .png" @change="processPhotos($event)" multiple>
                    <small class="form-text text-muted">Select one to many photos.</small>
                </div>
                <div class="form-group">
                    <label>Date (YYYY / MM / DD): </label>
                    <br/>
                    <input type="number" min="1826" max="3000" max-length="4" v-model="year" id="year">
                    /
                    <input type="number" min="01" max="12" max-length="2" v-model="month" id="month">
                    /
                    <input type="number" min="01" max="31" max-length="2" v-model="day" id="day">
                    <small class="form-text text-muted">Leave any unsure value blank</small>
                </div>
                <div class="form-group">
                    <label for="tags">Tags</label>
                    <br>
                    <span class="tag" v-for="tag in tags" v-bind:key="tag.name">
                        {{tag}}
                        <button v-on:click="removeTag(tag)">X</button>
                    </span>
                    <input type="text" v-model="new_tag" placeholder="Add tag"  @keyup.enter="addTag()">
                </div>
                <button type="submit" class="btn btn-primary"  v-on:click="submit()">Submit</button>
            </div>
            <div class="col-12">
                <h2 class="center-text">Uploads ({{uploaded.length}}/{{photos.length}})</h2>
                <span v-cloak v-for="upload in uploaded" v-bind:key="upload.uuid">
                    <img class="uploaded_photo" :src="upload.thumbnail" alt="Photo">
                </span>
                <h3 v-cloak v-if="errors.length > 0" class="error">{{errors.length}} failures</h3>
                <p v-cloak class="error" v-for="error in errors" v-bind:key="error">{{error}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import {Photo} from '../models';

export default {
    data () {
        return {
            photos: [],
            uploaded: [],
            year: '',
            month: '',
            day: '',
            tags: [],
            new_tag: '',
            errors: [],
            upload_index: 0
        }
    },
    methods: {
        reset: function(){
            this.uploaded = [];
            this.errors = [];
            this.upload_index = 0;
        },
        removeTag: function(tag){
            this.tags = this.tags.filter(el => el !== tag);
        },
        addTag: function(){
            this.tags.push(this.new_tag)
            this.new_tag = '';
        },
        processPhotos: function(event){
            this.photos = event.target.files
        },
        submit: function(){
            this.reset()
            if(this.tags.length > 0){
                let promises = Tag.create_tags(this.tags);
                axios.all(promises)
                .then( response => {
                    this.uploadPhoto();
                })
                .catch( error => {
                    this.uploadPhoto();
                })
            }else{
                this.uploadPhoto();
            }
        },
        tagError: function(error){
            console.log(error)
        },
        uploadPhoto: function(){
            Photo.create(
                this.photos[this.upload_index],
                this.year,
                this.month,
                this.day,
                this.tags
            )
            .then( response => {
                let photo = new Photo(response.data);
                this.uploaded.push(photo);
                this.upload_index += 1
                if(this.upload_index < this.photos.length){
                    this.uploadPhoto()
                }
            })
            .catch( error => {
                let msg = error.response.data[0]
                this.errors.push(msg)
                this.upload_index += 1
                if(this.upload_index < this.photos.length){
                    this.uploadPhoto()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#upload_form {
    #year, #month, #day{
        width: 5em;
    }

    .uploaded_photo{
        max-height: 200px;
        max-width: 200px;
        margin: 5px;
    }

    .tag{
        margin: 5px;
        background-color: #555;
        padding: 5px;
        border-radius: 5px;
    }

    .tag button{
        background-color: #555;
        border: 0;
        color: #fff;
    }

    .error{
        color: red;
    }
}
</style>
