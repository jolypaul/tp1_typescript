class Calculator {
    private display: HTMLInputElement; // Écran de la calculatrice
    private currentInput: string;     // Stocke l'entrée utilisateur actuelle

    constructor() {
        this.display = document.getElementById("display") as HTMLInputElement;
        this.currentInput = "";

        this.initializeButtons();
    }

    // Initialisation des événements des boutons
    private initializeButtons(): void {
        const buttons = document.querySelectorAll(".buttons button");
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const target = event.target as HTMLButtonElement;
                const value = target.dataset.value;

                if (value) {
                    this.handleInput(value);
                }
            });
        });
    }

    // Gestion des clics sur les boutons
    private handleInput(value: string): void {
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
    }

    // Ajout d'un nombre ou d'un point
    private addNumber(value: string): void {
        if (this.display.value === "0" || this.currentInput === "0") {
            this.display.value = "";
            this.currentInput = "";
        }
        this.display.value += value;
        this.currentInput += value;
    }

    // Ajout d'un opérateur
    private addOperator(operator: string): void {
        if (this.currentInput !== "" && !this.isLastCharacterOperator()) {
            this.display.value += ` ${operator} `;
            this.currentInput += operator;
        }
    }

    // Vérifie si le dernier caractère est un opérateur
    private isLastCharacterOperator(): boolean {
        const lastChar = this.currentInput.slice(-1);
        return ["+", "-", "*", "/"].includes(lastChar);
    }

    // Calcul du résultat
    private calculate(): void {
        try {
            if (!this.isLastCharacterOperator() && this.currentInput !== "") {
                const sanitizedInput = this.currentInput.replace(/[^-()\d/*+.]/g, ''); // Sécurisation de l'entrée
                const result = Function(`'use strict'; return (${sanitizedInput})`)();
                this.display.value = result.toString();
                this.currentInput = result.toString();
            } else {
                this.display.value = "Erreur";
                this.currentInput = "";
            }
        } catch (error) {
            this.display.value = "Erreur";
            this.currentInput = "";
        }
    }

    // Réinitialise la calculatrice
    private reset(): void {
        this.display.value = "";
        this.currentInput = "";
    }

    // Efface le dernier caractère ou chiffre
    private backspace(): void {
        if (this.currentInput.length > 0) {
            // Supprime le dernier caractère de l'entrée actuelle
            this.currentInput = this.currentInput.slice(0, -1);
            // Met à jour l'affichage
            this.display.value = this.formatDisplayValue(this.currentInput);
        }
    }

    // Formate la valeur pour l'affichage (avec espaces autour des opérateurs)
    private formatDisplayValue(input: string): string {
        return input.replace(/([\+\-\*\/])/g, ' $1 ');
    }
}

// Initialisation de la calculatrice une fois la page chargée
document.addEventListener("DOMContentLoaded", () => {
    new Calculator();
});



