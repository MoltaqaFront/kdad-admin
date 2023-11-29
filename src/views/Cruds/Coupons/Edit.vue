<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editCoupon") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="submitForm">
        <div class="row">
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameAr')" v-model.trim="data.name_ar" required
             />
          <!-- End:: code Input -->

          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameEn')" v-model.trim="data.name_en" required
           />
          <!-- End:: code Input -->

            <!-- Start:: code Input -->
            <!-- <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.code')" v-model.trim="data.code" required
            readonly /> -->
          <!-- End:: code Input -->

          <!-- Start:: Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.value" required />
          <!-- End:: value Input -->

          <!-- Start:: Using Number Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.usingNumber')" v-model.trim="data.usingNumber"
            required />
          <!-- End:: Using Number Input -->

          <!-- Start:: Start Date Input -->
          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.startDate')"
            v-model.trim="data.startDate" required />
          <!-- End:: Start Date Input -->

          <!-- Start:: End Date Input -->
          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.endDate')"
            v-model.trim="data.endDate" required />
          <!-- End:: End Date Input -->

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
import moment from "moment";

export default {
  name: "EditCoupon",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        code: null,
        name_ar: null,
        name_en: null,
        store: null,
        value: null,
        minLimit: null,
        maxLimit: null,
        usingNumber: null,
        startDate: null,
        endDate: null,
        active: true,
        value_type: "precentage",
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allStores: "ApiGetsModule/allStoresData",
    }),
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getStores: "ApiGetsModule/getStores",
    }),
    // End:: Vuex Actions

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/coupon-client/${this.id}`,
        });
        // Start:: Set Data
        this.data.name_ar = res.data.data.title_ar;
        this.data.name_en = res.data.data.title_en;
        this.data.code = res.data.data.code;
        this.data.value = res.data.data.value;
        this.data.usingNumber = res.data.data.usage_times;
        this.data.startDate = res.data.data.active_from;
        this.data.endDate = res.data.data.active_to;
        this.data.active = res.data.data.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Datepicker Disable Previous Days
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },
    // End:: Datepicker Disable Previous Days

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

        if (!this.data.percentage) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.percentage"));
        return;
      } else if (!this.data.usingNumber) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.usingNumber"));
        return;
      } else if (!this.data.startDate) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.startDate"));
        return;
      } else if (!this.data.endDate) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.endDate"));
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
      // // Start:: Append Request Data
      // REQUEST_DATA.append("store_id", this.data.store.id);
      // REQUEST_DATA.append("percentage", this.data.percentage);
      // REQUEST_DATA.append("min_limit", this.data.minLimit);
      // REQUEST_DATA.append("max_limit", this.data.maxLimit);
      // REQUEST_DATA.append("using_number", this.data.usingNumber);
      // REQUEST_DATA.append("start_at", this.data.startDate);
      // REQUEST_DATA.append("end_at", this.data.endDate);
      // REQUEST_DATA.append("is_active", +this.data.active);
      // // Start:: Append Request Data

      // Start:: Append Request Data
      REQUEST_DATA.append("title[ar]", this.data.name_ar);
      REQUEST_DATA.append("title[en]", this.data.name_en);
      REQUEST_DATA.append("active_from", this.data.startDate);
      REQUEST_DATA.append("active_to", this.data.endDate);
      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("value", this.data.value);
      REQUEST_DATA.append("usage_times", this.data.usingNumber);
      REQUEST_DATA.append("value_type", this.data.value_type);
      // REQUEST_DATA.code = this.data.code;
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "PUT",
          url: `modules/coupon-client/${this.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/coupons/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "coupons edit");
    this.getStores();
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
