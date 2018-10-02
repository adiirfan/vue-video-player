<template>
  <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-light">
          <a class="navbar-brand mx-auto" href="#">
            Video
          </a>
        </nav>
        <div class="nav-scroller bg-white shadow-sm">
          <nav class="nav nav-underline">
            <a class="nav-link active" href="#">Dashboard</a>
            <a class="nav-link" href="#">
              Friends
              <span class="badge badge-pill bg-light align-text-bottom">27</span>
            </a>
            <a class="nav-link" href="#">Explore</a>
            <a class="nav-link" href="#">Suggestions</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
          </nav>
        </div>
      <router-view></router-view>
  </div>
</template>

<style>
</style>
