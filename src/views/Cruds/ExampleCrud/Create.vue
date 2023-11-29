<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.add_client") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input
            col="12"
            identifier="client_image"
            :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage"
            required
          />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameAr')"
            v-model.trim="data.nameAr"
            required
          />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nameEn')"
            v-model.trim="data.nameEn"
            required
          />
          <!-- End:: En Name Input -->

          <!-- Start:: Email Input -->
          <base-input
            col="6"
            type="email"
            :placeholder="$t('PLACEHOLDERS.email')"
            v-model.trim="data.email"
            required
          />
          <!-- End:: Email Input -->

          <!-- Start:: Mobile Input -->
          <base-input
            col="6"
            type="tel"
            :placeholder="$t('PLACEHOLDERS.mobileNumber')"
            v-model.trim="data.mobileNumber"
            required
          />
          <!-- End:: Mobile Input -->

          <!-- Start:: Country Input -->
          <base-select-input
            v-if="allCountriesData"
            col="4"
            :optionsList="allCountriesData"
            :placeholder="$t('PLACEHOLDERS.country')"
            @fireInputEvent="
              getCitiesByCountryId(data.country.id);
              data.city = null;
              data.area = null;
            "
            v-model="data.country"
            required
          />
          <!-- End:: Country Input -->

          <!-- Start:: Status Input -->
          <base-select-input
            col="4"
            :optionsList="allCitiesByCountryIdData"
            :placeholder="$t('PLACEHOLDERS.city')"
            @fireInputEvent="
              getAreasByCountryIdAndCityId({
                countryId: data.country.id,
                cityId: data.city.id,
              });
              data.area = null;
            "
            v-model="data.city"
            :disabled="!data.country"
          />
          <!-- End:: Status Input -->

          <!-- Start:: Area Input -->
          <base-select-input
            col="4"
            :optionsList="allAreasByCountryIdAndCityIdData"
            :placeholder="$t('PLACEHOLDERS.area')"
            v-model="data.area"
            :disabled="!data.country || !data.city"
          />
          <!-- End:: Area Input -->

          <!-- Start:: Address Input -->
          <base-input
            id="autocomplete_ar"
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.address')"
            @fireClick="getFormattedAddress"
            v-model.trim="data.address"
          />
          <!-- End:: Address Input -->

          <!-- Start:: LongItude Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.longitude')"
            v-model.trim="data.lng"
            readonly
          />
          <!-- End:: LongItude Input -->

          <!-- Start:: Latitude Input -->
          <base-input
            col="4"
            type="text"
            :placeholder="$t('PLACEHOLDERS.latitude')"
            v-model.trim="data.lat"
            readonly
          />
          <!-- End:: Latitude Input -->

          <!-- Start:: Import Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.import_number')"
            v-model.trim="data.import_number"
          />
          <!-- End:: Import Number Input -->

          <!-- Start:: IBAN Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.iban')"
            v-model.trim="data.iban"
          />
          <!-- Start:: IBAN Number Input -->

          <!-- Start:: CR Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.cr_number')"
            v-model.trim="data.cr_number"
          />
          <!-- End:: CR Number Input -->

          <!-- Start:: CR Number Image Input -->
          <base-name-preview-file-upload-input
            col="6"
            identifier="cr_image"
            :placeholder="$t('PLACEHOLDERS.cr_image')"
            @selectFile="selectImage"
            useImagePreview
            required
          />
          <!-- End:: CR Number Image Input -->

          <!-- Start:: VAT Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.vat_number')"
            v-model.trim="data.vat_number"
            required
          />
          <!-- End:: VAT Number Input -->

          <!-- Start:: VAT Number Image Input -->
          <base-name-preview-file-upload-input
            col="6"
            identifier="vat_image"
            :placeholder="$t('PLACEHOLDERS.vat_image')"
            @selectFile="selectImage"
            useImagePreview
            required
          />
          <!-- End:: VAT Number Image Input -->

          <!-- Start:: NID Number Input -->
          <base-input
            col="6"
            type="text"
            :placeholder="$t('PLACEHOLDERS.nid_number')"
            v-model.trim="data.nid_number"
            required
          />
          <!-- Start:: NID Number Input -->

          <!-- Start:: NID Exp Date Input -->
          <base-picker-input
            col="6"
            type="date"
            :disabledDate="disabledDate"
            :placeholder="$t('PLACEHOLDERS.nid_epx_date')"
            v-model.trim="data.nid_epx_date"
          />
          <!-- End:: NID Exp Date Input -->

          <!-- Start:: Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="data.password"
          />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input
            col="6"
            type="password"
            :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.confirmPassword"
          />
          <!-- End:: Confirm Password Input -->

          <!-- Start:: Is Ban Switch Input -->
          <base-switch-input
            col="12"
            color="red"
            :label="$t('PLACEHOLDERS.isBan')"
            v-model="data.isBan"
          />
          <!-- End:: Is Ban Switch Input -->

          <!-- Start:: Ban Reason Textarea -->
          <transition name="fadeInUp">
            <base-input
              v-if="data.isBan"
              col="12"
              rows="3"
              type="textarea"
              :placeholder="$t('PLACEHOLDERS.ban_reason')"
              v-model.trim="data.ban_reason"
              :required="data.isBan"
            />
          </transition>
          <!-- End:: Ban Reason Textarea -->

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

