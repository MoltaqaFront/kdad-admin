<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_notification_details") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Receiver Type Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.receiverType')"
            v-model.trim="data.sender_type" required readonly />
          <!-- End:: Receiver Type Input -->

          <div class="col-12">
            <div class="row">
              <!-- Start:: Title Ar Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleAr')" v-model.trim="data.titleAr"
                required />
              <!-- End:: Title Ar Input -->

              <!-- Start:: Title En Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.titleEn')" v-model.trim="data.titleEn"
                required />
              <!-- End:: Title En Input -->

              <!-- Start:: Content Ar Input -->
              <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentAr')"
                v-model.trim="data.contentAr" required />
              <!-- End:: Content Ar Input -->

              <!-- Start:: Content En Input -->
              <base-input col="6" rows="7" type="textarea" :placeholder="$t('PLACEHOLDERS.contentEn')"
                v-model.trim="data.contentEn" required />
              <!-- End:: Content En Input -->
            </div>
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
  name: "CreateNotification",

  computed: {

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.client_ask"),
          value: "client",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.provider_ask"),
          value: "provider",
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: "null",
        },
      ]
    },
  },

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        receiverType: null,
        user_types: null,
        titleAr: null,
        titleEn: null,
        contentAr: null,
        contentEn: null,
      },

      Users: []
      // End:: Data Collection To Send

    };
  },

  methods: {

    // Start:: Vuex Actions

    ...mapActions({
      getClients: "ApiGetsModule/getClients",
      getDrivers: "ApiGetsModule/getDrivers",
    }),

    // End:: Vuex Actions

    // Start:: validate Form Inputs
    validateFormInputs() {
      if (!this.data.titleAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.titleEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.contentAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      } else if (!this.data.contentEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
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

      REQUEST_DATA.append("title[ar]", this.data.titleAr);
      REQUEST_DATA.append("title[en]", this.data.titleEn);
      REQUEST_DATA.append("content[ar]", this.data.contentAr);
      REQUEST_DATA.append("content[en]", this.data.contentEn);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/notification/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/all-notifications/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getUsers() {
      this.loading = true;

      this.data.user_types = null;

      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/notification/users",
          params: {
            "user_type[]": this.data.receiverType?.value
          }
        });
        this.loading = false;
        this.Users = res.data.data;
        this.Users.shift();
        this.Users.unshift({ name: this.$t('STATUS.all'), value: 'all' })
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    handleClientSelectionChange() {
      // Check if "all" is selected, and if so, clear other selections
      this.data.user_types.forEach((item) => {
        if (item.value == "all") {
          this.data.user_types = [{ name: this.$t('STATUS.all'), value: 'all' }];
        }
      })

    },

    // get notification with id
    async getNotificationData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/notification/${this.$route.params.id}`
        });
        console.log(res.data.data)
        this.data.sender_type = res.data.data.targets[0].name;
        this.data.titleAr = res.data.data.title_ar;
        this.data.titleEn = res.data.data.title_en;
        this.data.contentAr = res.data.data.content_ar;
        this.data.contentEn = res.data.data.content_en;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.getNotificationData()
    // End:: Fire Methods
  },
};
</script>
