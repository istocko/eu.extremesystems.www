var pages = ['homepage','company','contact','products','portfolio'];
var actual_page = -1;
var page_timeout=2500;
var timer_enabled = false;
var ttimeout;


var footer_extra_bottom = 389; //default as firefox

function setup_ff()
{
	footer_extra_bottom = 389;
}


function setup_ch()
{
	footer_extra_bottom = 385;
}

detectBrowser();

function detectBrowser(){
  var val = navigator.userAgent.toLowerCase();
  if(val.indexOf("firefox") > -1)
  {
	setup_ff();
  }
  else if(val.indexOf("chrome") > -1)
  {
	setup_ch();
  }
  else if(val.indexOf("opera") > -1)
  {
  }
  else if(val.indexOf("msie") > -1)
  {
  }
  else if(val.indexOf("safari") > -1)
  {
  }
};


function isDevelopment(){
   if (location.hostname == 'extremesystems.eu.local') 
      return true; 
   else 
      return false;
}

var __development = isDevelopment();

function sliderPages(){
    if (!in_page && timer_enabled) {
        console.info("slide");
    actual_page++;
    if (actual_page>=pages.length) {
        actual_page=0;
    }
    for (i=0;i<pages.length;i++) {
        //salert(pages[i]);
        //console.info('page clear '+pages[i]);
        page_name = "page_"+pages[i];
        document.getElementById(page_name).style.display='none';    
    }
    document.getElementById("page_"+pages[actual_page]).style.display='block';
    if (timer_enabled && !in_page) ttimeout=setTimeout("sliderPages()",page_timeout);
    } else {
        ttimeout = null;
    }
}
var in_page=false;
function page_over(){
    /*
    in_page=true;
    console.info("page over");
    //if (!timer_enabled) {
        timer_enabled=false;
        ttimeout=null;
   // }
   */
}

function page_out(){
    /*in_page=false;
    console.info("page out");
    
    if (!timer_enabled) {
        console.info("start slider");
        timer_enabled=true; 
        sliderPages();
    }
    */
}

function init() {
    websitePrependStart();
    preload();
        imagepreloadcounter=0;
    preload(true);
    
    /*
    timer_enabled = true;
    sliderPages();
    */
    //document.getElementById("page_company").style.display='block';
    //document.getElementById("page_linux_esji").style.display='block'; 
    //closeAllLinuxTabs();
    var section=getHash();
    //console.info(section);
    switch (section) {
            case 'linux': showLinuxESJI();break;
            case 'products' : showProducts(); break;
	    case 'contact':
            case 'job-offers': showContact();break;
            case 'portfolio': showPortfolio();break;
            case 'project-pizza-odin': showppage_pizza_odin();break;
            case 'project-cap': showppage_cap();break;
            case 'project-tesla-porsche-videogame': showppage_tvp();break;
	    case 'ugrid': showHomeNetworkWeb();break;
	    case 'storage': showHomeStorage();break;
	    case 'btc-ivk':
            case 'project-binary-cost-technology': showppage_bct();break;
	    case 'company-team': showppage_companyteam();break;
            default: 
                showHomepage();
                //showPortfolio();endisWeb();
                break;
    }
    /*if (section=='linux') {
        showLinuxESJI();
    } else {
        //showCompany();
        showHomepage();
    }*/
    
    
    
}
window.onload = init;
debug =false;

