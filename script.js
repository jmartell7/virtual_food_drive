 Vue.component('catalog-item', {
    props: ['item', 'section'],
    computed: {
	    itemClass: function() {
	        return this.item.inCart ? 'in_cart' : 'not_in_cart';
	    }				
    },
    template: '<div class="catalog_item" v-bind:class="itemClass" v-on:click="toggleItem(item, 1)"><img class="catalog_image product" v-bind:src=item.image><img class="catalog_image return-item" src="img/remove_img.png"><div class="price">${{ item.unit_price }}</div></div>',
    methods: {
		toggleItem(item) {
			if (item.inCart) {
				this.$root.removeItem(this.section, item)
			} else {
				this.$root.addItem(this.section, item)
				item.inCart = true;
			}
		}
    }
})
Vue.component('catalog-section', {
    props: ['section', 'name'],
    template: '<div v-show="section.shown"><div v-for="item in section.items"><catalog-item v-bind:item=item v-bind:section=name></catalog-item></div><div style="clear:both"></div></div>'
})
Vue.component('slideshow', {
    data: function () {
        return {
            images: [ "img/flowers1.png", "img/flowers2.png", "img/flowers3.png", "img/flowers4.png" ]
        }
    },
    template: '<b-carousel fade :interval="5000"><b-carousel-slide v-for="(image,index) in images" v-bind:key=image v-bind:img-src=image></b-carousel-slide></b-carousel>'
})
Vue.component('catalog', {
    props: ['catalog_data'],
    template: '<b-tabs><b-tab v-for="(section,name) in catalog_data.sections" :id=name v-bind:key=name v-if="section.shown"><catalog-section v-bind:section=section v-bind:name=name></catalog-section></b-tab></b-tabs>'
})		
Vue.component('cart-section', {
    props: ['name', 'section'],
    methods: {
        removeItem(item) {
            this.$root.removeItem(this.name, item)
        },
		addItem(item) {
			this.$root.addItem(this.name, item)
		},
		decrementItem(item){
			this.$root.decrementItem(this.name, item)
		}
    },
    template: '<tbody class="no-select-text"><tr><td colspan="4" class="section-name">{{name}}</td></tr><tr v-for="item in section"><td>{{item.name}}</td><td><b-icon v-on:click="decrementItem(item)" icon="dash-square-fill" aria-hidden="true" class="pointer-icon"></b-icon><div class="count">{{item.count}}</div><b-icon v-on:click="addItem(item)" icon="plus-square-fill" aria-hidden="true" class="pointer-icon"></b-icon></td><td>${{(item.unit_price * item.count).toFixed(2)}}</td><td><b-icon v-on:click="removeItem(item)" icon="trash-fill" aria-hidden="true" class="pointer-icon"></b-icon></td></tr></tbody>'
})
Vue.component('cart', {
    props: ['contents'],
    computed: {
	    checkoutUrl: function () {
			return "https://XXXX.salsalabs.org/virtualfooddrive/index.html?amount="+encodeURIComponent(this.total)+"&scf_message="+encodeURIComponent(this.message);
		},
        total: function () {
            t = 0
            Object.values(this.contents).forEach(section => {
                section.forEach(item => {
                    t += item.unit_price * item.count
                })
            })
            return t.toFixed(2);
        },
		message: function () {
			m = new Set()
            Object.values(this.contents).forEach(section => {
                section.forEach(item => {
					if (item.message) {
					   m.add(item.message)
					}
                })
            })
			if (m.size) {
				return Array.from(m).join("\n")			
			}
		}
    },
    methods: {
        clearCart() {
            this.$root.clearCart();
        }
	},
    template: '<div class="shopping-cart">Shopping Cart<table class="table"><tr><th>Item</th><th>Quantity</th><th colspan="2">Price</th></tr><template v-for="(section,name) in contents"><cart-section v-bind:name=name v-bind:section=section></cart-section></template></cart-item><tfoot><td colspan="2">Total</td><td colspan=2>${{total}}</td></tfoot></table><a v-bind:href=checkoutUrl target="_blank" class="btn btn-success btn-xl">Checkout</a><span v-bind:href=checkoutUrl v-on:click="clearCart()" class="btn btn-danger btn-xl">Clear Cart</span></div>'	
})

