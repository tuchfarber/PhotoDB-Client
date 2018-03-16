import HomePage from './components/HomePage.vue';
import Login from './components/Login.vue';
import Upload from './components/Upload.vue';
import Detail from './components/Detail.vue';

export default [
    { path: '/', component: HomePage},
    { path:'/login', component: Login},
    { path:'/upload', component: Upload},
    { path:'/detail/:uuid', component: Detail},
]