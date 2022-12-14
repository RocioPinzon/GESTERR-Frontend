<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
  import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar},
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: [ "CON CULTIVOS", "SIN CULTIVOS", "BARBECHO" ], //esto tiene que ser mis campos
        datasets: [ { label:"Gráfica de estados campos",
                      data: [],
                      backgroundColor: '#52aa5e'} ] // y esto mis nCampos con un estado
        
      },
      chartOptions: {
        responsive: true
      },
      campos:[],
      numEstadosChar:[]
    }
  },
  mounted(){
      this.comprobarUsuario(); 
      this.campoId = this.$route.params.campoId; 
      this.cargarCampos();
       
  },

  methods:{
      //CONSULTAR CAMPOS USER
      cargarCampos(){
        axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                          .then((response) =>{
                            if(response.statusText=="OK"){
                              console.log("Exito campos barchar");

                              this.chartData.labels=response.data.name;
                              var arrayLength = response.data.length;
                              var contCultivos=0;
                              var contSinCultivos=0;
                              var contBarbecho=0;

                              for (var i=0; i<arrayLength; i++) {
                      
                                  console.log("NAME");
                                  console.log(response.data[i].name);
                                  console.log("CANTIDAD");
                                  console.log(response.data[i].hectareas);
                                  console.log("ESTADO");
                                  console.log(response.data[i].estado);
                                    
                                    if(response.data[i].estado==="CONCULTIVOS"){
                                      contCultivos++;
                                    }

                                    if(response.data[i].estado==="SINCULTIVAR"){
                                      contSinCultivos++;
                                    }

                                    if(response.data[i].estado==="BARBECHO"){
                                      contBarbecho++;
                                    }

                                    this.chartData.datasets[0].data[0]=contCultivos;
                                    this.chartData.datasets[0].data[1]=contSinCultivos;
                                    this.chartData.datasets[0].data[2]=contBarbecho;                                    
                              }                              
                            }else{
                              console.log("Error ");
                            }
                        });
      },
      comprobarUsuario(){
          this.userId=localStorage.getItem('userId'); 
            if(!this.userId){
              this.$router.push(`/signin`);
            } 
          }
  }
}
</script>
