<template>
  <div class="row">
    <div class="col-md-3">
      <div class="mb-3">
        <nuxt-link :to="`/events/${event.id}`">
          <div class="card event-card">
            <img :src="event.banner" class="card-img-top" :alt="event.name" />
            <div class="event-price px-2">
              <span v-if="event.ticket_price" class="badge badge-light"
                >Ksh {{ event.ticket_price }}</span
              >
              <span v-else class="badge badge-light">Free</span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-4 text-center">
                  <p class="event-month">
                    {{ event.date | moment('MMM') }}
                  </p>
                  <p class="event-date font-weight-bold">
                    {{ event.date | moment('Do') }}
                  </p>
                </div>
                <div class="col-8 event-card-body">
                  <span
                    ><p class="mt-3">{{ event.name }}</p></span
                  >

                  <p class="text-muted">
                    {{ event.description | truncate(10, '...') }}
                  </p>

                  <p class="text-muted event-venue mt-4">
                    <i class="fa fa-map-pin" aria-hidden="true"></i>
                    {{ event.venue }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    truncate(text, length, suffix) {
      if (text.length > 15) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['event']
}
</script>
