import env from '../../env';

const dados = {
  data () {
    return {
      site_key: env.KEY_CAPTCHA,
      token: '',
    };
  },

  methods: {
    onCaptchaVerified (token) {
      this.token = token;
    },

    onCaptchaExpired () {
      this.$refs.recaptcha.reset();
      this.token = '';
    },
  },
};
export default dados;