function getHash() {
  var hash = window.location.hash;
  return hash.substring(1); // remove #
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

 function websitePrependStart(){
        $("#preloader-main").css("display","block");
        $("#wrapper").css("display","none");
   }

function websiteStart(){
        $("#preloader-main").css("display","none");
        
        $("#wrapper").css("opacity","0.0");
        $("#wrapper").css("display","block");
       
        $("#wrapper").animate(
                         {
                          opacity: 1.0,
                         },2000,function(){
                         });
        
        
   }
   
  
   
   var allresourcesloaded = false;
   
   //prelaoder resources: images
   //if (!debug) {
   document.write('<div id="preloader">');
   document.write('</div>');
   //}

var imagespreloadinbackground = ['linux/bot.jpg','linux/top.jpg','linux/mid.jpg'];
var imagespreload = ['linux_es.png','access_username.png','portfolio.png','small_linux_es.png','res/images/storage_icon.png','res/images/payments_icon.png','res/images/photo_icon.png','res/images/visualization_icon.png','res/images/products_icon.png','res/images/network_icon.png','access_password.png','company.png','access_field.png','products.png','logo.png','homepage.png','contact.png','hpb.jpg'];

var imagepreloadcounter=0;
   
   function preload(inbackground) {
       var imagesarray;
       if (inbackground) {
           imagesarray = imagespreloadinbackground;
       } else {
           imagesarray = imagespreload;
       }
       //if (debug) console.info("preload image "+imagepreloadcounter+". "+imagespreload[imagepreloadcounter]);
       var image=$('<img />')
        .attr('src',imagesarray[imagepreloadcounter])
        .attr('height',1)
        .attr('width',1)
        .load(function(){
            $("#preloader").append($(this));
            imagepreloadcounter++;
            percento = (imagepreloadcounter*100)/imagesarray.length;
            //if (debug) sleep(2000);
            if (!inbackground) setProgress(percento);
            //if (debug) console.info('set percento ' + percento);
            if (imagepreloadcounter<imagesarray.length){
                    if (inbackground)
                        preload(true)
                    else
                        preload();
            }
                else {
                    if (debug) console.info("preload finished");
                    if (!inbackground) {
                       websiteStart();
                    } else {
                        allresourcesloaded = true;
                    }
                }
            });
   }
   
   function setProgress(percento) {
       var color;
       if (percento<33) {
           color='red';
       } else if (percento<66) {
           color='blue';
       } else if (percento<100) {
           color='green';
       }  
       $("#preloader-main #progressbar #progress").css("background-color",color);
       $("#preloader-main #progressbar #progress").css("width",percento+"%");   
   }

function closeAllMainContents() {
       document.getElementById("page_contact").style.display='none';
    document.getElementById("page_company").style.display='none';
    document.getElementById("page_products").style.display='none';
    document.getElementById("page_portfolio").style.display='none';
    document.getElementById("page_homepage").style.display='none';
    document.getElementById("page_linux_esji").style.display='none';
    document.getElementById("ppage_pizza_odin").style.display='none';
    document.getElementById("ppage_cap").style.display='none';
    document.getElementById("ppage_tvp").style.display='none';
    document.getElementById("ppage_bct").style.display='none';
}

function closeAllLinuxTabs() {
          document.getElementById("lesji_services").style.display='none';
          document.getElementById("lesji_why").style.display='none';
          document.getElementById("lesji_references").style.display='none';
}

function closeAllCompanyTabs() {
    document.getElementById("cesji_company").style.display='none';
    document.getElementById("cesji_news").style.display='none';
    document.getElementById("cesji_team").style.display='none';
}

function closeAllProductsTabs() {
    document.getElementById("pesji_companyproducts").style.display='none';
    document.getElementById("pesji_development").style.display='none';
    document.getElementById("pesji_support").style.display='none';
}

function closeAllTVPTabs() {
    document.getElementById("tvpesji_description").style.display='none';
    document.getElementById("tvpesji_team").style.display='none';
    document.getElementById("tvpesji_progress").style.display='none';
}



function closeAllHomeSubpages() {
          document.getElementById("h_payments").style.display='none';
          document.getElementById("h_products").style.display='none';
          document.getElementById("h_visualization").style.display='none';
          document.getElementById("h_photo").style.display='none';
          document.getElementById("h_network").style.display='none';
          document.getElementById("h_storage").style.display='none';
          document.getElementById("h_linux").style.display='none';
                
}

function enableAllHomeLinks() {
          document.getElementById("h_payments").style.display='block';
          document.getElementById("h_products").style.display='block';
          document.getElementById("h_visualization").style.display='block';
          document.getElementById("h_photo").style.display='block';
          document.getElementById("h_network").style.display='block';
          document.getElementById("h_storage").style.display='block';
          document.getElementById("h_linux").style.display='block';
          document.getElementById("ph_networksubpages").style.display='none';      
          document.getElementById("ph_storagesubpages").style.display='none';      
}


function showppage_pizza_odin() {
    closeAllMainContents();
    document.getElementById("ppage_pizza_odin").style.display='block';   
}

function showppage_cap() {
    closeAllMainContents();
    document.getElementById("ppage_cap").style.display='block';
}

function showppage_tvp(){
    location.hash = "#project-tesla-porsche-videogame";
    closeAllMainContents();
    document.getElementById("ppage_tvp").style.display='block';
    closeAllTVPTabs();
    showTVPDescription();
}

function showppage_bct(){
    location.hash = "#project-binary-cost-technology";
    closeAllMainContents();
    document.getElementById("ppage_bct").style.display='block';
    showBCTDescription();
}


function showppage_companyteam(){
   	showCompany(); 
	showCompanyTeam();
}

function showHomeStorage() {
    location.hash = '#storage';
    closeAllMainContents();
    closeAllHomeSubpages();
    document.getElementById("ph_storagesubpages").style.display='block';
    document.getElementById("page_homepage").style.display='block';
}

function showHomeNetworkWeb() {
    location.hash = '#ugrid';
    closeAllMainContents();
    closeAllHomeSubpages();
    document.getElementById("ph_networksubpages").style.display='block';
    document.getElementById("page_homepage").style.display='block';
}


function showLinuxServices() {
    closeAllLinuxTabs();
    document.getElementById("lesji_services").style.display='block';
}

function showLinuxWhy() {
    closeAllLinuxTabs();
    document.getElementById("lesji_why").style.display='block';
}

function showLinuxReferences() {
    closeAllLinuxTabs();
    document.getElementById("lesji_references").style.display='block';
}

function showTVPProgress() {
    closeAllTVPTabs();
    document.getElementById("tvpesji_progress").style.display='block';
    closeAllTVPProgressTabs();
    showTVPProgressS('01');
}

function showBCTDescription()
{
	closeAllBCTTabs();
	document.getElementById("bctesji_description").style.display='block';
}

function showBCTVision()
{
	closeAllBCTTabs();
	document.getElementById("bctesji_vision").style.display='block';
}

function closeAllBCTTabs()
{
	document.getElementById("bctesji_description").style.display='none';
	document.getElementById("bctesji_vision").style.display='none'; 	
}

function closeAllTVPProgressTabs() {
    stages = ['01','02','1','2','3','4'];
    for (i=0;i<stages.length;i++)
    {
    	  document.getElementById("tvpprogressesji_s"+stages[i]).style.display='none';   
    }
}

function showTVPProgressS(stage) {
	closeAllTVPProgressTabs();
	document.getElementById("tvpprogressesji_s"+stage).style.display='block';	
}

function showTVPDescription() {
    closeAllTVPTabs();
    document.getElementById("tvpesji_description").style.display='block';
}

function showTVPTeam() {
    closeAllTVPTabs();
    document.getElementById("tvpesji_team").style.display='block';
}



function showProductsCompanyProducts() {
    closeAllProductsTabs();
    document.getElementById("pesji_companyproducts").style.display='block';
}

function showProductsDevelopment() {
    closeAllProductsTabs();
    document.getElementById("pesji_development").style.display='block';
}

function showProductsSupport() {
    closeAllProductsTabs();
    document.getElementById("pesji_support").style.display='block';
}



function showCompanyCompany() {
    closeAllCompanyTabs();
    document.getElementById("cesji_company").style.display='block';
}

function showCompanyTeam() {
    closeAllCompanyTabs();
    document.getElementById("cesji_team").style.display='block';
}

function showCompanyNews() {
    closeAllCompanyTabs();
    document.getElementById("cesji_news").style.display='block';
}


function showHomepage() {
    closeAllMainContents();
    enableAllHomeLinks();
    document.getElementById("page_homepage").style.display='block';
    //showHomeNetworkWeb();
}

function showLinuxESJI(){
    //page_linux_esji
    closeAllMainContents();
    document.getElementById("page_linux_esji").style.display='block';
    closeAllLinuxTabs();
    showLinuxWhy();
}

function showContact() {
    closeAllMainContents();
    document.getElementById("page_contact").style.display='block';
 
}

function showPortfolio() {
    closeAllMainContents();
    document.getElementById("page_portfolio").style.display='block';
 
}

function showProducts() {
    location.hash = "#products";
    closeAllMainContents();
    document.getElementById("page_products").style.display='block';
    closeAllProductsTabs();
    showProductsCompanyProducts();
}

function showCompany() {
    closeAllMainContents();
    document.getElementById("page_company").style.display='block';
    closeAllCompanyTabs();
    showCompanyCompany();
}

var show_extra = false;
//if (document.getElementById("footer_extra").style.display!='none') show_extra = true;
//footer_extra_click();

function footer_extra_click() {
   var val='none';
   var valcol="transparent";
   if (!show_extra) {val='table'; valcol="#999";show_extra = true;} else show_extra=false; 
   //console.info(val);
   //console.info(valcol);
   document.getElementById("footer_extra").style.display=val;
   document.getElementById("footer_extra").style.bottom=footer_extra_bottom+'px';
   //console.info('change '+valcol);
   document.getElementById("sticky_footer").style.backgroundColor=valcol;
   //console.info('changed '+document.getElementById("sticky_footer").style.backgroundColor);
       
}




function disableAllApps() {
      document.getElementById("webApps").style.display='none'; 
      document.getElementById("serverApps").style.display='none';
      document.getElementById("sponsorApps").style.display='none';
      document.getElementById("desktopApps").style.display='none';
      document.getElementById("graphicApps").style.display='none';
      enGraphicApps = enWebApps= enSerApps = enDesktopApps = enSponApps = false;
      //document.getElementById("page_portfolio").style.margin.right='50px';
}

var enGraphicApps = false;
function endisGraphic() {
    
    if (!enGraphicApps) {
        disableAllApps();
        document.getElementById("graphicApps").style.display='block';
        enGraphicApps = true;
    } else {
       enGraphicApps = false;
        document.getElementById("graphicApps").style.display='none';
    }
}

var enWebApps = false;
function endisWeb() {
    
    if (!enWebApps) {
        disableAllApps();
        document.getElementById("webApps").style.display='block';
        enWebApps = true;
    } else {
       enWebApps = false;
       document.getElementById("webApps").style.display='none';
    }
}
var enSerApps = false;
function endisServer() {
    
    if (!enSerApps) {
        disableAllApps();
        document.getElementById("serverApps").style.display='block';
        enSerApps = true;
    } else {
       enSerApps = false;
       document.getElementById("serverApps").style.display='none';
    }
}

var enDesktopApps = false;
function endisDesktop() {
    
    if (!enDesktopApps) {
        disableAllApps();
        document.getElementById("desktopApps").style.display='block';
        enDesktopApps = true;
    } else {
       enDesktopApps = false;
       document.getElementById("desktopApps").style.display='none';
    }
}


var enSponApps = false;
function endisSponsor() {
    
    if (!enSponApps) {
        disableAllApps();
        document.getElementById("sponsorApps").style.display='block';
        enSponApps = true;
    } else {
       enSponApps = false;
       document.getElementById("sponsorApps").style.display='none';
    }
}
