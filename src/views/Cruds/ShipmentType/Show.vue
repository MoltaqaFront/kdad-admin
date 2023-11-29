<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_Shipment_main_type") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />
          <!-- End:: Name Input -->
          <!-- Start:: Submit Button Wrapper -->

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
        nameAr: null,
        nameEn: null,
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

    async getCarTypes() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/shipment-type/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.title_ar;
        this.data.nameEn = res.data.data.title_en;
        console.log( res.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all product category data


  },

  created() {
    this.getCarTypes();
    // Start:: Fire Methods
    // this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    // this.getStoreCategoriesAndOrderTypes();

    // End:: Fire Methods
  },
};
</script>
