import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { CategoriesActions } from "../pageObjects/actions";

Given("Common Step: User navigates to the Categories page", () => {
    CategoriesActions.openCategoriesPage();
});
