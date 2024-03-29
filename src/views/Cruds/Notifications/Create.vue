<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.add_notification") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Receiver Type Input -->
          <base-select-input col="6" :optionsList="receiverTypes" :placeholder="$t('TABLES.Notifications.receiverType')"
            v-model="data.receiverType" required @input="getUsers" />
          <!-- End:: Receiver Type Input -->

          <base-select-input col="6" v-if="(data.receiverType && data.receiverType.value == 'client')"
            :optionsList="Users" :placeholder="$t('PLACEHOLDERS.client_ask')" v-model="data.user_types" required multiple
            @input="handleClientSelectionChange" />

          <base-select-input col="6" v-if="(data.receiverType && data.receiverType.value == 'provider')"
            :optionsList="Users" :placeholder="$t('PLACEHOLDERS.provider_ask')" v-model="data.user_types" required
            multiple @input="handleClientSelectionChange" />

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

      if (this.data.receiverType?.value == 'provider' || this.data.receiverType?.value == 'client') {

        REQUEST_DATA.append("user_type[]", this.data.receiverType?.value);

        this.data.user_types.forEach((element) => {
          if (element.value == 'all') {
            // REQUEST_DATA.append(`selectedUsers[]`, "");
          } else {
            REQUEST_DATA.append(`selectedUsers[]`, element.id);
          }
        });

        // if(this.data)
      }

      REQUEST_DATA.append("title[ar]", this.data.titleAr);
      REQUEST_DATA.append("title[en]", this.data.titleEn);
      REQUEST_DATA.append("content[ar]", this.data.contentAr);
      REQUEST_DATA.append("content[en]", this.data.contentEn);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/notification`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
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

  },

  created() {
  },
};
</script>
