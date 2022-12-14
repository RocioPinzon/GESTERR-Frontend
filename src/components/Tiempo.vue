<template>
   
   <div class="tomorrow"
           data-location-id=""
           data-language="ES"
           data-unit-system="METRIC"
           data-skin="light"
           data-widget-type="aqiPollen"
           style="padding-bottom:22px;position:relative;">
        
           <a href="https://www.tomorrow.io/weather-api/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                style="position: absolute; bottom: 0; transform: translateX(-50%); left: 50%;">
            
            
          </a>
    </div>
            
        
</template>

<script>
        
export default {
    name:'Tiempo',  

    mounted() {

        (function(d, s, id) {
            if (d.getElementById(id)) {
                if (window.__TOMORROW__) {
                    window.__TOMORROW__.renderWidget();
                }
                return;
            }
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.id = id;
            js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'tomorrow-sdk');
      
    },
}
</script>