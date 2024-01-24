<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="submitForm">
        <div class="row">

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.taxPercentage')" v-model.trim="data.vat" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.app_commission')"
            v-model.trim="data.commetion" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.allowedTimeToCancelRequest')"
            v-model.trim="data.decline_order_after" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.notify_load')" v-model.trim="data.notify_load" />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.delivery_raduis')"
            v-model.trim="data.delivery_raduis" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.points_per_order')"
            v-model.trim="data.points_per_order" />
          <!-- End:: Driver's Daily Orders Amount Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        vat: '',
        commetion: '',
        decline_order_after: '',
        notify_load: '',
        delivery_raduis: '',
        points_per_order: '',
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/setting/1`,
        });
        // Start:: Set Data
        this.data.vat = res.data.data.vat;
        this.data.commetion = res.data.data.commetion;
        this.data.decline_order_after = res.data.data.decline_order_after;
        this.data.notify_load = res.data.data.notify_load;
        this.data.delivery_raduis = res.data.data.delivery_raduis;
        this.data.points_per_order = res.data.data.points_per_order;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("vat", this.data.vat);
      REQUEST_DATA.append("commetion", this.data.commetion);
      REQUEST_DATA.append("decline_order_after", this.data.decline_order_after);
      REQUEST_DATA.append("notify_load", this.data.notify_load);
      REQUEST_DATA.append("delivery_raduis", this.data.delivery_raduis);
      REQUEST_DATA.append("points_per_order", this.data.points_per_order);

      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/setting/1`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.fast_order_cancel_time) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.fast_order_cancel_time"));
        return;
      } else if (!this.data.reservation_cancel_time) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.reservation_cancel_time"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
