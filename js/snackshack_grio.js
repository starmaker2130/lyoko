/*"use strict";
/*eslint no-undef: "error"*/
/*eslint-env node*/
/*global document, window, navigator*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/*eslint no-unused-vars: "error"*/

var clientManager = {
    page: 0,
    connection: null,
    stash: [],
    applicationClient: null,
    openPage: function(page){
        let self = this;
        if(self.power){
            self.page = page;

            $('.grio-controller-page').animate({
                opacity: 0
            }, 500, function(){
                $(this).hide();
            });

            setTimeout(function(){
                self.connection.emit('handleGRIOEvent', {status: true, eventType: "pageChange", target: {page: self.page, code: self.applicationClient}})
                $(`#grio-controller-page-${page}`).show().animate({
                    opacity: 1.0
                });
            }, 550);
        }
        else{
            console.log('remote is off. please turn on to send requests.');
        }
    },
    nextPage: function(){
        let self = this;
        if(self.power){
            this.page++;

            let onPage = self.page;
            self.openPage(onPage);
        }
        else{
            console.log('remote is off. please turn on to send requests.');
        }
    },
    togglePower: function(){
        let self = this;
        this.power = !self.power;

        if(self.connection!=null&&this.power){
            //self.openPage(0);
            self.connection.emit("connectGRIO", {status: true});
        }
        else if(self.applicationClient!=null&&!this.power){
            self.connection.emit("disconnectGRIO", {status: true, code: self.applicationClient});
        }
        console.log(`remote ${this.power}`);
    },
    power: false
};

function activateEffectors(){

      clientManager.connection = io.connect(location.host);

      clientManager.connection.on("applicationSuccessfullyConnectedToGRIO", function(data){
          console.log(` fx] applicationSuccessfullyConnectedToGRIO \n request approved? ${data.status} `);
          if(data.status){
              clientManager.applicationClient = data.code;

              $("#grio-settings-page").show().animate({
                  opacity: 1.0
              }, 500, function(){
                  document.getElementById("connect-code-input").value = data.code;
              });
          }
          else{
              console.log('try opening a View to the desired application first!');
              if(clientManager.power){
                  clientManager.togglePower();
              }
          }
      });

      document.getElementById("stream-main-option").addEventListener("click", function(){
          clientManager.openPage(1);
      });

      document.getElementById("deliver-main-option").addEventListener("click", function(){
          clientManager.openPage(3);
      });

      $(".back-to-main-button").click(function(){
          clientManager.openPage(0);
      });

      $(".stream-option-button").click(function(){
          let channel = $(this).attr('id');
          clientManager.openPage(2);
          console.log(`open stream channel page \n load channel data for ${channel} \n note: this is a place holder for funcitonality available \n in the next version. \n v. 0.5.1`);
      });

      $(".deliver-drinks-option-button, .deliver-snacks-option-button, .deliver-18-option-button").click(function(){
          let channel = $(this).attr('class');
          channel = channel.substring(channel.indexOf('-')+1,channel.indexOf("-o"));
          if(channel=="drinks"){
              clientManager.stash.unshift(4);
          }
          else if(channel=="snacks"){
              clientManager.stash.unshift(5);
          }
          else if(channel=="18"){
              clientManager.stash.unshift(6);
          }
          console.log(channel);
          clientManager.openPage(8);
          console.log(`open deliver payment page \n load payment data for ${channel} \n note: this is a place holder for funcitonality available \n in the next version. \n v. 0.5.1`);
      });

      document.getElementById("close-stream-button").addEventListener("click", function(){
          clientManager.openPage(1);
      });

      document.getElementById("drinks-option").addEventListener("click", function(){
          clientManager.openPage(4);
      });

      document.getElementById("snacks-option").addEventListener("click", function(){
          clientManager.openPage(5);
      });

      document.getElementById("18-plus-option").addEventListener("click", function(){
          clientManager.openPage(6);
      });

      $(".back-to-deliver-menu-button").click(function(){
          clientManager.openPage(3);
      });

      document.getElementById("close-payment-page-button").addEventListener("click", function(){
          let previous = clientManager.stash[0];

          clientManager.openPage(previous);
      });

      document.getElementById("toggle-power-button").addEventListener("click", function(){
          clientManager.togglePower();
      });

      document.getElementById("connect-code-button").addEventListener("click", function(){
          let val = document.getElementById("connect-code-input").value;
          if(val=="code"||val==""||val==null){
              console.log("enter a code first please!");
          }
          else{

              clientManager.openPage(0);
          }
      });

}

