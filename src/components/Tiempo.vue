<template>
   
        <div class="tomorrow"
            data-location-id="036826"
            data-language="ES"
            data-unit-system="METRIC"
            data-skin="light"
            data-widget-type="aqiPollutant"
            style="padding-bottom:22px;position:relative;"
            >
            <a
                href="https://www.tomorrow.io/weather-api/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                style="position: absolute; bottom: 0; transform: translateX(-50%); left: 50%;"
            >
                <img
                alt="Powered by the Tomorrow.io Weather API"
                src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                width="250"
                height="18"
                />
            </a>
        </div>
            
        
</template>

<script>
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

        
export default {
    name:'Tiempo',

    setup() {
        

    },

    mounted() {
      /*let tiempo = document.createElement('script');
      tiempo.setAttribute('src', 'https://app1.weatherwidget.org/js/?id=ww_644aecd1fd899');
      document.head.appendChild(tiempo);*/
      //async src="https://app1.weatherwidget.org/js/?id=ww_253cddb360a61"
      
    },
}


</script>



        
