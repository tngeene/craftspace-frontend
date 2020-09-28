<template>
  <div class="artist-card ml-2 mr-4" style="width: 18rem;">
    <div class="artist-box box-outline box-outline-about">
      <div class="artist-image-box">
        <img
          :src="artist.artist_profile.photo"
          alt=""
          width="295"
          height="282"
        />
      </div>
      <div class="artist-caption">
        <nuxt-link :to="`/artists/${artist.id}`" class="text-dark">
          {{ artist.first_name }} {{ artist.last_name }} </nuxt-link
        ><span> | {{ artist.artist_profile.county }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['artist']
}
</script>

<style scoped>
.artist-box {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}
.artist-image-box {
  position: relative;
  max-width: 295px;
  margin-left: auto;
  margin-right: auto;
}
img {
  display: inline-block;
  max-width: 100%;
  height: auto;
}
img {
  vertical-align: middle;
}
img {
  border: 0;
}
@media (min-width: 768px) {
  .box-outline {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding-top: 20px;
  }
  .box-outline > *:nth-child(1)::before {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    border: 5px solid #af9f7b;
    content: '';
    transform: translate(-22px, -20px);
    transition: 550ms ease-in-out;
  }
  @media (min-width: 1200px) {
    .box-outline-about > *:nth-child(1) :before {
      left: 0;
    }
  }
}
</style>
