let PHOTOS_API_PATH = '/api/v1/photos/';
let TAG_API_PATH = '/api/v1/tags/';

import CustomAPI from './api';
import { store } from './store/store';
import axios from 'axios';

export class Photo{

    constructor(photo) {
        this.id = photo.id;
        this.tags = photo.tags;
        this.year = photo.year;
        this.month = photo.month;
        this.day = photo.day;
        this.image = photo.image;
        this.medium = photo.medium;
        this.thumbnail = photo.thumbnail;
    }

    get data() {
        let data = {
            'tags': this.tags,
            'year': this.year,
            'month': this.month,
            'day': this.day
        }
        return data;
    }

    static search(query){
        CustomAPI.get(PHOTOS_API_PATH + '?q=' + query).then( data => {
            let photo_list = data.data.results.map( photo => new Photo(photo));
            store.commit('setPhotoList', photo_list);
            store.commit('setNextURL', data.data.next);
        })
    }

    static continueSearch(){
        if(store.state.next_url){
            // Force HTTPS when page is served over HTTPS
            if(location.protocol == 'https:' && this.next_url.slice(0, 5) != 'https'){
                url_start = this.next_url.indexOf('://') + 3
                this.next_url = 'https://' + this.next_url.slice(url_start)
            }
            CustomAPI.get(store.state.next_url).then( data => {
                let photos = data.data.results.map( photo => new Photo(photo));
                store.commit('addPhotos', photos);
                store.commit('setNextURL', data.data.next);
            })
        }
    }

    static create(image, year, month, day, tags){
        let data = new FormData()
        data.append('image', image);
        data.append('year', year);
        data.append('month', month);
        data.append('day', day);
        tags.map(tag => data.append('tags', tag))

        return CustomAPI({
            method: 'POST',
            url: PHOTOS_API_PATH,
            data: data,
            headers: {
                'X-CSRFToken': store.state.csrftoken,
            }
        })
    }

    update(){
        let promises = Tag.create_tags(this.tags)
        let promise = axios.all(promises)
        .then(() => {})
        .catch( () => {})
        .then(() => {
            CustomAPI({
                method: 'PATCH',
                url: PHOTOS_API_PATH + this.id + '/',
                data: this.data,
                headers: {
                    'X-CSRFToken': store.state.csrftoken,
                },
            })
        })
        return promise
    }

    delete(){
        return CustomAPI({
            method: 'DELETE',
            url: PHOTOS_API_PATH + this.id + '/',
            headers: {
                'X-CSRFToken': store.state.csrftoken,
            },
        })
    }

    static getPhoto(uuid){
        return CustomAPI({
            method: 'GET',
            url: PHOTOS_API_PATH + uuid + '/',
            headers: {
                'X-CSRFToken': store.state.csrftoken,
            }
        })
    }

    // static update_photos(photos) {
    //     return photos.map( photo => this.update_photo(photo))
    // }

    // static delete_photos(photos) {
    //     return photos.map( photo => this.delete_photo(photo))
    // }
}


export class Tag{
    static create_tag(name) {
        return CustomAPI({
            method: 'POST',
            url: TAG_API_PATH,
            data: {'name': name},
            headers: {
                'X-CSRFToken': store.state.csrftoken,
            },
        })
    }
    static create_tags(names) {
        return names.map( name => this.create_tag(name) )
    }
}