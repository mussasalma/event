<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <a class="sidebar-brand" href="/">
        <span class="align-middle">Attendance System</span>
      </a>

      <ul class="sidebar-nav">
        <!-- <li class="sidebar-header">HOME</li> -->

        <!-- <li class="sidebar-item active">
          <router-link class="sidebar-link" to="/">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard</span>
          </router-link>
        </li> -->

        <!-- <li class="sidebar-item">
          <router-link class="sidebar-link" to="/all-guests">
            <i class="align-middle" data-feather="user"></i>
            <span class="align-middle">All Guests</span>
          </router-link>
        </li> -->

        <!-- <li class="sidebar-item">
          <router-link class="sidebar-link" to="/attendance">
            <i class="align-middle" data-feather="log-in"></i>
            <span class="align-middle">Today's Attendance</span>
          </router-link>
        </li> -->

        <li class="sidebar-header">Guests</li>

        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/all-guests">
            <i class="align-middle" data-feather="user"></i>
            <span class="align-middle">Today's Attendance</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/add-guest">
            <i class="align-middle" data-feather="check-square"></i>
            <span class="align-middle">Add guest</span>
          </router-link>
        </li>

     
        <li class="sidebar-header">REPORT</li>

        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/weekly-reports">
            <i class="align-middle" data-feather="bar-chart-2"></i>
            <span class="align-middle">Data </span>
          </router-link>
        </li>

        <!-- <li class="sidebar-item">
          <router-link class="sidebar-link" to="/attendance">
            <i class="align-middle" data-feather="map"></i>
            <span class="align-middle">Monthly</span>
          </router-link>
        </li> -->
      </ul>
    </div>
  </nav>
</template>
