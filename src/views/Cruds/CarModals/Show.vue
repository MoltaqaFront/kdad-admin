<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_car_modal") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.personalImage')" @selectImage="selectImage" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />

          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.car_type')" v-model.trim="data.car_type"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: date -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.date" disabled />
          <!-- End:: date -->



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
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        car_type: null,
        date: null

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

    // start all product category data

    async getCarModels() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/car-category/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.image;
        this.data.nameAr = res.data.data.title_ar;
        this.data.nameEn = res.data.data.title_en;
        this.data.date = res.data.data.created_at;
        this.data.car_type = res.data.data.carTypeTitle.name;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all product category data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();

    this.getCarModels();
    // End:: Fire Methods
  },
};
</script>