var app = new Vue({
    el: '#app',
    data: function () {
		showGiving = 1 > 2;
		data = {
        catalog_data: {
		    "sections": {
  		      "breakfast": {
  				  "items":[
  			        {
  			          "name": "Corn flakes",
  			          "case_price": "15.57",
  			          "size": "18 oz box",
  			          "unit_price": "1.29",
  			          "units_per_case": "12",
  			          "image": "img/food/cornflakes.png",
  					  "inCart": false,
  			        },
  			        {
  			          "name": "Shelf stable milk",
  			          "case_price": "10.75",
  			          "size": "8 oz ",
  			          "unit_price": "0.40",
  			          "units_per_case": "27",
  			          "image": "img/food/milk.png",
  					  "inCart": false			
  			        },
  			        {
  			          "name": "Peanut butter ",
  			          "case_price": "20.45",
  			          "size": "18 oz box",
  			          "unit_price": "1.70",
  			          "units_per_case": "12",
  			          "image": "img/food/peanutbutter.png",
  					  "inCart": false							
  			        },
  			        {
  			          "name": "Jelly",
  			          "case_price": "13.25",
  			          "size": "19 oz",
  			          "unit_price": "1.10",
  			          "units_per_case": "12",
  			          "image": "img/food/jelly.png",
  					  "inCart": false							
  			        },
  			        {
  			          "name": "Applesauce",
  			          "case_price": "16.4",
  			          "size": "14 oz",
  			          "unit_price": "0.68",
  			          "units_per_case": "24",
  			          "image": "img/food/applesauce.png",
  					  "inCart": false							
  			        },
  			        {
  			          "name": "Peaches",
  			          "case_price": "17.85",
  			          "size": "14 oz",
  			          "unit_price": "0.74",
  			          "units_per_case": "24",
  			          "image": "img/food/peaches.png",
  					  "inCart": false							
  			        }
  			      ],
				  "shown": showGiving
  			  },
  		      "lunch": {
  				  "items":[
					{
	  		          "name": "Carrots",
	  		          "case_price": "29.76",
	  		          "size": "5 oz",
	  		          "unit_price": "0.62",
	  		          "units_per_case": "48",
	  		          "image": "img/food/carrot.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Corn",
	  		          "case_price": "15.76",
	  		          "size": "15 oz",
	  		          "unit_price": "0.66",
	  		          "units_per_case": "24",
	  		          "image": "img/food/corn.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Peaches",
	  		          "case_price": "17.85",
	  		          "size": "14 oz",
	  		          "unit_price": "0.74",
	  		          "units_per_case": "24",
	  		          "image": "img/food/peaches.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Jelly",
	  		          "case_price": "13.25",
	  		          "size": "19 oz",
	  		          "unit_price": "1.10",
	  		          "units_per_case": "12",
	  		          "image": "img/food/jelly.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Baked beans",
	  		          "case_price": "13.4",
	  		          "size": "16 oz",
	  		          "unit_price": "0.56",
	  		          "units_per_case": "24",
	  		          "image": "img/food/bakedbeans.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Applesauce",
	  		          "case_price": "16.4",
	  		          "size": "14 oz",
	  		          "unit_price": "0.68",
	  		          "units_per_case": "24",
	  		          "image": "img/food/applesauce.png",
	  		          "inCart": false,
	  		        }
  			      ],
				  "shown": true,
  			  },
  		      "dinner": {
  				  "items":[
	  		        {
	  		          "name": "Corn",
	  		          "case_price": "15.76",
	  		          "size": "15 oz",
	  		          "unit_price": "0.66",
	  		          "units_per_case": "24",
	  		          "image": "img/food/corn.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Baked beans",
	  		          "case_price": "13.4",
	  		          "size": "16 oz",
	  		          "unit_price": "0.56",
	  		          "units_per_case": "24",
	  		          "image": "img/food/bakedbeans.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Applesauce",
	  		          "case_price": "16.4",
	  		          "size": "14 oz",
	  		          "unit_price": "0.68",
	  		          "units_per_case": "24",
	  		          "image": "img/food/applesauce.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Canned ham",
	  		          "case_price": "22",
	  		          "size": "16 oz",
	  		          "unit_price": "2.75",
	  		          "units_per_case": "8",
	  		          "image": "img/food/ham.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Ketchup",
	  		          "case_price": "6.35",
	  		          "size": "15 oz",
	  		          "unit_price": "0.53",
	  		          "units_per_case": "12",
	  		          "image": "img/food/ketchup.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Spaghetti noodles",
	  		          "case_price": "8.56",
	  		          "size": "1 lb",
	  		          "unit_price": "0.43",
	  		          "units_per_case": "20",
	  		          "image": "img/food/spaghetti.png",
	  		          "inCart": false,
	  		        }
  			      ],
				  "shown": true,
  			  },
  		      "specialty": {
  				  "items":[
	  		        {
	  		          "name": "Spaghetti noodles",
	  		          "case_price": "8.56",
	  		          "size": "1 lb",
	  		          "unit_price": "0.43",
	  		          "units_per_case": "20",
	  		          "image": "img/food/spaghetti.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Gas",
	  		          "case_price": "500",
	  		          "size": "",
	  		          "unit_price": "500",
	  		          "units_per_case": "125 gallons of gas",
	  		          "image": "img/food/gas.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Ketchup",
	  		          "case_price": "6.35",
	  		          "size": "15 oz",
	  		          "unit_price": "0.53",
	  		          "units_per_case": "12",
	  		          "image": "img/food/ketchup.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Feed a family of 4 for 1 week",
	  		          "case_price": "17",
	  		          "size": "",
	  		          "unit_price": "17",
	  		          "units_per_case": "32",
	  		          "image": "img/food/oneweek.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Feed a family of 4 for a month",
	  		          "case_price": "72",
	  		          "size": "",
	  		          "unit_price": "72",
	  		          "units_per_case": "72",
	  		          "image": "img/food/onemonth.png",
	  		          "inCart": false,
	  		        },
	  		        {
	  		          "name": "Feed a family of 4 for 1 year",
	  		          "case_price": "3000",
	  		          "size": "",
	  		          "unit_price": "876",
	  		          "units_per_case": "",
	  		          "image": "img/food/oneyear.png",
	  		          "inCart": false,
  			        }
  			      ],
				  "shown": true,
  			  },	
			}
        },
        contents: {},
        }
		return data;
	},
    methods: {
		decrementItem(section, item){
            if (!(section in this.contents)) {
                console.log("section not found");
				return;
            }
			count = item.count - 1;
			i2 = this.contents[section].findIndex(food => food.name === item.name);
            if (count <= 0) {
				item.inCart = false;
                this.contents[section].splice(i2, 1)
				if (this.contents[section].length === 0) {
					delete this.contents[section];
				}						
            } else {
				foo = this.contents[section][i2]
                foo.count = count;
                this.contents[section].splice(i2, 1, foo)
            }		
		},
        addItem(section, item) {
            if (!(section in this.contents)) {
                Vue.set(this.contents, section, [])
            }
            i2 = this.contents[section].findIndex(food => food.name === item.name)
            if (i2 >= 0) {
                foo = this.contents[section][i2]
				if (foo.count < 99) {
                	foo.count++
				}
                this.contents[section].splice(i2, 1, foo)
            } else {
                item.count = 1
                this.contents[section].push(item)
            }
        },
        removeItem(section, item) {
            if (!(section in this.contents)) {
                return
            }
            i2 = this.contents[section].findIndex(food => food.name === item.name)
            if (i2 >= 0) {
				item.inCart = false;
                this.contents[section].splice(i2, 1)
				if (this.contents[section].length === 0) {
					delete this.contents[section];
				}
            }
        },
		clearCart() {
			for (section in this.contents) {
				//empty out all the sections
				this.contents[section].map(food => {
					food.inCart = false;
					food.count = 0;							
				});
				let len = this.contents[section].length;
				this.contents[section].splice(0, len);
				delete this.contents[section];
			}
		}
    },
})
let cart = [];