<template>
  <div class="container">
    <div v-if="userStore.loading" class="loading-container">
      <PhotoSkeleton v-for="n in 6" :key="n" class="photo-skeleton" />
    </div>
    <div v-else-if="error" class="error-container">
      <div class="error-card">
        <h2>Error</h2>
        <p>{{ error }}</p>
        <div v-if="error.includes('API key')" class="error-details">
          <p>To fix this:</p>
          <ol>
            <li>Create a <code>.env</code> file in the project root</li>
            <li>Add your Unsplash API key:</li>
            <pre>UNSPLASH_ACCESS_KEY=your_access_key_here</pre>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    </div>
    <div v-else class="photos-container">
      <PhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="openModal(photo)"
        class="photo-card"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';


const photos = ref([])
const currentPage = ref(1)
const error = ref(null)
const config = useRuntimeConfig()
const currentQuery = ref('')


const userStore = useUserStore();

const emit = defineEmits(['openModal'])

const fetchPhotos = async (query = '') => {
  try {
    userStore.loading = true;
    error.value = null
    
    if (!config.public.unsplashAccessKey) {
      throw new Error('Unsplash API key is not configured. Please set UNSPLASH_ACCESS_KEY in your .env file.')
    }

    const endpoint = query
      ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${currentPage.value}&per_page=12`
      : `https://api.unsplash.com/photos?page=${currentPage.value}&per_page=12`

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Client-ID ${config.public.unsplashAccessKey}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.errors?.[0] || 'Failed to fetch photos. Please check your API key and try again.')
    }

    const data = await response.json()
    photos.value = query ? data.results : data
  } catch (err) {
    console.error('Error fetching photos:', err)
    error.value = err.message
  } finally {
    userStore.loading = false; 
  }
}

const searchPhotos = async (query) => {
  currentQuery.value = query
  currentPage.value = 1
  await fetchPhotos(query)
}

const openModal = (photo) => {
  emit('openModal', { photo, photos: photos.value })
}

defineExpose({
  searchPhotos
})

onMounted(() => fetchPhotos())
</script>

<style lang="scss" scoped>
 .container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;  
  padding-right: 1rem; 
  margin-top: -5rem;   
}

.loading-container {
  column-count: 1;
  column-gap: 1.5rem;  
  
  @media (min-width: 768px) {  
    column-count: 2;
  }
  
  @media (min-width: 1024px) { 
    column-count: 3;
  }
}

.photo-skeleton,
.photo-card {
  margin-bottom: 1.5rem;     
  break-inside: avoid-column; 
}

.error-container {
  text-align: center;
  padding-top: 2rem;    
  padding-bottom: 2rem;
  
  .error-card {
    max-width: 28rem;   
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    padding: 1.5rem;    
    border-radius: 0.5rem; 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05); 
    
    h2 {
      font-size: 1.25rem;      
      font-weight: 600;       
      color: #dc2626;         
      margin-bottom: 1rem;    
    }
    
    p {
      color: #4b5563;        
      margin-bottom: 1rem;   
    }
    
    .error-details {
      font-size: 0.875rem;    
      color: #6b7280;         
      background-color: #f3f4f6; 
      padding: 1rem;          
      border-radius: 0.25rem; 
      
      p {
        margin-bottom: 0.5rem; 
      }
      
      ol {
        list-style-type: decimal;
        list-style-position: inside;
        
        li {
          margin-bottom: 0.25rem; 
        }
      }
      
      pre {
        background-color: #e5e7eb; 
        padding: 0.5rem;        
        border-radius: 0.25rem;  
        margin-top: 0.5rem;     
      }
    }
  }
}

.photos-container {
  column-count: 1;
  column-gap: 1.5rem;  
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {  
    column-count: 2;
  }
  
  @media (min-width: 1024px) { 
    column-count: 3;
  }
}
</style>