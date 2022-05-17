"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementVisibilityPainter = void 0;
const DOMConstants_1 = require("../Constants/DOMConstants");
const CookieConstants_1 = require("../Constants/CookieConstants");
const typescript_cookie_1 = require("typescript-cookie");
class ElementVisibilityPainter {
    constructor() {
        this.registerHelpSelectorClick();
        this.registerSettingsSelectorClick();
        this.registerScoresSelectorClick();
        this.registerBoardReturnEvent();
        this.registerNightToggle();
        this.registerGameTypeDetailsClick();
        this.registerGameTypeScoreDetailsClick();
        this.registerTimerInputEvent();
        this.handleDarkMode(Boolean((0, typescript_cookie_1.getCookie)(CookieConstants_1.cookieConstants.NIGHT_COOKIE_NAME)));
        this.preventFormDefaults();
    }
    preventFormDefaults() {
        if (!this.preventFormDefaultsRegistered) {
            this.preventFormDefaultsRegistered = true;
            $("form").submit(function (event) {
                event.preventDefault();
            });
        }
    }
    handleDarkMode(inDarkMode) {
        if (inDarkMode) {
            $("body").addClass("night");
        }
        else {
            $("body").removeClass("night");
        }
        (0, typescript_cookie_1.removeCookie)(CookieConstants_1.cookieConstants.NIGHT_COOKIE_NAME);
        (0, typescript_cookie_1.setCookie)(CookieConstants_1.cookieConstants.NIGHT_COOKIE_NAME, inDarkMode, { expires: 365 });
    }
    registerHelpSelectorClick() {
        if (!this.helpSelectorEventRegistered) {
            this.helpSelectorEventRegistered = true;
            $("#helpSelector").click(function () {
                $("#settingsContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#scoreContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                if ($("#helpContainer").hasClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME)) {
                    $("#helpContainer").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
                else {
                    $("#helpContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
            });
        }
    }
    registerSettingsSelectorClick() {
        if (!this.settingsSelectorEventRegistered) {
            this.settingsSelectorEventRegistered = true;
            $("#gameTypeSelector1").prop("checked", true);
            $("#settingsSelector").click(function () {
                $("#helpContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#scoreContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                if ($("#settingsContainer").hasClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME)) {
                    $("#settingsContainer").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
                else {
                    $("#settingsContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
            });
        }
    }
    registerScoresSelectorClick() {
        if (!this.scoresSelectorEventRegistered) {
            this.scoresSelectorEventRegistered = true;
            $("#gameTypeScoreSelector1").prop("checked", true);
            $("#scoreHistorySelector").click(function () {
                $("#helpContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#settingsContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                if ($("#scoreContainer").hasClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME)) {
                    $("#scoreContainer").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").addClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
                else {
                    $("#scoreContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                    $("#keyboard, #rowsContainer").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $(".detailsColumn").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                    $("#returnToBoard").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                }
            });
        }
    }
    registerBoardReturnEvent() {
        if (!this.boardReturnEventRegistered) {
            this.boardReturnEventRegistered = true;
            $("#returnToBoard").click(function () {
                $("#settingsContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#helpContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#scoreContainer").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                $("#keyboard, #rowsContainer").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                $(".detailsColumn").removeClass(DOMConstants_1.domConstants.INVISIBLE_CLASS_NAME);
                $("#returnToBoard").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
            });
        }
    }
    registerNightToggle() {
        if (!this.nightToggleRegistered) {
            this.nightToggleRegistered = true;
            const scope = this;
            $("#nightDisplay").click(function () {
                $("body").toggleClass("night");
                scope.handleDarkMode($("body").hasClass("night"));
            });
        }
    }
    registerGameTypeDetailsClick() {
        if (!this.gameTypeDetailsEventRegistered) {
            this.gameTypeDetailsEventRegistered = true;
            $("#settingsContainer .radioContainer label").click(function (event) {
                const gameType = $(`#${$(event.currentTarget).attr("for")}`).val();
                switch (gameType) {
                    case "single":
                        $("#singleGameDesc").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#advancedSettings").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    case "endless":
                        $("#singleGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessGameDesc").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#advancedSettings").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    case "scaling":
                        $("#singleGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessGameDesc").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingGameDesc").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#advancedSettings").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    registerGameTypeScoreDetailsClick() {
        if (!this.gameTypeScoreHistoryEventRegistered) {
            this.gameTypeScoreHistoryEventRegistered = true;
            $("#scoreContainer .radioContainer label").click(function (event) {
                const gameType = $(`#${$(event.currentTarget).attr("for")}`).val();
                switch (gameType) {
                    case "single":
                        $("#singleScoreHistory").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    case "endless":
                        $("#singleScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessScoreHistory").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    case "scaling":
                        $("#singleScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#endlessScoreHistory").addClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        $("#scalingScoreHistory").removeClass(DOMConstants_1.domConstants.HIDDEN_CLASS_NAME);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    registerTimerInputEvent() {
        if (!this.timerInputEventRegistered) {
            this.timerInputEventRegistered = true;
            $("#timerEnableToggle").click(function (event) {
                const checked = $(event.currentTarget).find("input").prop("checked");
                $("#timerLengthInput").prop("disabled", !checked);
            });
        }
    }
}
exports.ElementVisibilityPainter = ElementVisibilityPainter;
//# sourceMappingURL=ElementVisibilityPainter.js.map