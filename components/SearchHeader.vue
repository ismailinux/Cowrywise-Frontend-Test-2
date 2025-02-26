<template>
  <div class="search-header">
    <div class="header-background">
      <!-- <div class="overlay"></div> -->
      <div class="container">

        <div v-if="userStore.searching && userStore.loading" class="searching">
                Searching for 
                <span class="query">
                    <Icon class="icon" name="icomoon-free:quotes-left" size="20" /> 
                    {{ searchQuery }}
                    <Icon class="icon" name="icomoon-free:quotes-right" size="20" />
                </span>
            </div>

            <div v-else-if="isSearchInitiated && !userStore.loading" class="searching">
                Search results for 
                <span class="query">
                    <Icon class="icon" name="icomoon-free:quotes-left" size="20" /> 
                    {{ searchQuery }}
                    <Icon class="icon" name="icomoon-free:quotes-right" size="20" />
                </span>
            </div>

        <div v-else class="input-wrapper">
          <button class="btn" @click="handleSearch">
                    <Icon name="ph:magnifying-glass" size="20" :style="{ color: 'grey' }" />
          </button>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for photos"
            class="search-input"
            @keyup.enter="handleSearch"
          >
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const searchQuery = ref('');
const emit = defineEmits(['search']);
const isSearchInitiated = ref(false);

const handleSearch = () => {
  isSearchInitiated.value = true; 
  userStore.searching = true; 
  userStore.loading = true; 
  emit('search', searchQuery.value.trim());
  

}

watch(() => userStore.loading, (newLoading) => {
    if (!newLoading && userStore.searching) {
      userStore.searching = false; 
    }
});
</script>

<style lang="scss" scoped>
.search-header {
  position: relative;

  .header-background {
    height: var(--header-height);
    background-color: #dce3ea;
    position: relative;
    overflow: hidden;
  }

  

  

  .container {
    max-width: 1600px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
  }

  .input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .btn {
    padding: 1rem;
    border: none;
    height: 100%;
    background-color: inherit;
  }

  .search-input {
    width: 100%;
    padding: 1rem 0;
    font-size: 1.125rem;
    background-color: inherit;
    border: none;
    outline: none;
  }

  .searching {
    font-size: 2.5rem;               
    font-weight: 600;
    font-family: sans-serif;             
    color: #273b56;                   
    text-align: left;              
    margin: 1rem 3rem;                
    width: 100%;                    
    min-width: 70%;
}

.query {
    color: #6e7b90;
    white-space: nowrap;
}

.icon {
    vertical-align: top;
    color: #6e7b90;     
}

.icon:first-of-type {
    margin-right: -0.5rem; 
}

.icon:last-of-type {
    margin-left: -0.5rem;
}

@media (max-width: 483px) {
  .searching {
    margin-bottom: 4rem;
  }

}

}
</style>