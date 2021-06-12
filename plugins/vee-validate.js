import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

VeeValidate.extend("required", {
  ...rules.required,
  message: "กรอกข้อมูลให้ครบถ้วน"
});

VeeValidate.extend('email', rules.email );

VeeValidate.extend('confirmed',{
    ...rules.confirmed,
    message: "Password does not match"
})

VeeValidate.extend("alpha", {
  ...rules.alpha,
  message: "This field must only contain alphabetic characters"
});

// Export
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
