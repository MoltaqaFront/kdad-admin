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

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderNumber')" v-model.trim="data.id"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderStatus')" v-model.trim="data.status"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Products.created_at')" v-model.trim="data.orderDate"
            disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.Shipment_data') }}</h4>
          </div>
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_cat')" v-model.trim="data.shipment_type"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_subcat')"
            v-model.trim="data.shipment_sub_type" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_length')"
            v-model.trim="data.Shipment_length" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_width')"
            v-model.trim="data.Shipment_width" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_weight')"
            v-model.trim="data.Shipment_weight" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_height')"
            v-model.trim="data.Shipment_height" disabled />
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" v-if="data.image.path" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" disabled />
          <!-- End:: Image Upload Input -->
          <base-input col="12" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.Shipmen_desc')"
            v-model.trim="data.Shipmen_desc" disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.Shipment_loading_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_loading_date')"
            v-model.trim="data.Shipment_loading_date" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_loading_time')"
            v-model.trim="data.Shipment_loading_time" disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.Shipment_from') }}</h4>
          </div>
          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place" disabled />
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  @click="handleMapClick" :options="mapOptions" />
              </div>
            </div>
          </div>



          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.Shipment_delivery_data') }}</h4>
          </div>
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_delivery_date')"
            v-model.trim="data.delivered_at_date" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Shipment_delivery_time')"
            v-model.trim="data.delivered_at_time" disabled />

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.Shipment_to') }}</h4>
          </div>
          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place_dest"
            disabled />
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  @click="handleMapClick" :options="mapOptions" />
              </div>
            </div>
          </div>

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.car_data') }}</h4>
          </div>
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_type')" v-model="data.car_type"
            disabled />
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_modal')" v-model="data.car_modal"
            disabled />
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_serial')" v-model="data.car_serial"
            disabled />
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" v-if="data.image_car_plate.path" identifier="image"
            :preSelectedImage="data.image_car_plate.path" :placeholder="$t('PLACEHOLDERS.image')" disabled />
          <!-- End:: Image Upload Input -->

          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.driver_data') }}</h4>
          </div>
          <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.driverName')" v-model="data.driver_name"
            disabled />
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" v-if="data.image_prov.path" identifier="image"
            :preSelectedImage="data.image_prov.path" :placeholder="$t('PLACEHOLDERS.image')" disabled />
          <!-- End:: Image Upload Input -->


          <!-- <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.location_address') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')"
            v-model.trim="data.address_location_from" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')"
            v-model.trim="data.address_location_to" disabled /> -->


          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.client_data') }}</h4>
          </div>

          <base-input col="12" type="text" :placeholder="$t('TABLES.Clients.name')" v-model.trim="data.client_name"
            disabled />



          <div class="form_title_wrapper">
            <h4>{{ $t('PLACEHOLDERS.price_data') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.payment_method_brand')"
            v-model="data.payment_method_brand" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Services.price')" v-model="data.price" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_discount')" v-model="data.discount" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Offers.priceAfterDiscount')" v-model="data.finalPrice" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.taxPercentage')" v-model="data.vat" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.comment')" v-model="data.comment" disabled />
          <RatingPreview  :rate="+data.providerRate" :size="15" />



          <div class="form_title_wrapper" v-if="status_key == 'rejected'">
            <h4>{{ $t('PLACEHOLDERS.reason_reject') }}</h4>
          </div>

          <base-input v-if="status_key == 'rejected'" col="6" rows="6" type="textarea" disabled
            :placeholder="$t('PLACEHOLDERS.reason')" v-model="reason_reject" required />


        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import RatingPreview from "@/components/ui/RatingPreview.vue";
