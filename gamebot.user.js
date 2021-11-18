// ==UserScript==
// @name         gamebbot
// @namespace    http://tampermonkey.net/
// @homepage    https://alekssamos.github.io/gamebbot.html?1.6
// @version      1.6
// @description  бот для игры xospital.mobi
// @author       alekssamos
// @match        https://xospital.mobi/*
// @match        https://*.xospital.mobi/*
// @run-at document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function updatebotstatus(){
        var botstatus = "";
        if(sessionStorage.getItem('botstatus')=="y") {
            botstatus="Остановить бота";
        } else {
            botstatus = "Запустить бота";
        }
        document.getElementById("startstopbtn").innerHTML=botstatus;
    }
    var ulfirst = document.getElementsByTagName("div")[0];
    var ulfirstparent = ulfirst.parentNode;
    var btndiv = document.createElement("div");
    btndiv.id="botdiv1";
    var btn = document.createElement("button");
    btn.id="startstopbtn";
    btn.onclick=function(){
        if(sessionStorage.getItem('botstatus')=="y") {
            sessionStorage.setItem('botstatus','n');
        } else {
            sessionStorage.setItem('botstatus','y');
            main();
        }
        updatebotstatus();
    };
    btndiv.appendChild(btn);
    ulfirstparent.insertBefore(btndiv, ulfirst);
    updatebotstatus();
    var timedelay = 10000;
    var pausetime=5000;
    function _golink(u) {
        if(sessionStorage.getItem('botstatus')!="y") {
            return false;
        }
        var el = document.querySelector('a[href*="'+u+'"]');
        if(!!el) {
            el.click();
            return true;
        }
        return false;
    }
    function golink(u) {
        window.setTimeout(_golink, timedelay, u);
    }
    function rooms() {
        if(!_golink("/Rooms/ExamineAll") && !_golink("/Rooms/GetPotionAll") && !_golink("/Rooms/DischargeAll") && !_golink("/Rooms/ClearAll") && !_golink("/Reception/TreatAll?treatType=Epidemic") && !_golink("/Rooms/GetVitaminsToAll")) {
            golink("/Pharmacy");
        }
    }
    function pharmacy() {
        if(!_golink("/Pharmacy/CheerupAll")) {
            golink("/AutoPark");
        }
    }
    function autoPark() {
        if(!_golink("/AutoPark/TipWayAll") && !_golink("/AutoPark/ThreatAll") && !_golink("/AutoFuel/RefillAll") && !_golink("/AutoParkDestination/SendAll?onEvent=true") && !_golink("/AutoPark/ExamineAll")) {
            golink("/VetClinic");
        }
    }
    function vetClinic() {
        if(!_golink("/VetClinic/DiagnoseAll") && !_golink("/VetClinic/TreatmentAll") && !_golink("/VetClinic/GetPetsAll")) {
            golink("/Quests");
        }
    }
    function quests() {
        if(!_golink("/Quests/Begin") && !_golink("/Quests/Study") && !_golink("/Quests/SaveInjured")) {
            golink("/Rooms");
        }
    }
    function main() {
        if(sessionStorage.getItem('botstatus')!="y") {
            return false;
        }
        var u = document.URL;
        if(u.indexOf("Rooms")!=-1) { rooms(); }
        if(u.indexOf("Pharmacy")!=-1) { pharmacy(); }
        if(u.indexOf("AutoPark")!=-1) { autoPark(); }
        if(u.indexOf("VetClinic")!=-1) { vetClinic(); }
        if(u.indexOf("/Quests")!=-1) { quests(); }
    }
    window.setTimeout(main, pausetime);
})();
