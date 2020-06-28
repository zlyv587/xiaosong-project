export default {
  computed: {
    name () {
      return this.$store.state.userInfo.name
    }
  },
  methods: {
    handleCommand (command) {
      this.$store.mutations.REMOVE_TOKEN();
      this.$router.push('/login');
    }
  }
};
