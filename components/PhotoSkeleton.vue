<template>
  <div class="photo-skeleton animate-pulse">
    <div class="skeleton-image"></div>
    <div class="skeleton-text">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line long"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-skeleton {
  &.animate-pulse {
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    animation: pulse 2s infinite;
  }

  .skeleton-image {
    background-color: #e2e8f0; 
    border-radius: 0.5rem; 
    height: 300px; 
  }

  .skeleton-text {
    margin-top: 0.5rem; 
    display: flex;
    flex-direction: column;
    gap: 0.5rem; 

    .skeleton-line {
      background-color: #e2e8f0; 
      border-radius: 0.25rem; 

      &.short {
        height: 1rem; 
        width: 66.666667%; 
      }

      &.long {
        height: 0.75rem; 
        width: 50%; 
      }
    }
  }
}
</style>