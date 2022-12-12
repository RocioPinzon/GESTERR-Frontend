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
       //CONSULTAR CAMPOS USER
       
       axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                          .then((response) =>{
                            if(response.statusText=="OK"){
                              console.log("Exito consultar camposW ");
                              console.log(response.data);

                              this.chartData.labels=response.data.name;
                              //this.chartData.datasets= response.data.length;
                              var arrayLength = response.data.length;
                              var contCultivos=0;
                              var contSinCultivos=0;
                              var contBarbecho=0;
                              console.log("this");
                              console.log(this);
                              console.log("-----------------------s");

                              //this.chartData.datasets[0].data[0]=25;
                              //this.chartData.datasets[0].data[1]=10; //Guuardar los datos dinamicos
                              //this.chartData.datasets[0].data[2]=30;

                              //var charD = this.chartData.datasets[0].data[3] = 60;
                              console.log("this.chartData.labels");

                              console.log(this.chartData.labels);
                              //this.chartData.labels[3];
                              //this.chartData.labels.push("Newly Added");

                              for (var i=0; i<arrayLength; i++) {
                      
                                  console.log("NAME");
                                  console.log(response.data[i].name);
                                  console.log("CANTIDAD");
                                  console.log(response.data[i].hectareas);
                                  console.log("ESTADO");
                                  console.log(response.data[i].estado);
                                  //this.chartData.labels=response.data[i].name;
                                  //chartData.datasets.data=response.data[i].estado;
                                    
                                    if(response.data[i].estado==="CONCULTIVOS"){
                                      contCultivos++;
                                      console.log("contCultivos --> " + contCultivos);
                                      /*this.numEstadosChar=contCultivos;
                                      console.log("this.numEstadosChar -->" + this.numEstadosChar);
                                      this.numEstadosChar =this.numEstadosChar.contCultivos;*/

                                    }

                                    if(response.data[i].estado==="SINCULTIVAR"){
                                      contSinCultivos++;
                                      console.log("contSinCultivos --> " + contSinCultivos);
                                      /*this.numEstadosChar=contSinCultivos;
                                      console.log("this.numEstadosChar -->" + this.numEstadosChar);
                                      this.numEstadosChar =this.numEstadosChar.contSinCultivos;*/
                                    }
                                    if(response.data[i].estado==="BARBECHO"){
                                      contBarbecho++;
                                      console.log("contBarbecho -->" + contBarbecho);
                                    }

                                    this.chartData.datasets[0].data[0]=contCultivos;
                                    this.chartData.datasets[0].data[1]=contSinCultivos;
                                    this.chartData.datasets[0].data[2]=contBarbecho;

                                    
                                  //console.log(this.numEstadosChar = [contCultivos,contSinCultivos,contBarbecho]);
                                  //this.chartData.datasets[0].data[i]=this.numEstadosChar;
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