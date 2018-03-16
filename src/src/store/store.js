import Vue from 'vue';
import Vuex from 'vuex';
import { getCookie } from '../utils/utils.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    strict: true, 
    state: {
        logged_in: false,
        username: '',
        csrftoken: '',
        photo_list: [],
        selected_photo_indicies: [],
        next_url: '',
    },
    getters: {
        noPhotosSelected: (state) => {
            return (state.selected_photo_indicies.length > 0 ? false : true)
        },
    },
    mutations: {
        setUsername: (state, username) => {
            state.username = username;
        },
        setLoggedIn: (state, logged_in) => {
            state.logged_in = logged_in;
        },
        setCSRFToken: (state, csrftoken) => {
            state.csrftoken = csrftoken;
        },
        addSelectedPhotoIndex: (state, index) => {
            state.selected_photo_indicies.push(index);
        },
        removeSelectedPhotoIndex: (state, index) => {
            state.selected_photo_indicies.splice(
                state.selected_photo_indicies.indexOf(index),
                1
            )
        },
        setPhotoList: (state, photo_list) => {
            state.photo_list = photo_list;
        },
        addPhotos: (state, photo_list) => {
            state.photo_list = state.photo_list.concat(photo_list);
        },
        setNextURL: (state, next_url) => {
            state.next_url = next_url;
        },
        removePhotoByID: (state, id) => {
            let photo_uuids = state.photo_list.map(photo => photo.uuid);
            let photo_index = photo_uuids.indexOf(id);
            // Fix the index values of selected items
            state.selected_photo_indicies.forEach((item, index) => {
                if(item == photo_index){
                    state.selected_photo_indicies.splice(index, 1);
                }
                else if(item > photo_index){
                    state.selected_photo_indicies[index] -= 1;
                }
            })
            // Remove the photo from the list of photos
            state.photo_list.splice(photo_index, 1);
        }
    },
    actions: {
        login: (context, username) => {
            context.commit('setUsername', username);
            context.commit('setLoggedIn', true);
        },
        logout: (context) => {
            context.commit('setUsername', '');
            context.commit('setLoggedIn', false);
        },
        setUsername: (context, username) => {
            context.commit('setUsername', username);
        },
        updateCSRFToken: (context) => {
            let csrftoken = getCookie('csrftoken');
            context.commit('setCSRFToken', csrftoken);
        },
        addSelectedPhotoIndex: (context, index) => {
            context.commit('addSelectedPhotoIndex', index);
        },
        removeSelectedPhotoIndex: (context, index) => {
            context.commit('removeSelectedPhotoIndex', index);
        },
        togglePhotoSelection: (context, index) => {
            if(context.state.selected_photo_indicies.includes(index)){
                context.commit('removeSelectedPhotoIndex', index);
            }else{
                context.commit('addSelectedPhotoIndex', index);
            }
        },
        setPhotoList: (context, photo_list) => {
            context.commit('setPhotoList', photo_list);
        },
        addPhotos: (context, photo_list) => {
            context.commit('addPhotos', photo_list)
        },
        setNextURL: (context, next_url) => {
            context.commit('setNextURL', next_url);
        },
        removePhotoByID: (context, id) => {
            context.commit('removePhotoByID', id)
        }
    }
})