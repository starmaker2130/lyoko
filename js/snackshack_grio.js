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

document.addEventListener("DOMContentLoaded", function(){

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
});