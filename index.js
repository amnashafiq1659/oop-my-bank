#!usr/bin/env node
import { input, select, number } from "@inquirer/prompts";
console.log("\n\t\t\tWelcome to Bank!\n");
console.log("\tFill in the following information to create a new bank account.\n");
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    constructor(firstName, lastName, gender, age, mobileNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
    }
}
// BankAccount class
class BankAccountClass {
    balance;
    customer;
    constructor(customer, initialBalance = 0) {
        this.customer = customer;
        this.balance = initialBalance;
    }
    debit(amount) {
        if (amount > this.balance) {
            console.log("Transaction cancelled: Insufficient balance.");
        }
        else {
            this.balance -= amount;
            console.log(`Debited: $${amount}. New balance: $${this.balance}.`);
        }
    }
    credit(amount) {
        if (amount > 100) {
            this.balance += amount - 1; // $1 fee for crediting more than $100
            console.log(`Credited: $${amount}. $1 fee applied. New balance: $${this.balance}.`);
        }
        else {
            this.balance += amount;
            console.log(`Credited: $${amount}. New balance: $${this.balance}.`);
        }
    }
    checkBalance() {
        console.log(`Current balance: $${this.balance}.`);
    }
}
// Main function to interact with the user
async function main() {
    const firstName = await input({ message: "Enter your first name:" });
    const lastName = await input({ message: "Enter your last name:" });
    const gender = await select({
        message: "Select your gender:",
        choices: [
            { name: "Male", value: "Male" },
            { name: "Female", value: "Female" },
        ],
    });
    const age = await number({ message: "Enter your age:" });
    const mobileNumber = await input({ message: "Enter your mobile number:" });
    const customer = new Customer(firstName, lastName, gender, age, mobileNumber);
    const account = new BankAccountClass(customer, 500); // Initial balance of $500
    let exit = false;
    while (!exit) {
        const action = await select({
            message: "What would you like to do?",
            choices: [
                { name: "Check Balance", value: "Check Balance" },
                { name: "Debit", value: "Debit" },
                { name: "Credit", value: "Credit" },
                { name: "Exit", value: "Exit" },
            ],
        });
        switch (action) {
            case "Check Balance":
                account.checkBalance();
                break;
            case "Debit":
                const debitAmount = await number({
                    message: "Enter the amount to debit:",
                });
                account.debit(debitAmount);
                break;
            case "Credit":
                const creditAmount = await number({
                    message: "Enter the amount to credit:",
                });
                account.credit(creditAmount);
                break;
            case "Exit":
                exit = true;
                console.log("Thanks!");
                break;
        }
    }
}
main();
