/* eslint-disable no-console */
<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>Upcoming Events and Exhibitions</h3>
          <nuxt-link to="/events/add" class="btn btn-dark ml-2"
            >Upload Event</nuxt-link
          >
        </div>
      </div>
      <template v-for="event in events">
        <div
          :key="event.id"
          class="fadeInUp animated col-lg-12 col-md-4 col-sm-6 mb-4"
        >
          <event-card :event="event"></event-card>
        </div>
      </template>
    </div>
  </main>
</template>
<script>
import EventCard from '~/components/EventCard'
export default {
  components: {
    EventCard
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
      title: 'Events and Exhibitions'
    }
  }
}
</script>
<style scoped></style>
