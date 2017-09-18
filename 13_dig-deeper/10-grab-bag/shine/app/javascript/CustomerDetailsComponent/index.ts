import { Component }      from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Http }           from "@angular/http";
import                         "rxjs/add/operator/map";
import   template         from "./template.html";
import { AjaxFailureHandler } from "AjaxFailureHandler";

var CustomerDetailsComponent = Component({
  selector: "shine-customer-details",
  template: template,
  providers: [
    AjaxFailureHandler
  ]
}).Class({
  constructor: [
    ActivatedRoute,
    Http,
    AjaxFailureHandler,
    function(activatedRoute,http,ajaxFailureHandler) {
      this.activatedRoute     = activatedRoute;
      this.http               = http;
      this.ajaxFailureHandler = ajaxFailureHandler;
      this.id                 = null;
      this.customer           = null;
    }
  ],
  ngOnInit: function() {
    var self = this;
    var parseCustomer = function(response) {
      var customer = response.json().customer;

      customer.billing_address = {
        street:  customer.billing_street,
        city:    customer.billing_city,
        state:   customer.billing_state,
        zipcode: customer.billing_zipcode
      };

      customer.shipping_address = {
        street:  customer.shipping_street,
        city:    customer.shipping_city,
        state:   customer.shipping_state,
        zipcode: customer.shipping_zipcode
      };

      return customer;
    }
    var routeSuccess = function(params) {
      var observable = self.http.get(
        "/customers/" + params["id"] + ".json"
      );
      var mappedObservable = observable.map(parseCustomer)

      mappedObservable.subscribe(
        function(customer) { self.customer = customer; },
        self.ajaxFailureHandler.handler()
      );
    }
    self.activatedRoute.params.subscribe(routeSuccess,self.ajaxFailureHandler.handler());
  },
  saveCustomerField: function(field_name, value) {
    var update = {};
    update[field_name] = value;
    this.http.patch(
      "/customers/" + this.customer.customer_id + ".json", update
    ).subscribe(
      function() {},
      function(response) {
        window.alert(response);
      }
    );
  },
  saveCustomer: function(update) {
    this.saveCustomerField(update.field_name, update.value);
  },
  saveShippingAddress: function(update) {
    this.saveCustomerField("shipping_" + update.field_name, update.value);
  },
  saveBillingAddress: function(update) {
    this.saveCustomerField("billing_" + update.field_name, update.value);
  }
});
export { CustomerDetailsComponent };