function buildMarkup(){
    document.body.innerHTML =`
        <div id="grio-controller-gui-container">
            <div id="toggle-power-button">
                cv
            </div>
            <div id='grio-settings-page' class='grio-controller-page'>
                <input type="text" placeholder="code" id="connect-code-input" />
                <input type="button" value="connect" id="connect-code-button" />
            </div>
            <div id='grio-controller-page-0' class='grio-controller-page'>
                <div id='snack-shack-main-menu-options' class='page-container'>
                    <div id="stream-main-option" class="main-option-button">
                        stream
                    </div>
                    <div id="deliver-main-option" class="main-option-button">
                        deliver
                    </div>
                </div>
            </div>
            <div id="grio-controller-page-1" class="grio-controller-page">
                <div id="stream-main-menu" class="page-container">
                    <div class="back-to-main-button">x</div>
                    <div id="cinema-lumiere-option" class="stream-option-button">
                        <div id="cinema-lumiere-title" class="stream-option-title">
                            CINÉMA LUMIÈRE
                        </div>
                        <div id="cinema-lumiere-label" class="stream-option-label">
                            the greatest cinema around: neighbor's choice
                        </div>
                    </div>
                    <div id="space-option" class="stream-option-button">
                        <div id="space-title" class="stream-option-title">
                            SPACE
                        </div>
                        <div id="space-label" class="stream-option-label">
                            life, industry, and travel in space
                        </div>
                    </div>
                    <div id="old-row-md-option" class="stream-option-button">
                        <div id="old-row-md-title" class="stream-option-title">
                            OLD ROW MD
                        </div>
                        <div id="old-row-md-label" class="stream-option-label">
                            vision, cycle, onwards...
                        </div>
                    </div>
                    <div id="starsystem-8300-option" class="stream-option-button">
                        <div id="starsystem-8300-title" class="stream-option-title">
                            STARSYSTEM 8300
                        </div>
                        <div id="starsystem-8300-label" class="stream-option-label">
                            future funk sound meets ART cinema meets Nkisi
                        </div>
                    </div>
                </div>
            </div>
            <div id="grio-controller-page-2" class="grio-controller-page">
                <div id="stream-channel-page" class="page-container">
                    <div id="close-stream-button">
                        x
                    </div>
                    <div id="stream-container" >

                    </div>
                    <div id="comment-on-stream-button" class="stream-interaction-button">

                    </div>
                    <div id="share-stream-button" class="stream-interaction-button">

                    </div>
                </div>
            </div>
            <div id='grio-controller-page-3' class='grio-controller-page'>
                <div id="deliver-main-menu" class="page-container">
                    <div class="back-to-main-button">x</div>
                    <div id="drinks-option" class="deliver-option-button">
                        <div id="drinks-title" class="deliver-option-title">
                            drinks
                        </div>
                        <div id="drinks-label" class="deliver-option-label">
                            choose from an assortment of fresh, thirst-quenching beverages
                        </div>
                    </div>
                    <div id="snacks-option" class="deliver-option-button">
                        <div id="snacks-title" class="deliver-option-title">
                            snacks
                        </div>
                        <div id="snacks-label" class="deliver-option-label">
                            pack your favorite stream with some flavor
                        </div>
                    </div>
                    <div id="18-plus-option" class="deliver-option-button">
                        <div id="18-plus-title" class="deliver-option-title">
                            18+
                        </div>
                        <div id="18-plus-label" class="deliver-option-label">
                            exercise your privilege and relax on your time
                        </div>
                    </div>
                </div>
            </div>
            <div id='grio-controller-page-4' class='grio-controller-page'>
                <div id="deliver-drinks-menu" class="page-container">
                    <div class="back-to-deliver-menu-button">x</div>
                    <div id="half-n-half-option" class="deliver-drinks-option-button">
                        <div id="half-n-half-title" class="deliver-drinks-option-title">
                            half n half
                        </div>
                        <div id="half-n-half-label" class="deliver-drinks-option-label">
                            500mL of fresh Arizona tea infused half n half with lemonade
                        </div>
                    </div>
                    <div id="iced-tea-option" class="deliver-drinks-option-button">
                        <div id="iced-tea-title" class="deliver-drinks-option-title">
                            iced tea
                        </div>
                        <div id="iced-tea-label" class="deliver-drinks-option-label">
                            500mL of fresh Arizona tea
                        </div>
                    </div>
                    <div id="fruit-punch-option" class="deliver-drinks-option-button">
                        <div id="fruit-punch-title" class="deliver-drinks-option-title">
                            fruit punch
                        </div>
                        <div id="fruit-punch-label" class="deliver-drinks-option-label">
                            500mL of fresh Arizona tea infused with various fruits
                        </div>
                    </div>
                    <div id="orange-juice-option" class="deliver-drinks-option-button">
                        <div id="orange-juice-title" class="deliver-drinks-option-title">
                            orange juice
                        </div>
                        <div id="orange-juice-label" class="deliver-drinks-option-label">
                            1L of natural Florida orange juice
                        </div>
                    </div>
                    <div id="water-option" class="deliver-drinks-option-button">
                        <div id="water-title" class="deliver-drinks-option-title">
                            water
                        </div>
                        <div id="water-label" class="deliver-drinks-option-label">
                            1L of natural Florida orange juice
                        </div>
                    </div>
                </div>
            </div>
            <div id='grio-controller-page-5' class='grio-controller-page'>
                <div id="deliver-snacks-menu" class="page-container">
                    <div class="back-to-deliver-menu-button">x</div>
                    <div id="chips-option" class="deliver-snacks-option-button">
                        <div id="chips-title" class="deliver-snacks-option-title">
                            chips
                        </div>
                        <div id="chips-label" class="deliver-snacks-option-label">
                            chips
                        </div>
                    </div>
                    <div id="crepes-option" class="deliver-snacks-option-button">
                        <div id="crepes-title" class="deliver-snacks-option-title">
                            crepes
                        </div>
                        <div id="crepes-label"  class="deliver-snacks-option-label">
                            crepes
                        </div>
                    </div>
                </div>
            </div>
            <div id='grio-controller-page-6' class='grio-controller-page'>
                <div id="deliver-18-menu" class="page-container">
                    <div class="back-to-deliver-menu-button">x</div>
                    <div id="atlantic-breeze-option" class="deliver-18-option-button">
                        <div id="atlantic-breeze-title" class="deliver-18-option-title">
                            atlantic breeze
                        </div>
                        <div id="atlantic-breeze-label" class="deliver-18-option-label">
                            best along the east, a maryland bred feast
                        </div>
                    </div>
                    <div id="lighters-option" class="deliver-18-option-button">
                        <div id="lighters-title" class="deliver-18-option-title">
                            lighters
                        </div>
                        <div id="lighters-label" class="deliver-18-option-label">
                            lighters, sticks, and other relaxation accessories
                        </div>
                    </div>
                    <div id="bantXR-option" class="deliver-18-option-button">
                        <div id="bantXR-title" class="deliver-18-option-title">
                            bantXR
                        </div>
                        <div id="bantXR-label" class="deliver-18-option-label">
                            eros for the future streamed now
                        </div>
                    </div>
                </div>
            </div>
            <div id='grio-controller-page-7' class='grio-controller-page'>
                <div id="18-plus-warning-container">
                    <h3 class="18-plus-warning-label">warning</h3>
                    <div id="18-plus-label" class="stream-option-label">
                        This page contains age-restricted products that cannot be sold without proof of age and identity in compliance with EU and Maryland State regulations. Secure verification is required and consented to by connecting to this page in clicking the 18+ button below.
                    </div>
                    <div id="connect-to-18-plus-button">
                        18+
                    </div>
                    <h3 class="18-plus-warning-label">warning</h3>
                </div>
            </div>
            <div id='grio-controller-page-8' class='grio-controller-page'>
                <div id="close-payment-page-button">
                    x
                </div>
                <div id="submit-payment-form-button">
                    go
                </div>
            </div>
            <div id='grio-controller-page-9' class='grio-controller-page'>
                <div id="view-tracking-stream-button">
                    x
                </div>
                <div id="receipt-container">
                    x
                </div>
            </div>
        </div>
    `;
}

function init(){
    buildMarkup();
    setTimeout(function(){
        activateEffectors();
    }, 50);
}
