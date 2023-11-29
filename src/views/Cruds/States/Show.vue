<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showStates") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.state')" v-model.trim="data.state_id.name"
            disabled />

          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place" disabled />

          <div class="row">
            <div class="col-12">
              <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                :options="mapOptions">
                <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @click="markerClicked"
                  @dragend="markerDragged($event)" :options="mapOptions" />
              </GmapMap>
            </div>
          </div>

          <!-- Start:: Submit Button Wrapper -->
          <!-- <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div> -->
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateStore",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        state_id: null
      },
      allStates: [],
      // google maps

      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      marker: {
        position: { lat: 24.7136, lng: 46.6753 }, // Initial marker position (Riyadh)
      },
      polylineOptions: {
        strokeColor: '#FF0000', // Red color
        strokeOpacity: 1.0,
        strokeWeight: 2,
        geodesic: true,
      },

      Latitude: '',
      Longitude: '',
      Radius: '',
      place: '',

      mapOptions: {
        zoomControl: false, // Disable the default zoom control
        disableDoubleClickZoom: false, // Disable zooming on double-click
        draggable: false, // Disable dragging the map
        clickableIcons: false, // Disable clickable icons on the map
        // More options can be added if required
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allStoreCategories: "ApiGetsModule/allStoreCategoriesData",
      allOrderTypes: "ApiGetsModule/allOrderTypesData",
    }),
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getStoreCategoriesAndOrderTypes: "ApiGetsModule/getStoreCategoriesAndOrderTypes",
    }),
    // End:: Vuex Actions

    async getAllStates() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/states",
        });
        this.allStates = res.data.body.states;
        console.log(res.data.body.states)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // google maps

    // google maps

    handleMapClick(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.marker.position = { lat, lng }; // Update the marker's position
        }
      });
    },

    calculateDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Radius of the earth in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLng = this.deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    handleMarkerClick(index) {
      console.log('Marker clicked:', index);
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    markerClicked() {
      // Handle marker click event
      const lat = this.marker.position.lat;
      const lng = this.marker.position.lng;
      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);
      console.log('Marker clicked:', lat, lng);
      console.log(radius);
    },

    markerDragged(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.marker.position = { lat, lng };
      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      this.Latitude = lat;
      this.Longitude = lng;
      this.Radius = radius;

      console.log('Latitude dragged:', lat);
      console.log('Longitude dragged:', lng);
      console.log('Radius dragged:', radius);
    },

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/regions/${this.$route.params.id}`,
        });
        this.data.state_id = res.data.body.region.state;
        this.center.lat = res.data.body.region.lat;
        this.center.lng = res.data.body.region.long;
        this.marker.position.lat = res.data.body.region.lat;
        this.marker.position.lng = res.data.body.region.long;
        this.place = res.data.body.region.address;
        console.log(res.data.body.region)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();
    this.getAllStates();
    this.getDataToEdit()
    // End:: Fire Methods
  },
};
</script>
