<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="event-title text-center">{{ event.name }}</h3>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <img :src="event.banner" class="h-50 w-100" :alt="event.name" />
          <p class="event-description mt-2">{{ event.description }}</p>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="card bg-dark">
            <div class="card-body">
              <i class="fa fa-calendar text-white"></i>
              <p class="text-white">
                {{ event.date | moment('MMMM Do YYYY') }}
              </p>
              <i class="fa fa-user text-white"></i>
              <p class="text-white">
                {{ event.uploaded_by }}
              </p>
              <i class="fa fa-bookmark text-white"></i>
              <p class="text-white">
                {{ event.venue }}
              </p>
              <i class="fa fa-money text-white"></i>
              <p class="text-white">
                {{ event.ticket_price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const event = await $axios.$get(`/events/${params.id}`)
      return { event }
    } catch (e) {
      return { event: null }
    }
  },
  data() {
    return {
      event: Object
    }
  },
  head() {
    return {
      title: 'Craftspace | Exhibitions |' + ' ' + this.event.name
    }
  }
}
</script>

<style scoped>
@import '~/static/css/home.css';
</style>
