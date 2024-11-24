var Calculator = /** @class */ (function () {
    function Calculator() {
        this.display = document.getElementById("display");
        this.currentInput = "";
        this.initializeButtons();
    }
    // Initialisation des événements des boutons
    Calculator.prototype.initializeButtons = function () {
        var _this = this;
        var buttons = document.querySelectorAll(".buttons button");
        buttons.forEach(function (button) {
            button.addEventListener("click", function (event) {
                var target = event.target;
                var value = target.dataset.value;
                if (value) {
                    _this.handleInput(value);
                }
            });
        });
    };
    // Gestion des clics sur les boutons
    Calculator.prototype.handleInput = function (value) {
        switch (value) {
            case "reset":
                this.reset();
                break;
            case "backspace":
                this.backspace();
                break;
            case "=":
                this.calculate();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                this.addOperator(value);
                break;
            default:
                this.addNumber(value);
                break;
        }
    };
    // Ajout d'un nombre ou d'un point
    Calculator.prototype.addNumber = function (value) {
        if (this.display.value === "0" || this.currentInput === "0") {
            this.display.value = "";
            this.currentInput = "";
        }
        this.display.value += value;
        this.currentInput += value;
    };
    // Ajout d'un opérateur
    Calculator.prototype.addOperator = function (operator) {
        if (this.currentInput !== "" && !this.isLastCharacterOperator()) {
            this.display.value += " ".concat(operator, " ");
            this.currentInput += operator;
        }
    };
    // Vérifie si le dernier caractère est un opérateur
    Calculator.prototype.isLastCharacterOperator = function () {
        var lastChar = this.currentInput.slice(-1);
        return ["+", "-", "*", "/"].includes(lastChar);
    };
    // Calcul du résultat
    Calculator.prototype.calculate = function () {
        try {
            if (!this.isLastCharacterOperator() && this.currentInput !== "") {
                var sanitizedInput = this.currentInput.replace(/[^-()\d/*+.]/g, ''); // Sécurisation de l'entrée
                var result = Function("'use strict'; return (".concat(sanitizedInput, ")"))();
                this.display.value = result.toString();
                this.currentInput = result.toString();
            }
            else {
                this.display.value = "Erreur";
                this.currentInput = "";
            }
        }
        catch (error) {
            this.display.value = "Erreur";
            this.currentInput = "";
        }
    };
    // Réinitialise la calculatrice
    Calculator.prototype.reset = function () {
        this.display.value = "";
        this.currentInput = "";
    };
    // Efface le dernier caractère ou chiffre
    Calculator.prototype.backspace = function () {
        if (this.currentInput.length > 0) {
            // Supprime le dernier caractère de l'entrée actuelle
            this.currentInput = this.currentInput.slice(0, -1);
            // Met à jour l'affichage
            this.display.value = this.formatDisplayValue(this.currentInput);
        }
    };
    // Formate la valeur pour l'affichage (avec espaces autour des opérateurs)
    Calculator.prototype.formatDisplayValue = function (input) {
        return input.replace(/([\+\-\*\/])/g, ' $1 ');
    };
    return Calculator;
}());
// Initialisation de la calculatrice une fois la page chargée
document.addEventListener("DOMContentLoaded", function () {
    new Calculator();
});