<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA"></script>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "CreateClient",

  computed: {
    // Start:: Vuex Get Api Gets Data
    ...mapGetters({
      allCountriesData: "ApiGetsModule/allCountriesData",
      allCitiesByCountryIdData: "ApiGetsModule/allCitiesByCountryIdData",
      allAreasByCountryIdAndCityIdData:
        "ApiGetsModule/allAreasByCountryIdAndCityIdData",
    }),
    // End:: Vuex Get Api Gets Data
  },

  data() {
    return {
      // Start:: Loader Handling Data
      isWaitingRequest: false,
      // End:: Loader Handling Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: require("@/assets/media/images/upload_image.png"),
          file: null,
        },
        nameAr: null,
        nameEn: null,
        email: null,
        mobileNumber: null,
        country: null,
        city: null,
        area: null,
        address: null,
        lng: null,
        lat: null,
        import_number: null,
        iban: null,
        cr_number: null,
        cr_image: {
          file: null,
          path: null,
          name: null,
        },
        vat_number: null,
        vat_image: {
          file: null,
          path: null,
          name: null,
        },
        nid_number: null,
        nid_epx_date: null,
        password: null,
        confirmPassword: null,
        isBan: false,
        ban_reason: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Vuex Api Gets Actions
    ...mapActions({
      getCountries: "ApiGetsModule/getCountries",
      getCitiesByCountryId: "ApiGetsModule/getCitiesByCountryId",
      getAreasByCountryIdAndCityId:
        "ApiGetsModule/getAreasByCountryIdAndCityId",
    }),
    // End:: Vuex Api Gets Actions

    // Start:: G-map Get Formatted Address
    getFormattedAddress() {
      var self = this;
      var input = document.getElementById("autocomplete_ar");
      var searchBox = new google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          bounds.extend(place.geometry.location);
          place.geometry.location.lat();
          place.geometry.location.lng();
          place.formatted_address;

          self.data.address = place.formatted_address;
          self.data.lat = place.geometry.location.lat();
          self.data.lng = place.geometry.location.lng();
        });
      });
    },
    // End:: G-map Get Formatted Address

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "client_image") {
        this.data.image = selectedImage;
      } else if (selectedImage.identifier === "cr_image") {
        this.data.cr_image = selectedImage;
      } else if (selectedImage.identifier === "vat_image") {
        this.data.vat_image = selectedImage;
      }
    },
    // End:: Select Upload Image

    // Start:: Datepicker Disable Previous Days
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },
    // End:: Datepicker Disable Previous Days

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.image.file) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.userImage"));
        return;
      } else if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else if (!this.data.mobileNumber) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.mobileNumber"));
        return;
      } else if (!this.data.country) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.country"));
        return;
      } else if (!this.data.city) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.city"));
        return;
      } else if (!this.data.area) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.area"));
        return;
      }
      // else if (!this.data.address) {
      //     this.isWaitingRequest = false;
      //     this.$message.error(this.$t("VALIDATION.address"));
      //     return;
      // }
      else if (!this.data.import_number) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.import_number"));
        return;
      } else if (!this.data.iban) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.iban"));
        return;
      } else if (!this.data.cr_number) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.cr_number"));
        return;
      } else if (!this.data.cr_image.file) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.cr_image"));
        return;
      } else if (!this.data.vat_number) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.vat_number"));
        return;
      } else if (!this.data.vat_image.file) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.vat_image"));
        return;
      } else if (!this.data.nid_number) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nid_number"));
        return;
      } else if (!this.data.nid_epx_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nid_epx_date"));
        return;
      } else if (!this.data.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.data.password.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (!this.data.confirmPassword) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.data.confirmPassword.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (this.data.password != this.data.confirmPassword) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.notEqualPasswords"));
        return;
      } else if (this.data.isBan && !this.data.ban_reason) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.ban_reason"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // ********** Start:: Append Request Data (Form Data) ********** //
      REQUEST_DATA.append("image", this.data.image.file);
      REQUEST_DATA.append("name", this.data.nameAr);
      REQUEST_DATA.append("nameEn", this.data.nameEn);
      REQUEST_DATA.append("email", this.data.email);
      REQUEST_DATA.append("phone", this.data.mobileNumber);
      REQUEST_DATA.append("country_id", this.data.country.id);
      REQUEST_DATA.append("city_id", this.data.city.id);
      REQUEST_DATA.append("area_id", this.data.area.id);
      if (this.data.address) {
        REQUEST_DATA.append("address", this.data.address);
        REQUEST_DATA.append("lng", this.data.lng.toString());
        REQUEST_DATA.append("lat", this.data.lat.toString());
      }
      REQUEST_DATA.append("import_number", this.data.import_number);
      REQUEST_DATA.append("bank_account_iban", this.data.iban);
      REQUEST_DATA.append("cr_number", this.data.cr_number);
      REQUEST_DATA.append("cr_image", this.data.cr_image.file);
      REQUEST_DATA.append("vat_number", this.data.vat_number);
      REQUEST_DATA.append("vat_image", this.data.vat_image.file);
      REQUEST_DATA.append("nid_number", this.data.nid_number);
      REQUEST_DATA.append("nid_expired_date", this.data.nid_epx_date);
      REQUEST_DATA.append("password", this.data.password);
      REQUEST_DATA.append("is_ban", +this.data.isBan);
      if (this.data.isBan) {
        REQUEST_DATA.append("ban_reason", this.data.ban_reason);
      }
      // ********** End:: Append Request Data (Form Data) ********** //

      // ********** Start:: Send Request ********** //
      try {
        await this.$axios({
          method: "POST",
          url: `user`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/clients/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
      // ********** End:: Send Request ********** //
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getCountries();
    // End:: Fire Methods
  },
};
</script>
