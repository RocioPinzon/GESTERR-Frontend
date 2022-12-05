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
        default: 400
      },
      height: {
        type: Number,
        default: 400
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
          labels: [], //esto tiene que ser mis campos
          datasets: [ { data: [] } ] // y esto mis hectareas
        },
        chartOptions: {
          responsive: true
        },
        campos:[]
      }
    },
    mounted(){
        this.comprobarUsuario(); 

        this.campoId = this.$route.params.campoId;
         //CONSULTAR CAMPOS USER
         axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar campos ");
                                
                                var arrayLength = response.data.length;
                                for (var i=0; i<arrayLength; i++) {
                                    
                                    console.log("NAME");
                                    console.log(response.data[i].name);
                                    console.log("CANTIDAD");
                                    console.log(response.data[i].hectareas);
                                    this.chartData.labels=response.data[i].name;
                                    this.chartData.datasets.data=response.data[i].hectareas;
                                    console.log("this.chartData.datasets");

                                    console.log(this.chartData.datasets);

                                }
                                
                              }else{
                                console.log("Error ");
                              }
                          });
    },

    methods:{
        
            comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
            }
    }

  }
  </script>