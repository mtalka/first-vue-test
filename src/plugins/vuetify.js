import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.blue.lighten1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      },
      dark: {
        primary: colors.blue.darken1,
      }
    }
  }
});
