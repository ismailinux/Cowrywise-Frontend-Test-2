<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen && currentPhoto?.urls?.full"
        class="image-modal"
        v-touch:swipe-left="nextImage"
        v-touch:swipe-right="previousImage"
        id="image-modal"
      >
        <button @click="close" class="close-button">×</button>
        
        <button v-if="hasPrevious" @click="previousImage" class="prev-button">‹</button>
        <button v-if="hasNext" @click="nextImage" class="next-button">›</button>

        <Transition name="slide" mode="out-in">
          <div class="image-container" :key="currentPhoto?.id">
            <img
              :key="currentPhoto?.id"
              :src="currentPhoto?.urls?.full"
              :alt="currentPhoto?.alt_description"
            >
            <div class="photo-info">
              <p class="author">{{ currentPhoto?.user?.name || 'Unknown Author' }}</p>
              <p class="location">{{ currentPhoto?.user?.location || 'Unknown Location' }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// Your existing script setup remains unchanged
const isOpen = ref(false);
const currentPhoto = ref(null);
const photos = ref([]);
const currentIndex = ref(0);

const hasNext = computed(() => currentIndex.value < photos.value.length - 1);
const hasPrevious = computed(() => currentIndex.value > 0);

const open = (photo, allPhotos) => {
  if (!photo?.urls?.full) return;
  currentPhoto.value = photo;
  photos.value = allPhotos;
  currentIndex.value = allPhotos.findIndex(p => p.id === photo.id);
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const nextImage = () => {
  if (hasNext.value) {
    currentIndex.value++;
    currentPhoto.value = photos.value[currentIndex.value];
  }
};

const previousImage = () => {
  if (hasPrevious.value) {
    currentIndex.value--;
    currentPhoto.value = photos.value[currentIndex.value];
  }
};

defineExpose({
  open,
  close
});
</script>


<style lang="scss" scoped>
.image-modal {
  // border: 2px solid red;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7); // bg-black/90

  .close-button {
    position: absolute;
    top: 1rem;        
    right: 1rem;      
    color: #ffffff;   
    font-size: 1.5rem; 
    z-index: 50;
  }

  .prev-button,
  .next-button {
    position: absolute;
    color: #5f7999;   
    background-color: #ffffff; 
    border-radius: 50%; 
    width: 2.5rem;    
    height: 2.5rem;   
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 50;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #5f7999;
      color: #ffffff;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.3); 
    }
  }

  .prev-button {
    left: 1rem;      
  }

  .next-button {
    right: 1rem;
  }

  img {
    max-height: 70vh;
    max-width: 90vw;
    object-fit: contain;
    border-radius: 10px 10px 0 0;
  }

  .image-container{
    margin-bottom: 50px 50px;
  }

  .photo-info {
    font-family: sans-serif;
    background: #ffffff;
    color: #294a69;    
    padding: 1rem; 
    border-radius: 0 0 10px 10px; 

        .author{
          font-weight: 600;
          font-size: large;
        }

        .location{
          font-weight:300;
          font-size:medium;
        }
  }
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>