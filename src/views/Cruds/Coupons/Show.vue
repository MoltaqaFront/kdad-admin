<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showCoupon") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameAr')" v-model.trim="data.name_ar" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameEn')" v-model.trim="data.name_en" required
            readonly />
          <!-- End:: code Input -->

            <!-- Start:: code Input -->
            <!-- <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.code')" v-model.trim="data.code" required
            readonly /> -->
          <!-- End:: code Input -->

          <!-- Start:: Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.percentage" required readonly />
          <!-- End:: Percentage Input -->

          <!-- Start:: Using Number Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.usingNumber')" v-model.trim="data.usingNumber"
            required readonly />
          <!-- End:: Using Number Input -->

          <!-- Start:: Start Date Input -->
          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.startDate')"
            v-model.trim="data.startDate" required disabled />
          <!-- End:: Start Date Input -->

          <!-- Start:: End Date Input -->
          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.endDate')"
            v-model.trim="data.endDate" required disabled />
          <!-- End:: End Date Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
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
        percentage: null,
        minLimit: null,
        maxLimit: null,
        usingNumber: null,
        startDate: null,
        endDate: null,
        active: true,
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
        this.data.percentage = res.data.data.value;
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

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "coupons show");
    this.getStores();
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
