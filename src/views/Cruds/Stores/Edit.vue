<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editStore") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Logo Input -->

          <base-image-upload-input col="3" identifier="store_logo" :preSelectedImage="data.logo.path"
            :placeholder="$t('PLACEHOLDERS.logo')" @selectImage="selectImage" />
          <!-- End:: Logo Input -->

          <!-- Start:: Cover Input -->
          <base-image-upload-input col="3" identifier="store_cover" :placeholder="$t('PLACEHOLDERS.cover')"
            @selectImage="selectImage" :preSelectedImage="data.cover.path" required />
          <!-- End:: Cover Input -->

          <!-- Start:: Commerical Profile Image Input -->
          <base-image-upload-input col="3" identifier="commercial_profile_image"
            :placeholder="$t('PLACEHOLDERS.commercialProfileImage')" @selectImage="selectImage"
            :preSelectedImage="data.commericalProfile.path" required />
          <!-- End:: Commerical Profile Image Input -->

          <!-- Start:: Tax Profile Image Input -->
          <base-image-upload-input col="3" identifier="tax_profile_image"
            :placeholder="$t('PLACEHOLDERS.taxProfileImage')" @selectImage="selectImage"
            :preSelectedImage="data.taxProfile.path" required />
          <!-- End:: Tax Profile Image Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" required />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="4" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" required />
          <!-- End:: Email Input -->

          <!-- Start:: Ar Title Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.storeTitleAr')" v-model.trim="data.titleAr"
            required />
          <!-- End:: Ar Title Input -->

          <!-- Start:: En Title Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.storeTitleEn')" v-model.trim="data.titleEn"
            required />
          <!-- End:: En Title Input -->

          <!-- Start:: Store First Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.storePhone')" v-model.trim="data.storePhone"
            required />
          <!-- End:: Store First Phone Input -->

          <!-- Start:: Store Second Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.anotherStorePhone')"
            v-model.trim="data.anotherStorePhone" />
          <!-- End:: Store Second Phone Input -->

          <!-- Start:: Store Category Input -->
          <base-select-input v-if="allStoreCategories" col="4" :optionsList="allStoreCategories"
            :placeholder="$t('PLACEHOLDERS.storeType')" v-model="data.storeType" required />
          <!-- End:: Store Category Input -->

          <!-- Start:: Store Category Input -->
          <base-select-input col="4" :optionsList="allOrderTypes" :placeholder="$t('PLACEHOLDERS.orderType')"
            v-model="data.orderTypes" multiple required />

          <!-- <base-select-input col="4" :optionsList="AllCategories" :placeholder="$t('PLACEHOLDERS.main_category')"
            v-model="data.main_category_id" required /> -->

          <base-input col="4" v-if="isSelected(4) || isSelected(5) || isSelected(6)" type="text"
            :placeholder="$t('PLACEHOLDERS.starting_price_reservation')" v-model.trim="data.min_charge" required />

          <base-select-input v-if="isSelected(4) || isSelected(5) || isSelected(6)" col="4" :optionsList="tableType"
            :placeholder="$t('PLACEHOLDERS.table_type')" v-model="data.table_type" multiple required />
          <!-- End:: Store Category Input -->

          <base-select-input v-if="isSelected(4) || isSelected(5) || isSelected(6)" col="4" :optionsList="sessionType"
            :placeholder="$t('PLACEHOLDERS.session_type')" v-model="data.session_type" multiple required />

          <base-select-input v-if="isSelected(4) || isSelected(5) || isSelected(6)" col="4" :optionsList="allowKids"
            :placeholder="$t('PLACEHOLDERS.Children_allowed')" v-model="data.allow_kids" required />

          <!-- Start:: Ar Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descAr')" v-model.trim="data.descAr"
            required />
          <!-- End:: Ar Desc Textarea -->

          <!-- Start:: En Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descEn')" v-model.trim="data.descEn"
            required />
          <!-- End:: En Desc Textarea -->

          <!-- Start:: Password Input -->
          <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="data.password"
            required />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.passwordConfirmation" required />
          <!-- End:: Confirm Password Input -->

          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place" required />

          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  @click="handleMapClick" />
              </div>
            </div>
          </div>

          <h3 class="text-center head_section"> {{ $t('TABS.work_Days') }}</h3>

          <v-container class="px-0 custom_labels">
            <div class="form-group" v-for="(day, index) in days" :key="'w' + index">
              <input type="checkbox" :value="day.id" :id="day.name" v-model="day.isChecked" />
              <label :for="day.name">{{ day.name }}</label>
            </div>
          </v-container>

          <div class="row">

            <div class="all_row_input w-100" v-for="(day, index) in days" :key="'day' + index">
              <div v-if="day.isChecked" class="w-100">
                <h3 class="text-center head_section">{{ $t('TABS.work_times') }} {{ day.name }}</h3>

                <div v-if="day.working_hours.length == 0" class="text-center">
                  <p class="text-danger">{{ $t('PLACEHOLDERS.no_working_hours') }}</p>
                </div>
                <div v-else class="w-100  d-flex loop_working" v-for="(workingHour, hourIndex) in  day.working_hours"
                  :key="hourIndex">

                  <div class="form-group position-relative w-100">
                    <label class="form-label">{{ $t('TABLES.ImagesSpaces.start_time') }}</label>
                    <input v-model="workingHour.from" type="time" />
                  </div>

                  <div class="form-group position-relative w-100">
                    <label class="form-label">{{ $t('TABLES.ImagesSpaces.end_time') }}</label>
                    <input v-model="workingHour.to" type="time" />
                  </div>



                  <div class="all_actions">
                    <span @click="removeWorkingHour(day, hourIndex)" class="add_another"
                      :class="{ 'disabled': day.working_hours.length === 1 }">
                      <i class="fas fa-minus"></i>
                    </span>

                    <span @click="addWorkingHour(day)" class="add_another">
                      <i class="fas fa-plus"></i>
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>


          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
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

      checkbox: true,

      daying: [
        { id: 1, name: `${this.$t("days.Saturday")}`, isChecked: true, working_hours: [{ from: '', to: '' }] },
        { id: 2, name: `${this.$t("days.Sunday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] },
        { id: 3, name: `${this.$t("days.Monday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] },
        { id: 4, name: `${this.$t("days.Tuesday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] },
        { id: 5, name: `${this.$t("days.Wednesday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] },
        { id: 6, name: `${this.$t("days.Thursday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] },
        { id: 7, name: `${this.$t("days.Friday")}`, isChecked: false, working_hours: [{ from: '', to: '' }] }
      ],

      // Start:: Data Collection To Send
      data: {
        logo: {
          path: null,
          file: null,
        },
        cover: {
          path: null,
          file: null,
        },
        commericalProfile: {
          path: null,
          file: null,
        },
        taxProfile: {
          path: null,
          file: null,
        },
        name: null,
        phone: null,
        email: null,
        titleAr: null,
        titleEn: null,
        storePhone: null,
        anotherStorePhone: null,
        storeType: null,
        orderTypes: [],
        descAr: null,
        descEn: null,
        password: null,
        passwordConfirmation: null,
        active: true,
        main_category_id: '',
        min_charge: null,
        table_type: null,
        session_type: null,
        allow_kids: null,
        from: [],
        to: []

      },

      inputs: [{ start_from: '', start_to: '' }],
      days: [],
      days_id: [],

      // google maps

      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      markers: [],
      AllCategories: [],

      Latitude: '',
      Longitude: '',
      Radius: '',
      place: '',
      selectedDays: []
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

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
      ];
    },

    tableType() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.Indoor"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.Outdoor"),
          value: 0,
        },
      ];
    },

    sessionType() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.opend"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.closed"),
          value: 0,
        },
      ];
    },

    allowKids() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },


  },

  methods: {

    addWorkingHour(day) {
      day.working_hours.push({ from: '', to: '' });
    },

    removeWorkingHour(day, index) {
      if (day.working_hours.length > 1) {
        day.working_hours.splice(index, 1);
      }
    },

    isSelected(id) {
      return this.data.orderTypes.some(option => option.id === id);
    },
    isSelectedBox(dayId) {
      return this.days_id.includes(dayId);
    },
    // Start:: Vuex Actions
    ...mapActions({
      getStoreCategoriesAndOrderTypes: "ApiGetsModule/getStoreCategoriesAndOrderTypes",
    }),
    // End:: Vuex Actions

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "store_logo") {
        this.data.logo = selectedImage;
        console.log(this.data.logo)
      } else if (selectedImage.identifier === "store_cover") {
        this.data.cover = selectedImage;
      } else if (selectedImage.identifier === "commercial_profile_image") {
        this.data.commericalProfile = selectedImage;
      } else if (selectedImage.identifier === "tax_profile_image") {
        this.data.taxProfile = selectedImage;
      }
    },
    // End:: Select Upload Image

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // if (!this.data.logo.path) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.logo"));
      //   return;
      // } else if (!this.data.cover.path) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.cover"));
      //   return;
      // } else if (!this.data.commericalProfile.path) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.commericalProfile"));
      //   return;
      // } else if (!this.data.taxProfile.path) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.taxProfile"));
      //   return;
      // } else
      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phone"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      }
      // else if (this.data.orderTypes) {

      //   this.data.orderTypes.forEach((element, id) => {
      //     if (element.id == 4 || element.id == 5 || element.id == 6 && !this.data.min_charge) {
      //       this.isWaitingRequest = false;
      //       this.$message.error(this.$t("VALIDATION.commericalProfile"));
      //       return;
      //     }
      //   });

      // }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();

      REQUEST_DATA.append("_method", "PUT");
      if (this.data.logo.file) {
        REQUEST_DATA.append("logo", this.data.logo.file);
      }
      if (this.data.cover.file) {
        REQUEST_DATA.append("cover", this.data.cover.file);
      }
      if (this.data.commericalProfile.file) {
        REQUEST_DATA.append("commercial_profile_image", this.data.commericalProfile.file);
      }
      if (this.data.taxProfile.file) {
        REQUEST_DATA.append("tax_profile_image", this.data.taxProfile.file);
      }

      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("email", this.data.email);
      REQUEST_DATA.append("phone", this.data.phone);

      if (this.data.orderTypes) {
        this.data.orderTypes.forEach((element, id) => {
          REQUEST_DATA.append("order_types[]", element.id);
        });
      }


      REQUEST_DATA.append("main_category_id", this.data.storeType.id);
      REQUEST_DATA.append("store_phone_numbers[]", this.data.storePhone);
      REQUEST_DATA.append("store_phone_numbers[]", this.data.anotherStorePhone);
      REQUEST_DATA.append("title[ar]", this.data.titleAr);
      REQUEST_DATA.append("title[en]", this.data.titleEn);
      REQUEST_DATA.append("full_address", this.place);
      REQUEST_DATA.append("latitude", this.Latitude);
      REQUEST_DATA.append("longitude", this.Longitude);
      REQUEST_DATA.append("description[ar]", this.data.descAr);
      REQUEST_DATA.append("description[en]", this.data.descEn);
      REQUEST_DATA.append("password", this.data.password);
      REQUEST_DATA.append("password_confirmation", this.data.passwordConfirmation);

      if (this.data.min_charge) {
        REQUEST_DATA.append("min_charge", this.data.min_charge);
      }

      if (this.data.allow_kids?.id) {
        REQUEST_DATA.append("allow_kids", this.data.allow_kids.id);
      }

      if (this.data.session_type) {
        this.data.session_type.forEach((item) => {
          REQUEST_DATA.append("session_type[]", item.id);
        })
      }

      if (this.data.table_type) {
        this.data.table_type.forEach((item) => {
          REQUEST_DATA.append("table_type[]", item.id);
        })
      }

      // if (this.selectedDays) {
      //   this.selectedDays.forEach((element, id) => {
      //     REQUEST_DATA.append("days[2][id]", element.id);
      //   });
      // }

      // if (this.data.from) {
      //   this.data.from.forEach((element, id) => {
      //     REQUEST_DATA.append(`days[2][times][${id}][from]`, element);
      //   });
      // }

      // if (this.data.to) {
      //   this.data.to.forEach((element, id) => {
      //     REQUEST_DATA.append(`days[2][times][${id}][to]`, element);
      //   });
      // }


      // if (this.selectedDays) {
      //   this.selectedDays.forEach((day) => {
      //     day.working_hours.forEach((workingHour, id) => {
      //       const startFromValue = workingHour.from;
      //       const endToValue = workingHour.to;

      //       // Use the values as needed
      //       REQUEST_DATA.append(`days[2][times][${id}][from]`, startFromValue);
      //       REQUEST_DATA.append(`days[2][times][${id}][to]`, endToValue);
      //     });
      //   });
      // }

      this.days.forEach((day) => {
        if (day.isChecked) {
          // Append day's ID
          REQUEST_DATA.append(`days[${day.id}][id]`, day.id);

          // Iterate through the working hours for the current day
          day.working_hours.forEach((workingHour, hourIndex) => {
            if (workingHour.from && workingHour.to) {
              REQUEST_DATA.append(`days[${day.id}][times][${hourIndex}][from]`, workingHour.from);
              REQUEST_DATA.append(`days[${day.id}][times][${hourIndex}][to]`, workingHour.to);
            }
          });
        }
      });

      REQUEST_DATA.append("is_active", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/stores/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/stores/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/stores/${this.$route.params.id}`,
        });
        this.data.logo.path = res.data.body.store.logo;
        this.data.taxProfile.path = res.data.body.store.tax_profile_image;
        this.data.cover.path = res.data.body.store.cover;
        this.data.commericalProfile.path = res.data.body.store.commercial_profile_image;
        this.data.active = res.data.body.store.is_active;
        this.data.name = res.data.body.store.owner_name;
        this.data.titleAr = res.data.body.store.translations.name_ar;
        this.data.titleEn = res.data.body.store.translations.name_en;
        this.data.descAr = res.data.body.store.translations.description_ar;
        this.data.descEn = res.data.body.store.translations.description_en;
        this.data.phone = res.data.body.store.owner_phone;
        this.data.email = res.data.body.store.owner_email;
        this.place = res.data.body.store.address.full_address;
        this.center.lat = res.data.body.store.address.latitude;
        this.center.lng = res.data.body.store.address.longitude;
        this.data.storePhone = res.data.body.store.phone_numbers[0].phone;
        this.data.anotherStorePhone = res.data.body.store.phone_numbers[1].phone;
        this.data.orderTypes = res.data.body.store.order_types;
        this.data.storeType = res.data.body.store.mainCategory;
        this.days = res.data.body.store.working_hours;

        const firstDayWithWorkingHours = this.days.find(day =>
          day.working_hours.length > 0 && day.working_hours[0].from && day.working_hours[0].to
        );

        if (firstDayWithWorkingHours) {
          firstDayWithWorkingHours.isChecked = true;
        }

        this.data.min_charge = res.data.body.store.table_reservation_settings.min_charge;
        this.data.table_type = res.data.body.store.table_reservation_settings.table_type;
        this.data.session_type = res.data.body.store.table_reservation_settings.session_type;
        this.data.allow_kids = res.data.body.store.table_reservation_settings.allow_kids;

        console.log(res.data.body.store)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

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

          this.markers.push({
            position: { lat, lng }
          });
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
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.center = marker;
        this.currentPlace = null;
      }
    },

    getday() {
      console.log(this.days_id)
    },


    // categories

    async getAllCategories() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores/types/categories",
        });
        this.AllCategories = res.data.body.mainCategories;
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // repeater


    addInput(day) {
      if (!day.additionalInputs) {
        this.$set(day, 'additionalInputs', []);
      }
      day.additionalInputs.push({ from: '', to: '' });
    },
    removeInput(day, index) {
      day.additionalInputs.splice(index, 1);
      this.data.from.splice(index, 1);
      this.data.to.splice(index, 1);
    },

    removeSelectedHour(day, workingHourIndex) {
      // Remove the working hour entry from the array based on index
      day.working_hours.splice(workingHourIndex, 1);
    },

    // get days

    async getAllDays() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/days",
        });
        this.days = res.data.body.settings;
        console.log(res.data.body.settings)
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
    this.getAllCategories();
    this.getAllDays();
    this.getDataToEdit()
    // End:: Fire Methods
  },
};
</script>
<style lang="scss" scoped>
.custom_labels {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  .form-group {
    flex: 13%;
    max-width: 13%;
    min-width: 80px;
  }

  input {
    display: none;

    +label {
      width: 100%;
      height: 80px;
      min-width: 80px;
      border-radius: 8px;
      max-width: 100%;
      background: #FFF;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer
    }

    &:checked {
      +label {
        background: #F6A513;
        color: #FFF
      }
    }

  }
}


.all_row_input {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  // margin-bottom: 20px;

  .inpts {
    width: 100%;
    display: flex;
    gap: 20px;
  }


  >.hours_dates {
    width: 90%;
    display: flex;
    gap: 20px;
  }

  .form-group {
    // flex: 48%;
    // max-width: 48%;
    margin-bottom: 20px;

    label {
      position: absolute;
      top: -15px;
      right: 20px;
      padding-inline: 8px;
      font-size: 16px;
      background: #f2f2f2;
      color: #F6A513;

    }

  }

  input {
    width: 100%;
    padding: 20px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #F6A513;
  }
}


.all_action {
  display: flex;
  gap: 15px
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}

.head_section {
  color: #F6A513;
  font-size: 18px;
  font-weight: bold;
  margin: 40px 0;
}


.disabled {
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
}


.loop_working {
  gap: 10px;

  .all_actions {
    display: flex;
    gap: 11px;
  }
}

@media(max-width:575px) {
  .all_row_input {
    flex-direction: column;

    .form-group {
      flex: 100%;
      max-width: 100%;
    }
  }

  .loop_working {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
}
</style>