/* eslint-disable no-console */
<template>
  <main class="container col-md-12">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between mt-2">
          <h2>Upcoming Events and Exhibitions</h2>
          <nuxt-link to="/events/add" class="btn btn-dark ml-2"
            >Upload Event</nuxt-link
          >
        </div>
      </div>
      <template v-for="event in events">
        <div
          :key="event.id"
          class="fadeInUp animated col-lg-8 col-md-4 col-sm-6 mb-4"
        >
          <event-card-home :event="event"></event-card-home>
        </div>
      </template>
    </div>
  </main>
</template>
<script>
import EventCardHome from '~/components/EventCardHome'
export default {
  components: {
    EventCardHome
  },
  async asyncData({ $axios, params }) {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const events = await $axios.$get(`events/`, config)
      return { events }
    } catch (e) {
      return { events: [] }
    }
  },
  data() {
    return {
      events: []
    }
  },
  head() {
    return {
      title: 'Craftspace | Events and Exhibitions'
    }
  }
}
</script>
<style scoped></style>
