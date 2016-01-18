/**
 * Implements hook_locale().
 */
function my_module_locale() {
  // Tell DrupalGap we have Thai translations to load.
  return ['th'];
}

/**
* Implements hook_menu().
*/





function my_module_menu() {
  var items = {};
  items['hello_world'] = {
    title: 'Fab Card',
    page_callback: 'my_module_hello_world_page'
  };
  
    
    items['exit'] = {
    title: 'exit',
    page_callback: 'my_module_exit_app'
  };
  
    items['hello_worlden'] = {
    title: 'Fab Card',
    page_callback: 'my_module_hello_world_page'
  };
  
    items['coupons'] = {
    title: t('Promotions'),
    page_callback: 'my_module_coupons_page'
  };
     items['couponsen'] = {
    title: 'Promotions',
    page_callback: 'my_module_coupons_page'
  };
  
      items['about'] = {
    title: t('About'),
    page_callback: 'my_module_about_page'
  };
  
  
  items['memberCarden'] = {
    title: 'Member Card',
    page_callback: 'my_module_memberCard_pageen'
  };
  
  items['memberCard'] = {
    title: t('Member Card'),
    page_callback: 'my_module_memberCard_page'
  };
  
    items['set_language/und'] = {
    title: 'Fab Card',
    page_callback: 'set_language_und'
  };
   items['set_language/th'] = {
    title: 'Fab Card',
    page_callback: 'set_language_th'
  };
  return items;
}

function my_module_memberCard_pageen() {
	return my_module_memberCard_page();
}

function my_module_exit_app() {
	navigator.app.exitApp()
}

function my_module_memberCard_page() {  
$.ajax({
      url: Drupal.settings.site_path + '/fcgetprofile',
      type: 'post',
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('page_login_submit - failed to login');
      },
      success: function (node) {
//       alert("Loaded " + node.title);
	   
	var theDiv = document.getElementById("memberCard" + Drupal.settings.language_default);
//	theDiv.setAttribute('style', ' position: relative; ' + ($(window).width() < 400 ?  'transform: rotate(90deg);' : '') +'transform-origin: 50% 30%; width: 400px; height: 450px'); //transform: rotate(90deg);
//	theDiv.setAttribute('style', 'height: 400px; position: relative;  width: 400px'); //transform: rotate(90deg);
	theDiv.setAttribute('style', ' position: relative;	overflow:auto; height: 400px; width:400px');
	var elm = document.createElement("img");
	elm.src = 'images/membercard.png';
	theDiv.appendChild(elm);
	el_span = document.createElement('span');
	elm = document.createTextNode( node.memberid);
	el_span.setAttribute('style', 'position: absolute;top: 141px; left: 212px;'); 
	theDiv.appendChild(el_span);
	el_span.appendChild(elm);

	
	el_span = document.createElement('span');
	elm = document.createTextNode( node.firstname + ' ' + node.lastname);
	el_span.setAttribute('style', 'position: absolute;top: 85px; left: 212px;'); 
	theDiv.appendChild(el_span);
	el_span.appendChild(elm);

	el_span = document.createElement('span');
	el_span.setAttribute('style', 'position: absolute;top: 195px; left: 212px;'); 	
	var d = node.expiration.split(' ')[0].split('-');  
	elm = document.createTextNode( d[2]+'/'+d[1]+'/'+d[0]);
	theDiv.appendChild(el_span);
	el_span.appendChild(elm);
      }
  });
  
     return '<div id="memberCard' + Drupal.settings.language_default + '"></div>'; 
}

function my_module_about_page() {
     return 'Fabcard Mobile application version 0.4.0<br><br>Fab Card was created with the purpose of providing the best in <i>Face and Body</i> services, by supporting the industry, by promoting the best providers, and passing on benefits to our members.'+
 '<br><br>Produced by <a href="http://www.wctcoltd.com/">ClipCubeMedia.com</a><br><br>Copyright &#169;  Fabcard Asia Co’, Ltd. 2016';	
}	
	


/**
 * The page callback to display the view.
 */
function my_module_coupons_page() {
  try {
    var content = {};
    content['my_coupons_list'] = {
      theme: 'view',
      format: 'ul',
      path: '/promotions-for-mobile', /* the path to the view in Drupal */
      row_callback: 'my_module_coupons_list_row',
      empty_callback: 'my_module_coupons_list_empty',
      attributes: {
        id: 'my_coupons_list_view' + Drupal.settings.language_default
      }
    };
    return content;
  }
  catch (error) { console.log('my_module_coupons_page - ' + error); }
}

/**
 * The row callback to render a single row.
 */
function my_module_coupons_list_row(view, row) {
  try {
    return l('<span style="margin-left: auto;    margin-right: auto;">'  + row.title + '<br>' + '<img src="' + row.field_promotion_image.src + '"><br>' + row.body +'</span>', Drupal.settings.site_path + '/node/' + row.nid, { InAppBrowser: true }); 
  }
  catch (error) { console.log('my_module_coupons_list_row - ' + error); }
}

/**
 *
 */
function my_module_coupons_list_empty(view) {
  try {
    return 'Sorry, no promotions were found.';
  }
  catch (error) { console.log('my_module_coupons_list_empty - ' + error); }
}

/**
 * Implements hook_form_alter().
 */
function my_module_form_alter(form, form_state, form_id) {
  try {
    if (form_id == 'user_login_form') { 
     delete form.buttons['create_new_account'];
    }

  }
  catch (error) { console.log('my_module_form_alter - ' + error); }
}

/**
* The callback for the "Hello World" page.
*/
function my_module_hello_world_page() {
	
//	var theDiv = document.getElementById("contentDiv");
//	theDiv.setAttribute('style', 'height: 500px');
  var content = {};
  if (Drupal.user.uid == 0) {
	content['my_button'] = {
    theme: 'button_link',
    text: t('Login'),
    path: 'user/login'
  };
  content['register'] = {
    theme: 'button_link',
    text: t('Register with Fab Card'),
    path: 'http:\\www.fabcardasia.co.th',
	options: {
    InAppBrowser:true
  }
  }}
  else {
	  
  content['memberCard'] = {
  theme: 'button',
  text: t('Member Card'),
  attributes: {
    onclick: " drupalgap_goto((Drupal.settings.language_default =='und') ? 'memberCarden' : 'memberCard');" 
  }	  
}; 	  
  content['my_button_link'] = {
  theme: 'button_link',
  text: t('Promotions'),
  path: (Drupal.settings.language_default =='und') ? 'couponsen' : 'coupons' 
  }
  
  content['fabcard_site'] = {
  theme: 'button_link',
  text: t('Fab Card Asia Site'),
  path: 'http://fabcardasia.co.th',
  options: {
    InAppBrowser:true
  }
  }

  
  };
  content['toggle_language'] = {
  theme: 'button',
  text: (Drupal.settings.language_default!='und') ? 'English' : 'ภาษาไทย',
  attributes: {
    onclick: "Drupal.settings.language_default = (Drupal.settings.language_default =='und') ? 'th' : 'und'; drupalgap_goto((Drupal.settings.language_default =='und') ? 'hello_worlden' : 'hello_world');"  //, {reloadPage:true}
  }
}; 
  return content;
}