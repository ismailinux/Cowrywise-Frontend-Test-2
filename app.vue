<template>
  <div class="min-h-screen bg-gray-100">
    <SearchHeader @search="handleSearch" />
    <PhotoGrid ref="photoGrid" @open-modal="openModal" />
    <ImageModal ref="imageModal" />
  </div>
</template>

<script setup>
const imageModal = ref(null)
const photoGrid = ref(null)

const openModal = ({ photo, photos }) => {
  imageModal.value?.open(photo, photos)
}

const handleSearch = (query) => {
  photoGrid.value?.searchPhotos(query)
}
</script>

<style>
:root {
  --header-height: 300px;
  --overlay-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>