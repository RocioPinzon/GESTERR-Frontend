<template>
    <div>
        <div
            class="d-flex justify-center mb-6 bg-surface-variant"
            >
                <v-sheet
                v-for="n in 3"
                :key="n"
                class="ma-2 pa-2"
                >
                justify-center
                </v-sheet>
        </div>  
        
        <div id="users">
            <v-card
                class="mx-auto"
                max-width="300">
                <v-list :items="items"></v-list>
            </v-card>

            <v-btn
                color="success"
                class="mr-4"
                @click="getUsuarios"
                >
                Click on me
                </v-btn>
                
        </div>
    </div>
  </template>
  
<script>

import axios from 'axios';
const SERVER_URL = "https://gesterr-back.herokuapp.com/user";


export default {
  //name: 'Users',

  data: () => ({
    items: [
        {
          title: 'Usuarios',
          value: 0,
        }
      ],
  }),

  methods:{

    getUsuarios(){

        console.log(SERVER_URL);

        fetch(SERVER_URL)
                .then(response => response.json())
                .then(data=>{
                    //this.name = data;
                    console.log(data);
                    console.log("-------------------");
                    console.log(data[0]);
                    console.log("-------------------");
                    console.log(data[0].name);

                    //console.log(this.name);

                    for (const element of data) {

                        console.log("-------------------");
                        console.log(element);
                        console.log("-------------------");
                        console.log(element.name);
                        let contador  = 1;
                        this.items.push({title:element.name, value:contador});
                        contador++;
                        
                    }
                });

        console.log(this);
        console.log("-------------------");

        console.log(this.items);
        //console.log(this.items.push({title:"ejemplo", value:"4"}));


    }
  }

}
</script>
  