#!usr/bin/env node

import { input, select, number } from "@inquirer/prompts";

console.log("\n\t\t\tWelcome to Bank!\n");
console.log("\tFill in the following information to create a new bank account.\n");

// Customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: string;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
  }
}

// BankAccount interface
interface BankAccount {
  debit(amount: number): void;
  credit(amount: number): void;
  checkBalance(): void;
}

// BankAccount class
class BankAccountClass implements BankAccount {
  private balance: number;
  private customer: Customer;

  constructor(customer: Customer, initialBalance: number = 0) {
    this.customer = customer;
    this.balance = initialBalance;
  }

  debit(amount: number): void {
    if (amount > this.balance) {
      console.log("Transaction cancelled: Insufficient balance.");
    } else {
      this.balance -= amount;
      console.log(`Debited: $${amount}. New balance: $${this.balance}.`);
    }
  }

  credit(amount: number): void {
    if (amount > 100) {
      this.balance += amount - 1; // $1 fee for crediting more than $100
      console.log(
        `Credited: $${amount}. $1 fee applied. New balance: $${this.balance}.`
      );
    } else {
      this.balance += amount;
      console.log(`Credited: $${amount}. New balance: $${this.balance}.`);
    }
  }

  checkBalance(): void {
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
  const age: number | any = await number({ message: "Enter your age:" });
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
        const debitAmount: number | any = await number({
          message: "Enter the amount to debit:",
        });
        account.debit(debitAmount);
        break;

      case "Credit":
        const creditAmount: number | any = await number({
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
