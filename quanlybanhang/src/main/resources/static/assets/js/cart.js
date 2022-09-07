// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(productId,productImg,productName,productPrice,count) {
	  this.productId = productId;
      this.productImg = productImg;
      this.productName = productName;
      this.productPrice = productPrice;
      this.count = count;
    }
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(productId,productImg,productName,productPrice,count) {
      for(var item in cart) {
        if(cart[item].productName === productName) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }      
      var item = new Item(productId,productImg,productName,productPrice,count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(productName, count) {
      for(var i in cart) {
        if (cart[i].productName === productName) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(productName) {
        for(var item in cart) {
          if(cart[item].productName === productName) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(productName) {
      for(var item in cart) {
        if(cart[item].productName === productName) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].productPrice * cart[item].count;
      }
      return Number(totalCart.toFixed(2));      
    }
  	
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.productPrice * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  	
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart-link').click(function(event) {
    event.preventDefault();
    const product = event.target.parentElement.parentElement.parentElement; 
    var productId = event.target.getAttribute('data-id');
	var productImg = product.querySelector("img").src;
	var productName = product.querySelector("H2").innerText;
	var productPrice = product.querySelector("ins").innerHTML;
    shoppingCart.addItemToCart(productId,productImg,productName,productPrice, 1);
    displayCart();
  });
  $('.add_to_cart_button').click(function(event) {
    event.preventDefault();
    const product = event.target.parentElement.parentElement.parentElement;
    var productId = event.target.getAttribute('data-id');
	var productImg = product.querySelector("img").src;
	var productName = product.querySelector("H2").innerText;
	var productPrice = product.querySelector("ins").innerHTML;
    shoppingCart.addItemToCart(productId,productImg,productName,productPrice, 1);
    displayCart();
  });
  $('.add-to-cart-detail').click(function(event) {
    event.preventDefault();
    const product = event.target.parentElement.parentElement.parentElement.parentElement;
    var productId = event.target.getAttribute('data-id');
    var productImg = product.querySelector("img").src;
	var productName = product.querySelector("H2").innerText;
	var productPrice = product.querySelector("ins").innerHTML;
	shoppingCart.addItemToCart(productId,productImg,productName,productPrice, 1);
    displayCart();
  });
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {	
    var cartArray = shoppingCart.listCart();    
    var output = "";   
    var stt = 0;
    var listId = [];    
    for(var i in cartArray) {
		stt++;
		listId.push(cartArray[i].productId);
      output += "<tr>"
      			+ "<td><input type='hidden' name='id' value="+cartArray[i].productId+">"+ +stt+ "</td>"
      			+ "<td class='name'>" +cartArray[i].productName+"</td>"
      			+ "<td><img style='width:30px' src=" +cartArray[i].productImg+ " alt=''></td>"
      			+ "<td class='price'>" +cartArray[i].productPrice+ "$</td>"
      			+ "<td><div class='input-group'><button class='minus is-form' data-name='" + cartArray[i].productName + "'>-</button>"
		      	+ "<input type='number' class='input-qty' data-name='" + cartArray[i].productName + "' value='" + cartArray[i].count + "'>"
		      	+ "<button class='plus is-form' data-name='" + cartArray[i].productName + "'>+</button></div></td>"
		      	+ "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].productName + "'>X</button></td>"
		      	+ " = " 
		      	+ "<td>" + cartArray[i].total + "$</td>"
                + "</tr>;"		
    }
    var button = '<input type="hidden" value="'+listId+'" id="list" name="list" class="button alt">' 
    $('.show-cart').html(output);
    $('.list').html(button);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
    
  }
  
  // Delete item button  
  $(".show-cart").on("click", ".delete-item", function (event) {
  var productName = $(this).data('name')
  shoppingCart.removeItemFromCartAll(productName);
  displayCart();
  
});
  
  // -1
  $('.show-cart').on("click", ".minus", function(event) {
    var productName = $(this).data('name')
    shoppingCart.removeItemFromCart(productName);
    displayCart();
 })
  // +1
  $(".show-cart").on("click", ".plus", function (event) {
  const product = event.target.parentElement.parentElement.parentElement; 
  var productId = event.target.getAttribute('data-id');
  var productName = $(this).data('name');
  var productImg = product.querySelector('img').src;
  var productPrice = product.querySelector(".price").innerText;
  shoppingCart.addItemToCart(productId,productImg,productName,productPrice);
  displayCart();
});
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var productName = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(productName, count);
    displayCart();
  });  
  displayCart();
  $('#checkout').submit(function (e) {
    // prevent form submission
    e.preventDefault();
    var thisForm = $(e.currentTarget);
    $.ajax({
        // simulate form submission
        type: thisForm.attr('method') || 'POST',
        url: thisForm.attr('action') || window.location.href,
        data: thisForm.serialize(thisForm.data())
        
    })
    .always(function () {
        // when it is done submitting data to the server, redirect
        shoppingCart.clearCart();
    	displayCart();
        window.location.replace("/home");
        
    });
});