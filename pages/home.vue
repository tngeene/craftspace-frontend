<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
    >
      <b-carousel-slide
        caption="An online space everyone can enjoy,
         learn and discover the richness of African Contemporary Art."
        img-src="/artist.jpeg"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Craftspace showcases the dynamic African art scene and connects a selection of African artists with art lovers, collectors, curators, art buyers,
         corporations, museums and art institutions."
        img-src="/trumpet.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Enhancing creatives and aiming to improve their portfolio"
        img-src="/art-background.jpg"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
  head() {
    return {
      title: 'Craftspace | Home'
    }
  }
}
</script>

<style>
#carousel-fade {
  position: absolute;
  width: 100%;
  height: 600px;
  overflow: hidden;
  top: 0;
}
</style>
