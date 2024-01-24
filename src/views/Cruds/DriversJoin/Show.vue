<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_provider_request") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage" :preSelectedImage="data.image.path" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')" v-model.trim="data.name"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phoneNumber')" v-model.trim="data.phone"
            disabled />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" disabled />
          <!-- End:: Email Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.identity')" v-model.trim="data.identity"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nationality')" v-model.trim="data.nationality"
            disabled />

          <!-- Start:: Address Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.bankName')" v-model.trim="data.bank" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.iban')" v-model.trim="data.iban" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.date_of_birth')" v-model.trim="data.dob"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.age')" v-model.trim="data.age" disabled />

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

          <base-image-upload-input col="12" identifier="id_imge" :preSelectedImage="data.id_imge.path"
            :placeholder="$t('PLACEHOLDERS.car_image')" @selectImage="selectImage" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.serial_num')" v-model.trim="data.serial_number"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_type')" v-model="data.car_type" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_modal')" v-model="data.car_model" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_plate')" v-model.trim="data.car_plate"
            disabled />
          <!-- End:: Address Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateDriver",

  computed: {
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id_imge: {
          path: null,
          file: null,
        },
        liecence_image: {
          path: null,
          file: null,
        },
        front_image: {
          path: null,
          file: null,
        },
        back_image: {
          path: null,
          file: null,
        },
        image: {
          path: null,
          file: null,
        },
        name: null,
        phone: null,
        email: '',
        dob: null,
        age: null,
        car_model: null,
        car_type: null,
        serial_number: null,
        year_made: null,
        car_plate: null,
        nationality: null,
        iban: null,
        bank: null,
        Account_Holders: null,
        identity: null,

        password: null,
        passwordConfirmation: null,
        available: true,
        active: true,
      },
      // End:: Data Collection To Send

      AllNationalities: [],
      AllCarModal: [],
      AllCarTypes: [],

      // google maps

      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      marker: {
        position: { lat: 24.7136, lng: 46.6753 }, // Initial marker position (Riyadh)
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

    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getAreas: "ApiGetsModule/getAreas",
      getCitiesByAreaId: "ApiGetsModule/getCitiesByAreaId",
      getDistrictsByCityId: "ApiGetsModule/getDistrictsByCityId",
    }),
    // End:: Vuex Actions

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      } else if (selectedImage.identifier === "id_imge") {
        this.data.id_imge = selectedImage;
      } else if (selectedImage.identifier === "liecence_image") {
        this.data.liecence_image = selectedImage;
      } else if (selectedImage.identifier === "front_image") {
        this.data.front_image = selectedImage;
      } else if (selectedImage.identifier === "back_image") {
        this.data.back_image = selectedImage;
      }
    },
    // End:: Select Upload Image

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
        let response = await this.$axios({
          method: "GET",
          url: `modules/deactive-provider/${this.$route.params.id}`,
        });
        this.loading = false;

        this.data.image.path = response.data.data.user.image;
        this.data.name = response.data.data.user.name;
        this.data.email = response.data.data.user.email;
        this.data.phone = response.data.data.user.mobile;
        this.data.identity = response.data.data.user.national_identity;
        this.data.nationality = response.data.data.user.nationality.nationality;
        this.data.dob = response.data.data.user.dob;
        this.data.age = response.data.data.user.age;
        this.data.Account_Holders = response.data.data.user.account_username;
        this.data.iban = response.data.data.user.bankUser.IBAN;
        this.data.bank = response.data.data.user.bankUser.bank.name;
        this.data.car_plate = response.data.data.user.car.board_number;
        this.data.serial_number = response.data.data.user.car.serial_number;
        this.data.car_type = response.data.data.user.car.carType.title;
        this.data.car_model = response.data.data.user.car.carCategory.title;

        this.Latitude = +response.data.data.user.latitude;
        this.Longitude = +response.data.data.user.longitude;

        this.marker.position.lat = +response.data.data.user.latitude;
        this.marker.position.lng = + response.data.data.user.longitude;

        this.center.lat = +response.data.data.user.latitude;
        this.center.lng = +response.data.data.user.longitude;

        this.place = response.data.data.user.address;

        this.data.id_imge.path = response.data.data.user.car.image;


      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
