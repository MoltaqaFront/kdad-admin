import axios from "axios";

export default {
  // Start:: Get System Global Permissions (WIll Be Used For Creating Role Crud)
  // async getAllSystemPermissions(context) {
  //   try {
  //     let res = await axios({
  //       method: "GET",
  //       url: `core/check-abilities`,
  //     });
  //     context.commit("setAllSystemPermissions", res.data.data.abilities);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // },
  // End:: Get System Global Permissions (WIll Be Used For Creating Role Crud)

  // Start:: Get Authed User Permissions  (WIll Be Used For Conditional Rendering Side Menu)
  async getAuthedUserPermissions(context) {
    try {
      let res = await axios({
        method: "GET",
        url: `core/check-abilities`,
      });
      context.commit("setAuthedUserPermissions", res.data.data.abilities);
      console.log( res.data.data.abilities)
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  // End:: Get Authed User Permissions  (WIll Be Used For Conditional Rendering Side Menu)

  // Start:: Check User Permissions For Each Route
  async checkRoutePermissions(_, payload) {
    try {
      await axios({
        method: "GET",
        url: `admin/check-permission`,
        params: {
          name: payload,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  // End:: Check User Permissions For Each Route
};
