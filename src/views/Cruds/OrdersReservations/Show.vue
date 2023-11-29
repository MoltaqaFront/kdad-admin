<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showOrder") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.id" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.status')" v-model.trim="data.status" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderStatus')" v-model.trim="data.orderType"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Products.created_at')" v-model.trim="data.orderDate"
            disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.store_data') }}</h4>
          </div>

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" disabled />
          <!-- End:: Image Upload Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.store_name')" v-model.trim="data.store_name"
            disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.reservation_data') }}</h4>
          </div>


          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Children_allowed')"
            v-model.trim="data.Children_allowed" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.number_of_people')"
            v-model.trim="data.number_of_people" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.table_type')" v-model.trim="data.table_type"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.session_type')" v-model.trim="data.session_type"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.reservation_date')"
            v-model.trim="data.reservation_date" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.reservation_time')"
            v-model.trim="data.reservation_time" disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.client_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.name')" v-model.trim="data.client_name"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.phone')" v-model.trim="data.client_phone"
            disabled />

          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.receiver_phone')"
            v-model.trim="data.receiver_phone" disabled /> -->

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.price_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Services.price')" v-model="data.price" disabled />

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "CreateProduct",

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {

        order_type_id: null,

        // order info

        id: null,
        status: null,
        orderType: null,
        orderDate: null,

        // store info

        store_name: null,
        image: {
          path: null,
          file: null,
        },

        // address location
        address_location_from: null,
        address_location_to: null,

        // client info

        client_name: null,
        client_phone: null,
        receiver_phone: null,

        //table info
        Children_allowed: null,
        number_of_people: null,
        table_type: null,
        session_type: null,
        reservation_date: null,
        reservation_time: null,


        // driver info

        driver_name: null,
        driver_phone: null,

        category: null,
        storeType: null,

        payment_method_brand: '',
        price: ''

      },


      // product info

      parents: [
        {
          nameAr: '',
          nameEn: '',
          is_multiple_choice: '',
          is_required: '',
          additions_children: [],
        },
      ],
      multiple_choice: [],
      is_required: [],

      // End:: Data Collection To Send

      allStores: [],
      allCategories: []


    };
  },

  computed: {
    multipleStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
    requiredStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
  },

  methods: {

    // start get all stores

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores",
        });
        this.allStores = res.data.body.stores;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllCategories() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores/types/categories",
        });
        this.allCategories = res.data.body.orderTypes;
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get all stores

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/reservation/${this.$route.params.id}`,
        });

        // order info
        this.data.number_of_people = res.data.body.reservation.number_of_people;
        this.data.table_type = res.data.body.reservation.table_type;
        this.data.session_type = res.data.body.reservation.session_type;
        this.data.reservation_date = res.data.body.reservation.reservation_date;
        this.data.reservation_time = res.data.body.reservation.reservation_time;

        this.data.order_type_id = res.data.body.reservation.order_type.id;

        this.data.id = res.data.body.reservation.id;
        this.data.status = res.data.body.reservation.status;
        this.data.orderType = res.data.body.reservation.order_type.title;
        this.data.orderDate = res.data.body.reservation.created_at;


        this.data.client_name = res.data.body.reservation.user.name;
        this.data.client_phone = res.data.body.reservation.user.phone;
        this.data.receiver_phone = res.data.body.reservation.receiver_phone;

        this.data.store_name = res.data.body.reservation.store.title;
        this.data.image.path = res.data.body.reservation.store?.logo;

        this.data.price = res.data.body.reservation.min_charge;
        // this.parents = res.data.body.reservation.additions;

        console.log(res.data.body.reservation)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "products create");
    // End:: Fire Methods

    this.getAllStores();
    this.getAllCategories();
    this.getDataToEdit()
  },
};
</script>

<style lang="scss" scoped>
.add_parent {
  text-align: center;

  i {
    font-size: 25px;
    cursor: pointer;

    color: #4CAF50
  }
}

.remove_minus {
  text-align: center;

  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}

.remove_minus_parent {
  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}
</style>