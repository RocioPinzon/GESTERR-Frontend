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
        default: 500
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
          datasets: [ 
                      { label:"Cantidad (nº aprox)",
                        data: [],
                        backgroundColor: '#52aa5e'},
                        
                        { label:"Hectáreas",
                        data: [],
                        backgroundColor: '#f1db4b'}  
                    ]
          
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
        this.cultivoId = this.$route.params.cultivoId;

         //CONSULTAR CAMPOS USER
         
         axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`)
              .then((response) =>{
                if(response.statusText=="OK"){
                  console.log("Exito consultar cultivos");
                  console.log(response.data);
                  console.log("-----------------");

                  console.log("this");
                  console.log(this);

                   
                  var arrayLength = response.data.length;
                  this.chartData.labels=[];

                  for (var i=0; i<arrayLength; i++) {

                    // Para que aparezcan todos los cultivos
                    this.chartData.labels[i]=response.data[i].nombre;

                    // Para que aparezcan las cantidades de cada cultivo en una columna
                    this.chartData.datasets[0].data[i]=response.data[i].cantidad;
                    console.log("this.chartData.datasets[0].data[i]");

                    console.log(this.chartData.datasets[0].data[i]);
                    // Para que aparezcan las hectareas de cada cultivo en una columna
                    this.chartData.datasets[1].data[i]=response.data[i].hectareas;
                    console.log("DESPUES HECTAREAS -- this.chartData.datasets[0].data[i]");
                    console.log(this.chartData.datasets[i].data[i]);


                    // --------------- //
                    console.log(this.chartData.labels);
                    console.log(i);
                    console.log(response.data[i].nombre);
                    console.log("response.data[i].hectareas");
                    console.log(response.data[i].hectareas);

                    console.log(this.chartData.labels);
                    console.log("this.chartData");
                    console.log(this.chartData);

                  }        
                }else{
                  console.log("Error");
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