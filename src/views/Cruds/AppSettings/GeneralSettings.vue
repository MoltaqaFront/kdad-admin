<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="submitForm">
        <div class="row">
          <!-- Start:: Phone Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="data.phone"
          />
          <!-- End:: Phone Input -->

          <!-- Start:: Another Phone Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('PLACEHOLDERS.anotherPhone')"
            v-model.trim="data.anotherPhone"
          />
          <!-- End:: Another Phone Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button
              class="mt-2"
              styleType="primary_btn"
              :btnText="$t('BUTTONS.save')"
              :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest"
            />
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
        phone: null,
        anotherPhone: null,
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
          url: `admin/settings`,
        });
        // Start:: Set Data
        this.data.phone = res.data.body.settings.phone1;
        this.data.anotherPhone = res.data.body.settings.phone2;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = {};
      // Start:: Append Request Data
      REQUEST_DATA.phone1 = this.data.phone;
      REQUEST_DATA.phone2 = this.data.anotherPhone;
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "PUT",
          url: `admin/settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