export default {
  name: "CreateProduct",
  components: {
    RatingPreview,
  },

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

        shipment_type: null,
        shipment_sub_type: null,
        Shipment_length: null,
        Shipment_width: null,
        Shipment_weight: null,
        Shipment_height: null,
        Shipment_loading_date: null,
        Shipment_loading_time: null,
        Shipmen_desc: null,
        car_type: null,
        car_modal: null,
        car_serial: null,
        image: {
          path: null,
          file: null,
        },
        delivered_at_date: null,
        delivered_at_time: null,

        // address location
        address_location_from: null,
        address_location_to: null,

        image_prov: {
          path: null,
          file: null,
        },

        image_car_plate: {
          path: null,
          file: null,
        },

        // client info

        client_name: null,
        client_phone: null,
        receiver_phone: null,

        // driver info

        driver_name: null,
        driver_phone: null,

        category: null,
        storeType: null,

        payment_method_brand: '',
        price: '',
        discount: '',
        finalPrice: '',
        vat: '',
        providerRate: '',
        comment: ''

      },

      mapOptions: {
        zoomControl: false, // Disable the default zoom control
        disableDoubleClickZoom: true, // Disable zooming on double-click
        draggable: false, // Disable dragging the map
        clickableIcons: false, // Disable clickable icons on the map
        // More options can be added if required
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
      allCategories: [],

      status_key: null,
      reason_reject: null,

      // google maps
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      markers: [],
      AllCategories: [],

      Latitude: '',
      Longitude: '',
      Radius: '',
      place: '',
      selectedDays: [],
      // End:: Data Collection To Send

      // ================================================= //
      // google maps
      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      markers: [],
      AllCategories: [],

      Latitude_dest: '',
      Longitude_dest: '',
      Radius: '',
      place_dest: '',

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
          url: `modules/order/${this.$route.params.id}`,
        });



        // order info
        this.data.id = res.data.data.id;
        this.data.status = res.data.data.status.name;
        this.data.orderDate = res.data.data.created_at;


        this.data.shipment_type = res.data.data.shipment_type;
        this.data.shipment_sub_type = res.data.data.shipment_sub_type;
        this.data.Shipment_length = res.data.data.length;
        this.data.Shipment_width = res.data.data.width;
        this.data.Shipment_weight = res.data.data.weight;
        this.data.Shipment_height = res.data.data.height;
        this.data.image.path = res.data.data.image;
        this.data.Shipmen_desc = res.data.data.description;

        this.data.Shipment_loading_date = res.data.data.load_at_date;
        this.data.Shipment_loading_time = res.data.data.load_at_time;

        this.data.delivered_at_date = res.data.data.delivered_at_date;
        this.data.delivered_at_time = res.data.data.delivered_at_time;

        this.place = res.data.data.source_address;
        this.Latitude = res.data.data.source_latitude;
        this.Longitude = res.data.data.source_longitude;

        this.place_dest = res.data.data.destination_address;
        this.Latitude_dest = res.data.data.destination_latitude;
        this.Longitude_dest = res.data.data.destination_longitude;

        this.data.driver_name = res.data.data.provider.name;
        this.data.image_prov.path = res.data.data.provider.avatar;

        this.data.payment_method_brand = res.data.data.payment_method;
        this.data.price = res.data.data.main_price;
        this.data.discount = res.data.data.discount;
        this.data.finalPrice = res.data.data.finalPrice;
        this.data.vat = res.data.data.vat;
        this.data.comment = res.data.data.providerReview;
        this.data.providerRate = res.data.data.providerRate;


        this.data.car_type = res.data.data.car.carType.title;
        this.data.car_modal = res.data.data.car.carCategory.title;
        this.data.car_serial = res.data.data.car.board_number;
        this.data.image_car_plate.path = res.data.data.car.image;

        this.data.client_name = res.data.data.client.name;

        this.data.address_location_from = res.data.body.order.fast_addresses.from;
        this.data.address_location_to = res.data.body.order.fast_addresses.to;


        this.data.image.path = res.data.body.order.store?.logo;

        this.status_key = res.data.body.order.status_key;
        this.reason_reject = res.data.body.order.last_status.reason;

        this.parents = res.data.body.order.order_items;

        console.log(res.data.body.order.status_key)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // google maps

    handleMapClick(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.markers.push({
            position: { lat, lng }
          });
        }
      });
    },

    calculateDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Radius of the earth in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLng = this.deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    handleMarkerClick(index) {
      console.log('Marker clicked:', index);
    },

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.center = marker;
        this.currentPlace = null;
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

.crud_form_wrapper .form_title_wrapper h4 {
  margin-top: 20px;
}
</style>