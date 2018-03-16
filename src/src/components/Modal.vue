<template>
    <div class="_modal container">
        <div class="modal fade" id="lightbox" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="modal-header">Modal Header</slot>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body">Modal Body</slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="modal-footer">Modal Footer</slot>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
    data () {
        return {
        }
    },
    props: [
        'title',
    ],
    computed: {
        // ...mapGetters([
        // ])
    },
    methods: {
        // ...mapActions([
        //     'login'
        // ])
    }
}
</script>

<style lang="scss" scoped>

</style>
