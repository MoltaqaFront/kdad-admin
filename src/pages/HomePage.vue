<template>
  <div class="home_page_wrapper">
    <!-- <ComingSoon /> -->

    <div class="statics mt-4">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12" v-for="(value, key) in statics" :key="'i' + key">
          <div class="box">
            <div class="icon">
              <i v-if="key === 'clientProviderCount'" class="fas fa-user-tie"></i>
              <i v-else-if="key === 'client'" class="fas fa-user-tie"></i>
              <i v-else-if="key === 'provider'" class="fas fa-user-tie"></i>
              <i v-else-if="key === 'orders'" class="fas fa-file-invoice"></i>
              <i v-else-if="key === 'runningOrders'" class="fas fa-file-invoice"></i>
              <i v-else-if="key === 'deliveredOrders'" class="fas fa-file-invoice-dollar"></i>
              <i v-else-if="key === 'declinedOrders'" class="fad fa-window-close"></i>
              <i v-else-if="key === 'todayIncome'" class="fas fa-thumbs-up"></i>
              <i v-else-if="key === 'realIncome'" class="fas fa-baby-carriage"></i>
              <i v-else-if="key === 'services'" class="fas fa-chalkboard-teacher"></i>
              <i v-else-if="key === 'totalWithdraws'" class="fas fa-clipboard-check"></i>
              <i v-else class="fas fa-chart-line"></i>
            </div>
            <div class="info_box">
              <span v-if="key === 'clientProviderCount'">{{ $t('PLACEHOLDERS.clientProviderCount') }}</span>
              <span v-else-if="key == 'client'">{{ $t('PLACEHOLDERS.client_ask') }}</span>
              <span v-else-if="key === 'provider'">{{ $t('PLACEHOLDERS.provider_ask') }}</span>
              <span v-else-if="key === 'orders'">{{ $t('PLACEHOLDERS.newOrders') }}</span>
              <span v-else-if="key === 'runningOrders'">{{ $t('PLACEHOLDERS.canceldOrders') }}</span>
              <span v-else-if="key === 'deliveredOrders'">{{ $t('PLACEHOLDERS.deliveredOrders') }}</span>
              <span v-else-if="key === 'declinedOrders'">{{ $t('PLACEHOLDERS.declinedOrders') }}</span>
              <span v-else-if="key === 'todayIncome'">{{ $t('PLACEHOLDERS.todayIncome') }}</span>
              <span v-else-if="key === 'realIncome'">{{ $t('PLACEHOLDERS.realIncome') }}</span>
              <span v-else-if="key === 'services'">{{ $t('PLACEHOLDERS.services') }}</span>
              <span v-else-if="key === 'totalWithdraws'">{{ $t('PLACEHOLDERS.totalWithdraws') }}</span>
              <p class="number_box">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";

export default {
  name: "HomePage",

  components: {
    ComingSoon
  },

  data() {
    return {

      statics: {
        clientProviderCount: null,
        client: null,
        provider: null,
        orders: null,
        runningOrders: null,
        deliveredOrders: null,
        declinedOrders: null,  
      }
    };
  },

  methods: {

    async getStatics() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/home"
        });

        // console.log("All Data ==>", res.data.data);
        this.statics = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows


  },

  mounted() {

    this.getStatics()

  },
};
</script>

<style lang="scss" scoped>
.home_page_wrapper {
  position: relative;

  min-height: 500px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;

  .statics {
    .box {
      background: #7635d1;
      padding: 25px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .icon {
          background: #7635d1;
          color: #FFF
        }

        .info_box {

          span,
          p.number_box {
            color: #000
          }
        }
      }

      .icon {
        height: 60px;
        min-width: 60px;
        width: 60px;
        border-radius: 60px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px
        }
      }

      .info_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        span {
          font-size: 19px;
          color: #FFF;
        }

        p.number_box {
          font-size: 30px;
          color: #FFF;
          font-weight: bold;
        }
      }
    }
  }
}
</style>