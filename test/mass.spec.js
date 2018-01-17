var Food = require("../models/food");
var User = require("../models/user");
var expect = require("chai").expect;

describe("Checking if Models work...", ()=>{
    // FOOD
    describe("TESTING new Food!", () => {
        it("initializes a new Food: Testing foodName", ()=>{
            var myFood = new Food();
            myFood.foodName = "Pizza";
            expect(myFood.foodName).to.equal("Pizza");
        });
    });
    describe("TESTING new Food!", () => {
        it("initializes a new Food: Testing calories", ()=>{
            var myFood = new Food();
            myFood.calories = 100;
            expect(myFood.calories).to.equal(100);
        });
    });
    describe("TESTING new Food!", () => {
        it("initializes a new Food: Testing proteins", ()=>{
            var myFood = new Food();
            myFood.proteins = 99;
            expect(myFood.proteins).to.equal(99);
        });
    });

    // USER
    describe("TESTING new User!", () => {
        it("initializes a new User: Testing userName", ()=>{
            var myUser = new User();
            myUser.userName = "Jin";
            expect(myUser.userName).to.equal("Jin");
        });
    });
    describe("TESTING new User!", () => {
        it("initializes a new User: Testing email", ()=>{
            var myUser = new User();
            myUser.email = "jin@jin.jin";
            expect(myUser.email).to.equal("jin@jin.jin");
        });
    });

    // SERVER
});