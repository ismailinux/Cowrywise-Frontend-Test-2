<template>
  <div 
    v-if="photo?.urls?.regular"
    class="photo-card"
    @click="$emit('click', photo)"
  >
    <img 
      :src="photo.urls.regular" 
      :alt="photo.alt_description"
      class="photo-image"
    >
    <div class="photo-overlay"></div>
    <div class="photo-info">
      <p class="photo-author">{{ photo.user?.name || 'Unknown photographer' }}</p>
      <p class="photo-location">{{ photo.user?.location || 'Location unknown' }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photo: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.photo-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem; 
  cursor: pointer;
  display: inline-block;
  width: 100%;

  &:hover .photo-image {
    transform: scale(1.05);
  }
}

.photo-image {
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: #fff;
}

.photo-author {
  font-weight: 500; 
}

.photo-location {
  font-size: 0.875rem; 
  opacity: 0.8;
}
</style>