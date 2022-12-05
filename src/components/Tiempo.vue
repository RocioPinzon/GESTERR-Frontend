<template>
   
            <v-col
                xs="12"
                sm="12"
                md="5"
                lg="5"
                xl="3">
                
                <v-sheet class="pa-2 ma-2">
                    <div id="ww_981182e2b03b4" v='1.3' loc='auto' a='{"t":"horizontal","lang":"es","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"#689F38","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#FFFFFF","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>Umieść <a href="https://weatherwidget.org/pl/" id="ww_981182e2b03b4_u" target="_blank">Widżet Pogodowy HTML</a> w Witrynie</div>
                </v-sheet>
            </v-col>
        
</template>

<script>
export default {
    name:'Tiempo',

    setup() {
        

    },

    mounted() {
      let tiempo = document.createElement('script');
      tiempo.setAttribute('src', 'https://app1.weatherwidget.org/js/?id=ww_981182e2b03b4');
      document.head.appendChild(tiempo);
      //async src="https://app1.weatherwidget.org/js/?id=ww_253cddb360a61"
    },

}
</script>
