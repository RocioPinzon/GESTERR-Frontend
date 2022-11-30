<template>
    <div>
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Aviso nuevos usuarios"
        color="green"
        title="Aviso para nuevos usuarios">
            GesTerr, es un aplicación beta para gestionar campos, cultivos y productos. Por lo que seguiremos mejorando y ampliando los servicios.
        </v-alert>
      <div
        v-if="!alert"
        class="text-center">
        
      </div>
    </div>
  </template>
<script>
export default {
  data: () => ({
    items: [{
            alert: true,
        }
    
    ],
    
  }),
}
</script>