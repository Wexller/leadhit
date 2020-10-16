<template>
  <div class="form-block">
    <h1>LeadHit</h1>
    <form class="form-signin" @submit.prevent="formSubmitHandler">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-label-group">
        <label for="inputId">ID сайта</label>
        <input type="text"
               id="inputId"
               class="form-control"
               :class="{'is-invalid' : !isIdValid}"
               autofocus=""
               @input="inputHandler"
               v-model="siteId"
        >
        <div class="invalid-feedback" v-if="!isIdValid">id сайта должен содержать 24 символа</div>
      </div>

      <div class="submit-button-block">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
        <div class="loader" v-if="isLoading">
          <Loader/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Loader from '../components/Loader';

  const SITE_ID_LENGTH = 24;

  export default {
    name: "Auth",
    components: {Loader},
    data: () => ({
      siteId: '',
      isIdValid: true,
      isLoading: false
    }),
    methods: {
      inputHandler() {
        if (!this.isIdValid) {
          this.isIdValid = true;
        }
      },
      formSubmitHandler() {
        this.isIdValid = this.siteId.length === SITE_ID_LENGTH;

        if (!this.isIdValid) return false;

        this.clientRequest();
      },
      async clientRequest() {
        const headers = {
          'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          'Leadhit-Site-Id': this.siteId
        };

        const url = 'https://track-api.leadhit.io/client/test_auth';

        this.isLoading = true;

        // Получение данных с сервера
        const response = await fetch(url, {headers});
        const data = await response.json();
        this.isLoading = false;

        if (data.message === 'ok') {
          localStorage.setItem('leadhit-site-id', this.siteId);
          await this.$router.push('/analytics');
        }
      }
    }
  }
</script>

<style scoped>
  .form-block {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding-top: 40px;
    padding-bottom: 40px;

    min-width: 100vw;
    min-height: 100vh;
  }

  .form-signin {
    width: 100%;
    max-width: 520px;
    padding: 70px 100px;
    margin: auto;

    border: 1px solid #f3f2f2;
    border-radius: 12px;
    background-color: aliceblue;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .form-title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .form-label-group {
    margin-bottom: 1rem;
  }

  .submit-button-block {
    position: relative;
  }

  .loader {
    position: absolute;
    width: 50px;
    height: 50px;

    right: 0;
    top: 50%;
    transform: translate(120%, -50%);
  }
</style>