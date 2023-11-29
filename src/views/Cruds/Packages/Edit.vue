<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_package") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" required />
          <!-- End:: Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="data.price" required />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.discount_percentage" required />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_duration')"
            v-model.trim="data.package_duration" required />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_people')"
            v-model.trim="data.number_people_allowed" required />

          <div class="col-12">
            <div class="row">
              <!-- Start:: Ar Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descAr')"
                v-model.trim="data.descAr" required />
              <!-- End:: Ar Desc Textarea -->

              <!-- Start:: En Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descEn')"
                v-model.trim="data.descEn" required />
              <!-- End:: En Desc Textarea -->
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

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        price: null,
        discount_percentage: null,
        package_duration: null,
        number_people_allowed: null,
        descAr: null,
        descEn: null,
        active: true,
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
      } else if (!this.data.discount_percentage) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.percentage"));
        return;
      } else if (!this.data.price) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price"));
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
      REQUEST_DATA.append("discount_percentage", this.data.discount_percentage);
      REQUEST_DATA.append("price", this.data.price);
      REQUEST_DATA.append("package_duration", this.data.package_duration);
      REQUEST_DATA.append("number_people_allowed", this.data.number_people_allowed);
      REQUEST_DATA.append("description[ar]", this.data.descAr);
      REQUEST_DATA.append("description[en]", this.data.descEn);
      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/packages/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/packages/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // start all package data
    async getPackageData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/packages/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.body.package.titleAr;
        this.data.nameEn = res.data.body.package.titleEn;
        this.data.descAr = res.data.body.package.descriptionAr;
        this.data.descEn = res.data.body.package.descriptionEn;
        this.data.price = res.data.body.package.price;
        this.data.discount_percentage = res.data.body.package.discount_percentage;
        this.data.package_duration = res.data.body.package.package_duration;
        this.data.number_people_allowed = res.data.body.package.subscribers_number;
        this.data.active = res.data.body.package.is_active;
        // console.log(res.data.body.package)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all package data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();
    this.getPackageData()
    // End:: Fire Methods
  },
};
</script>
