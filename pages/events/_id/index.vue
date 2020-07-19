<template>
  <div>
    <div class="container py-3">
      <div
        v-if="checkEventValidity() == true"
        ref="alert"
        class="alert alert-primary"
        role="alert"
      >
        {{ message }}
      </div>
      <div class="row">
        <div class="col-lg-12">
          <h3 class="event-title text-center">{{ event.name }}</h3>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <img
            :src="event.banner"
            class="w-100"
            height="57%"
            :alt="event.name"
          />
          <p class="event-description mt-2">{{ event.description }}</p>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="card-text date">
                <i class="fa fa-calendar text-white"></i>
                <p class="text-white">
                  {{ event.date | moment('MMMM Do YYYY') }}
                </p>
              </div>
              <div class="card-text artist">
                <i class="fa fa-user text-white"></i>
                <p class="text-white">
                  {{
                    event.uploaded_by[0].first_name +
                      ' ' +
                      event.uploaded_by[0].last_name
                  }}
                </p>
              </div>
              <div class="card-text venue">
                <i class="fa fa-bookmark text-white"></i>
                <p class="text-white">
                  {{ event.venue }}
                </p>
              </div>
              <div class="card-text text-white ticket-price">
                &#36;
                <p>ksh {{ event.ticket_price }}</p>
              </div>
              <!-- <div class="event-actions text-center">
                <button class="btn-md btn-primary">Add to calendar</button>
                <button id="addToCart" class="btn-md text-white">
                  Buy Ticket
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

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
      event: Object,
      message: 'This event has already passed'
    }
  },
  methods: {
    checkEventValidity() {
      const date1 = moment(this.event.date).format('MMMM Do YYYY')
      const date2 = moment().format('MMMM Do YYYY')
      if (date1 < date2) {
        // eslint-disable-next-line no-console
        console.log(`I Aam here ${date1}`)
        // eslint-disable-next-line no-console
        console.log(this.$refs.alert)
        return this.message
      } else {
        // eslint-disable-next-line no-console
        console.log(`I Am here ${date2}`)
      }
    }
  },
  head() {
    return {
      title: 'Craftspace | Exhibitions |' + ' ' + this.event.name
    }
  }
}
</script>
