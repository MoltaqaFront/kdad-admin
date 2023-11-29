<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_car_modal") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" required />
          <!-- End:: Name Input -->

          <base-select-input col="4" :optionsList="allTypes" :placeholder="$t('PLACEHOLDERS.car_type')"
            v-model="data.carType" required />

          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.is_active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.is_active" hide-details></v-switch>
          </div>

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

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        is_active: null,
        carType: null,
        date: null
      },
      allTypes: [],
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

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.carType) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.carType"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("title[ar]", this.data.nameAr);
      REQUEST_DATA.append("title[en]", this.data.nameEn);
      REQUEST_DATA.append("is_active", +this.data.is_active);
      REQUEST_DATA.append("car_type_id", this.data.carType.id);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/car-category/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/carModals/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },

    // start all Regions data

    async getCarModels() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/car-category/${this.$route.params.id}`,
        });
        this.data.carType = res.data.data.carTypeTitle;
        this.data.nameAr = res.data.data.title_ar;
        this.data.nameEn = res.data.data.title_en;
        this.data.is_active = res.data.data.is_active;
        console.log(res.data.data.carTypeTitle)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllCarType() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/car-category",
        });
        this.allTypes = res.data.extras.carTypes;
        console.log(res.data.body.CarTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all Regions data

  },

  created() {
    // Start:: Fire Methods
    // this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");

    this.getCarModels();
    this.getAllCarType()
    // End:: Fire Methods
  },
};
</script>
