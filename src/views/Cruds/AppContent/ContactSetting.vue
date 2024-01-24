<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="input-repeater">
            <div class="inner-button-repeat" v-for="(phone, index) in phoneNumbers" :key="index">
              <base-input col="12" type="tel" :placeholder="$t('PLACEHOLDERS.phone')"
                v-model.trim="phoneNumbers[index]" />
              <button class="remove-repeater" type="button" v-if="phoneNumbers.length > 1"
                @click="removePhoneNumber(index)">-</button>
            </div>
            <button class="add-repeater" type="button" @click="addPhoneNumber">+</button>
          </div>

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.whats_num')" v-model.trim="data.whats_phone" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Tax Percentage Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.facebook')" v-model.trim="data.facebook" />
          <!-- End:: Tax Percentage Input -->

          <!-- Start:: Delivery Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.instagram')" v-model.trim="data.instagram" />
          <!-- End:: Delivery Price Input -->

          <!-- Start:: Driver's Daily Orders Amount Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.snapchat')" v-model.trim="data.snapchat" />
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
      phoneNumbers: [''],
      // Start:: Data Collection To Send
      data: {
        whats_phone: '',
        facebook: null,
        instagram: null,
        snapchat: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    addPhoneNumber() {
      this.phoneNumbers.push('');
    },
    removePhoneNumber(index) {
      this.phoneNumbers.splice(index, 1);
    },
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/app-content/1`,
        });
        // Start:: Set Data
        this.phoneNumbers = res.data.data.mobile;
        this.data.whats_phone = res.data.data.mobile_whatsapp;
        this.data.facebook = res.data.data.facebook;
        this.data.instagram = res.data.data.instagram;
        this.data.snapchat = res.data.data.snapchat;
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
      // Start:: Append Request Data
      this.phoneNumbers.forEach((element, index) => {
        REQUEST_DATA.append(`mobile[${index}]`, element);
      });
      REQUEST_DATA.append("mobile_whatsapp", this.data.whats_phone);
      // REQUEST_DATA.append("delivery_price", this.data.deliveryPrice);
      REQUEST_DATA.append("facebook", this.data.facebook);
      REQUEST_DATA.append("instagram", this.data.instagram);
      REQUEST_DATA.append("snapchat", this.data.snapchat);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/app-content/1`,
          data: REQUEST_DATA,
        });
        this.getDataToEdit();
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
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
<style>
.inner-button-repeat {
  position: relative;
  max-width: 95%;
}

button.add-repeater {
  position: relative;
  right: 50%;
  bottom: 12px;
  background: var(--main_theme_clr);
  border-radius: 50%;
  font-size: 46px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  padding-bottom: 10px;
  color: white;
}

.input-repeater {
  overflow: hidden;
}

button.remove-repeater {
  position: absolute;
  left: -45px;
  top: 22%;
  background: red;
  border-radius: 50%;
  font-size: 46px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  padding-bottom: 10px;
  color: white;
}
</style>